from ..models import Edge, InsidePOI, Room
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from app.serializers import InsidePOISerializer
import networkx as nx

# Create a graph
G = nx.Graph()
graph_initialized = False

def initialize_graph():
    global graph_initialized

    for node in InsidePOI.objects.all():
        G.add_node(node.id, data=node)

    for edge in Edge.objects.all():
        G.add_edge(edge.node1.id, edge.node2.id, weight=edge.distance)

    graph_initialized = True


def compute_shortest_path(source_id,target_id):
    node_ids = nx.shortest_path(G, source=source_id, target=target_id, weight="weight")
    node_data_list = [G.nodes[node_id]["data"] for node_id in node_ids]
    return node_data_list



@api_view(['POST'])
def get_shortest_path_between_rooms(request):
    # Check if graph is initialized
    if not graph_initialized:
        initialize_graph()

    # Get Room1 and Room2 from the request body
    room1_code = request.data.get("room1")
    room2_code = request.data.get("room2")

    if not room1_code or not room2_code:
        return Response({"error": "room1 and room2 must be provided"}, status.HTTP_400_BAD_REQUEST)

    # Fetch the locations associated with the room codes (assuming a mapping exists)
    room1 = Room.objects.filter(code=room1_code).first()
    room2 = Room.objects.filter(code=room2_code).first()

    if not room1 or not room2:
        return Response({"error": "One or both room codes are invalid"}, status.HTTP_400_BAD_REQUEST)

    # Compute the shortest path between the room locations
    node_data_list = compute_shortest_path(room1.location.id, room2.location.id)

    # Serialize the data for response
    serializer = InsidePOISerializer(node_data_list, many=True)

    return Response(serializer.data, status.HTTP_200_OK)


    @api_view(['POST'])
def get_accessible_path_between_rooms(request):
    """ API for finding the shortest accessible path using indirect accessibility detection. """
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
            if ("elevator" in (node1_poi.amenities or "").lower() or 
                "elevator" in (node2_poi.amenities or "").lower()):
                is_accessible = True

            if ("ramp" in (node1_poi.amenities or "").lower() or 
                "ramp" in (node2_poi.amenities or "").lower()):
                is_accessible = True

        
        if not is_accessible:
            G_accessible[edge.node1.id][edge.node2.id]["weight"] *= 5  # Penalize non-accessible paths

    try:
        node_ids = nx.shortest_path(G_accessible, source=room1.location.id, target=room2.location.id, weight="weight")
        node_data_list = [G_accessible.nodes[node_id]["data"] for node_id in node_ids]
        serializer = InsidePOISerializer(node_data_list, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    except nx.NetworkXNoPath:
        return Response({"error": "No accessible path found."}, status=status.HTTP_404_NOT_FOUND)
