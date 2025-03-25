import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import { useEffect, useState } from "react";
import LineFactory from "@/app/hooks/lineFactory";
import { Circle, Line } from "react-native-svg";
import { PathAPI } from "@/api/api";


// Define the type for each node object
type PathNode = {
  id: number;
  floor: string;
  description: string | null;
  is_accessible: boolean;
  amenity_names: string[];
  x_coor: number;
  y_coor: number;
};

export default function PathTrace({ 
  currentFloor, 
  onFloorChangeRequired, 
  floorChangeConfirmed,
  setFloorChangeConfirmed,
  onInitialFloorDetected = undefined,
  onDetectedCrossBuildingPath = undefined,
  path
}) {
  // State for path nodes and current floor's nodes
  const [allPathNodes, setAllPathNodes] = useState<PathNode[]>([]);
  const [currentFloorNodes, setCurrentFloorNodes] = useState<PathNode[]>([]);
  
  // Detect when there's a next floor in the path
  const [nextFloorInPath, setNextFloorInPath] = useState<string | null>(null);

  const getBuildingFromFloor = (floorStr: string): string => {
    // Match alphanumerics at the beginning (e.g., H, C, S2, LB)
    const match = floorStr.match(/^[A-Za-z0-9]+/);
    return match ? match[0] : "";
  };


  // Load path data from API when component mounts
  useEffect(() => {
    //Path rendered with prop, component to be refreshed every time when rendered
    if(path) {
      if (path.path && path.path.length > 0) {
        // Set the path nodes
        setAllPathNodes(path.path);
        
        // Detect the starting floor from the first node
        
        const startNode = path.path[0];
        const endNode = path.path[path.path.length - 1];

        const floorNumber = startNode.floor.replace('H-', '');
        const startingFloor = `H${floorNumber}`;
        
        // Only call onInitialFloorDetected if it exists
        if (onInitialFloorDetected && typeof onInitialFloorDetected === 'function') {
          onInitialFloorDetected(startingFloor);
        }

        const startBuilding = getBuildingFromFloor(startNode.floor);
        const endBuilding = getBuildingFromFloor(endNode.floor);
        console.log("buildings")
        console.log(startBuilding)
        console.log(endBuilding)

        const isCrossBuilding = startBuilding !== endBuilding;
        if (onDetectedCrossBuildingPath && typeof onDetectedCrossBuildingPath === 'function') {
          if (onDetectedCrossBuildingPath) {
            const destination = "H-857"; // MUST USE THE SAME DESTINATION AS WHEN CALLING shortestPathToRoom
            //THEN BACKEND CAN MAP THE ROOM TO ITS COORDINATE LOCATION
            const map_to_coordinate = "45.4582,-73.6405" //<-THIS SHOULD BE CHANGED TO AN API CALL THAT MAPS TO COORDINATE
            onDetectedCrossBuildingPath(true, map_to_coordinate); 
          }
        }

      }
    }
    // Reset floor change confirmation
    setFloorChangeConfirmed(false);
  }, ); // Empty dependency array means this runs once on mount

  // Update current floor nodes when floor or all nodes change
  useEffect(() => {
    if (allPathNodes.length > 0 && currentFloor) {
      // Filter nodes for the current floor
      const floorFormat = `H-${currentFloor.substring(1)}`;
      const nodesForCurrentFloor = allPathNodes.filter(node => node.floor === floorFormat);
      setCurrentFloorNodes(nodesForCurrentFloor);
      
      // Check if the path continues to another floor
      const floorIndices = allPathNodes.map((node, index) => 
        ({ floor: node.floor, index })
      );
      
      const currentFloorIndices = floorIndices.filter(item => item.floor === floorFormat);
      
      if (currentFloorIndices.length > 0) {
        const lastNodeIndexOnCurrentFloor = Math.max(...currentFloorIndices.map(item => item.index));
        
        // If there are nodes after the last node of the current floor
        if (lastNodeIndexOnCurrentFloor < allPathNodes.length - 1) {
          const nextFloorNode = allPathNodes[lastNodeIndexOnCurrentFloor + 1];
          const nextFloor = nextFloorNode.floor.replace('H-', 'H');
          
          // Only trigger floor change request if we have nodes on current floor 
          // and not already confirmed a change
          if (nodesForCurrentFloor.length > 0 && !floorChangeConfirmed) {
            onFloorChangeRequired(nextFloor);
            setNextFloorInPath(nextFloor);
          }
        } else {
          setNextFloorInPath(null);
        }
      }
    } else {
      // Clear current floor nodes if we don't have data yet or no current floor
      setCurrentFloorNodes([]);
    }
    
    // Reset floor change confirmation when floor changes
    if (currentFloor !== `H${nextFloorInPath?.substring(1)}`) {
      setFloorChangeConfirmed(false);
    }
  }, [allPathNodes, currentFloor, floorChangeConfirmed]);

  // If we have no nodes for the current floor, don't render anything
  if (currentFloorNodes.length === 0) {
    return null;
  }

  return (
    <View>

      {/* Draw path nodes for current floor */}
      {currentFloorNodes.map((node, index) => {
        return (
          <View key={index}>
            {/* Create a circle for each node */}
            <Circle
              cx={node.x_coor}
              cy={node.y_coor}
              r="0.5"
              fill={
                index === 0
                  ? "blue"
                  : index === currentFloorNodes.length - 1
                  ? "red"
                  : "green"
              }
              stroke="none"
            />
            
            {/* Draw line to next node if not the last node */}
            {index === currentFloorNodes.length - 1 || (
              <LineFactory
                key={`line-${index}`}
                node1={node}
                node2={currentFloorNodes[index + 1]}
              />
            )}
          </View>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  bannerContainer: {
    position: 'absolute',
    top: 10,
    left: 10,
    right: 10,
    width: '80%',
    alignSelf: 'center',
    zIndex: 10,
  },
  banner: {
    backgroundColor: 'rgba(0, 0, 0, 0.75)',
    borderRadius: 8,
    padding: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  bannerText: {
    color: 'white',
    flex: 1,
    fontSize: 14,
    marginRight: 10,
  },
  bannerButtons: {
    flexDirection: 'row',
  },
  button: {
    padding: 8,
    borderRadius: 4,
    marginLeft: 6,
  },
  buttonYes: {
    backgroundColor: '#3498db',
  },
  buttonNo: {
    backgroundColor: '#e74c3c',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 12,
  }
});
