import networkx as nx

# Create a graph
G = nx.Graph()

# Add edges (representing paths between rooms)
G.add_edge("Room1", "Room2", weight=5)  # 5 meters distance
G.add_edge("Room2", "Room3", weight=10)
G.add_edge("Room1", "Room4", weight=2)
G.add_edge("Room4", "Room3", weight=8)

# Compute the shortest path from Room1 to Room3
shortest_path = nx.shortest_path(G, source="Room1", target="Room3", weight="weight")

print("Shortest path:", shortest_path)
