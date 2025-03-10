from ..models import Edge, InsidePOI, Room, Floor
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from app.serializers import InsidePOISerializer
import networkx as nx

# Create a graph
G = nx.Graph()
graph_initialized = False

def initialize_graph():
    """Initialize the graph with nodes and edges."""
    global graph_initialized

    if graph_initialized:
        return

    for node in InsidePOI.objects.all():
        G.add_node(node.id, data=node)

    for edge in Edge.objects.all():
        G.add_edge(edge.node1.id, edge.node2.id, weight=edge.distance)

    graph_initialized = True


def compute_shortest_path(source_id, target_id):
    """Compute the shortest path between two nodes in the graph."""
    try:
        node_ids = nx.shortest_path(G, source=source_id, target=target_id, weight="weight")
        node_data_list = [G.nodes[node_id]["data"] for node_id in node_ids]
        return node_data_list
    except nx.NetworkXNoPath:
        return None


@api_view(['POST'])
def get_shortest_path_between_rooms(request):
    """Retrieve the shortest path between two rooms."""
    if not graph_initialized:
        initialize_graph()

    room1_code = request.data.get("room1")
    room2_code = request.data.get("room2")

    if not room1_code or not room2_code:
        return Response({"error": "room1 and room2 must be provided"}, status=status.HTTP_400_BAD_REQUEST)

    room1 = Room.objects.filter(code=room1_code).first()
    room2 = Room.objects.filter(code=room2_code).first()

    if not room1 or not room2:
        return Response({"error": "One or both room codes are invalid"}, status=status.HTTP_400_BAD_REQUEST)

    node_data_list = compute_shortest_path(room1.location.id, room2.location.id)

    if not node_data_list:
        return Response({"error": "No path found."}, status=status.HTTP_404_NOT_FOUND)

    serializer = InsidePOISerializer(node_data_list, many=True)
    return Response(serializer.data, status=status.HTTP_200_OK)


@api_view(['POST'])
def get_accessible_path_between_rooms(request):
    """Find the shortest accessible path prioritizing elevators and ramps."""
    if not graph_initialized:
        initialize_graph()

    room1_code = request.data.get("room1")
    room2_code = request.data.get("room2")

    if not room1_code or not room2_code:
        return Response({"error": "room1 and room2 must be provided"}, status=status.HTTP_400_BAD_REQUEST)

    room1 = Room.objects.filter(code=room1_code).first()
    room2 = Room.objects.filter(code=room2_code).first()

    if not room1 or not room2:
        return Response({"error": "One or both room codes are invalid"}, status=status.HTTP_400_BAD_REQUEST)

    G_accessible = G.copy()

    for edge in Edge.objects.all():
        node1_poi = InsidePOI.objects.filter(id=edge.node1.id).first()
        node2_poi = InsidePOI.objects.filter(id=edge.node2.id).first()

        # Default: Not accessible
        is_accessible = False

        if node1_poi and node2_poi:
            # Get a list of amenity names
            node1_amenities = list(node1_poi.amenities.values_list("name", flat=True))
            node2_amenities = list(node2_poi.amenities.values_list("name", flat=True))

            # Check if the path is accessible
            if "elevator" in node1_amenities or "elevator" in node2_amenities:
                is_accessible = True

            if "ramp" in node1_amenities or "ramp" in node2_amenities:
                is_accessible = True

        # Penalize non-accessible paths
        if not is_accessible:
            G_accessible[edge.node1.id][edge.node2.id]["weight"] *= 5

    try:
        node_ids = nx.shortest_path(G_accessible, source=room1.location.id, target=room2.location.id, weight="weight")
        node_data_list = [G_accessible.nodes[node_id]["data"] for node_id in node_ids]
        serializer = InsidePOISerializer(node_data_list, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    except nx.NetworkXNoPath:
        return Response({"error": "No accessible path found."}, status=status.HTTP_404_NOT_FOUND)


@api_view(['GET'])
def get_amenities_by_floor(request):
    """Retrieve all amenities available on a specific floor."""
    floor_code = request.GET.get("floor")  # The user provides a floor code (e.g., 'H-5')

    if not floor_code:
        return Response({"error": "floor parameter is required"}, status=status.HTTP_400_BAD_REQUEST)

    # Fetch the floor ID from the Floor model
    floor = Floor.objects.filter(code=floor_code).first()
    
    if not floor:
        return Response({"error": "Floor not found."}, status=status.HTTP_404_NOT_FOUND)

    # Now use floor.id instead of floor_code
    pois = InsidePOI.objects.filter(floor=floor.id)

    if not pois.exists():
        return Response({"message": "No amenities available on this floor."}, status=status.HTTP_200_OK)

    floor_amenities = {}
    for poi in pois:
        if poi.amenities.exists():  # Check if there are related amenities
            for amenity in poi.amenities.all():  # Iterate over related amenities
                if amenity.name not in floor_amenities:
                    floor_amenities[amenity.name] = []
                floor_amenities[amenity.name].append({
                    "id": poi.id,
                    "description": poi.description,
                    "x_coor": poi.x_coor,
                    "y_coor": poi.y_coor
                })

    return Response({"floor": floor_code, "amenities": floor_amenities}, status=status.HTTP_200_OK)
