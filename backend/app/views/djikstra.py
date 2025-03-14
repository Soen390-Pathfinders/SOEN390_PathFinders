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
    except (nx.NetworkXNoPath, nx.NodeNotFound):
        return None


# Function to find the shortest path to a node that has the specified amenity
def compute_shortest_path_to_amenity(graph, start_id, amenity):
    # Find all nodes that have the target amenity
    target_nodes = [
        node for node in graph.nodes
        if amenity in InsidePOISerializer(graph.nodes[node]["data"]).data.get('amenity_names')
    ]
    
    if not target_nodes:
        return None  # No matching nodes

    # Find the shortest path to any target node
    shortest = None
    for target in target_nodes:
        try:
            path = nx.shortest_path(graph, source=start_id, target=target)
            if shortest is None or len(path) < len(shortest):
                shortest = path
        except (nx.NetworkXNoPath, nx.NodeNotFound):
            continue  # No path to this target, try the next one
    
    if not shortest:
        return None
    return [graph.nodes[node_id]["data"] for node_id in shortest]



@api_view(['POST'])
def get_shortest_path_between_rooms(request):
    """Retrieve the shortest path between two rooms."""
    if not graphs_initialized:
        initialize_graphs()

    room1_code = request.data.get("room1")
    room2_code = request.data.get("room2")
    has_disability = request.data.get("accessible")

    if not room1_code or not room2_code:
        return Response({"error": "room1 and room2 must be provided"}, status=status.HTTP_400_BAD_REQUEST)

    room1 = Room.objects.filter(code=room1_code).first()
    room2 = Room.objects.filter(code=room2_code).first()

    if not room1 or not room2:
        return Response({"error": "One or both room codes are invalid"}, status=status.HTTP_400_BAD_REQUEST)

    graph = G_normal if not has_disability else G_accessible
    node_data_list = compute_shortest_path(graph, room1.location.id, room2.location.id)

    if not node_data_list:
        return Response({"error": "No path found."}, status=status.HTTP_404_NOT_FOUND)

    serializer = InsidePOISerializer(node_data_list, many=True)
    return Response(serializer.data, status=status.HTTP_200_OK)



@api_view(['POST'])
def get_shortest_path_to_amenity(request):
    """Retrieve the shortest path from a room to an amenity."""
    if not graphs_initialized:
        initialize_graphs()

    room1_code = request.data.get("room1")
    amenity_name = request.data.get("amenity")
    has_disability = request.data.get("accessible")

    if not room1_code or not amenity_name:
        return Response({"error": "room1 and amenity must be provided"}, status=status.HTTP_400_BAD_REQUEST)

    room1 = Room.objects.filter(code=room1_code).first()

    if not room1:
        return Response({"error": "Room code is invalid"}, status=status.HTTP_400_BAD_REQUEST)

    graph = G_normal if not has_disability else G_accessible
    node_data_list = compute_shortest_path_to_amenity(graph, room1.location.id, amenity_name)

    if not node_data_list:
        return Response({"error": "No path found."}, status=status.HTTP_404_NOT_FOUND)

    serializer = InsidePOISerializer(node_data_list, many=True)
    return Response(serializer.data, status=status.HTTP_200_OK)

