from ..models import Edge, InsidePOI, Room, Floor
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from app.serializers import InsidePOISerializer
import networkx as nx

# Create a graph
G_normal = nx.Graph()
G_accessible = nx.Graph()
graphs_initialized = False

def initialize_graphs():
    """Initialize the graphs with nodes and edges."""
    global graphs_initialized

    for node in InsidePOI.objects.all():
        G_normal.add_node(node.id, data=node)

        if node.is_accessible: 
            G_accessible.add_node(node.id, data=node)

    for edge in Edge.objects.all():
        G_normal.add_edge(edge.node1.id, edge.node2.id, weight=edge.distance)

        if edge.node1.is_accessible and edge.node2.is_accessible: 
            G_accessible.add_edge(edge.node1.id, edge.node2.id, weight=edge.distance)

    graphs_initialized = True


def compute_shortest_path(graph, source_id, target_id):
    """Compute the shortest path between two nodes in the graph."""
    try:
        node_ids = nx.shortest_path(graph, source=source_id, target=target_id, weight="weight")
        node_data_list = [graph.nodes[node_id]["data"] for node_id in node_ids]
        return node_data_list
    except nx.NetworkXNoPath:
        return None


@api_view(['POST'])
def get_shortest_path_between_rooms(request):
    """Retrieve the shortest path between two rooms."""
    if not graphs_initialized:
        initialize_graphs()

    room1_code = request.data.get("room1")
    room2_code = request.data.get("room2")
    has_disability = request.data.get("accessible")

    if not room1_code:
        return Response({"error": "room1 must be provided"}, status=status.HTTP_400_BAD_REQUEST)

    room1 = Room.objects.filter(code=room1_code).first()
    room2 = Room.objects.filter(code=room2_code).first() or Room.objects.filter(location__amenities__name="EXIT").first()

    if not room1 or not room2:
        return Response({"error": "One or both room codes are invalid"}, status=status.HTTP_400_BAD_REQUEST)

    graph = G_normal if not has_disability else G_accessible
    node_data_list = compute_shortest_path(graph, room1.location.id, room2.location.id)

    if not node_data_list:
        return Response({"error": "No path found."}, status=status.HTTP_404_NOT_FOUND)

    serializer = InsidePOISerializer(node_data_list, many=True)
    return Response(serializer.data, status=status.HTTP_200_OK)


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
