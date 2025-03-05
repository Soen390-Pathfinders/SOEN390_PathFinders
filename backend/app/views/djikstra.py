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