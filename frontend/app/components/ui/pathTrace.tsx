import { View } from "react-native";
import React from "react";
import { useEffect, useState, useRef } from "react";
import LineFactory from "@/app/hooks/lineFactory";
import { Circle } from "react-native-svg";

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
  path,
  manualFloorChange = false
}) {
  // State for path nodes and current floor's nodes
  const [allPathNodes, setAllPathNodes] = useState<PathNode[]>([]);
  const [currentFloorNodes, setCurrentFloorNodes] = useState<PathNode[]>([]);
  
  // Detect when there's a next floor in the path
  const [nextFloorInPath, setNextFloorInPath] = useState<string | null>(null);
  
  // Track if initial floor detection has happened for this path
  const initialFloorDetectedRef = useRef(false);
  
  // Track the current path ID to detect changes
  const pathIdRef = useRef(null);

  // Reset state when path changes
  useEffect(() => {
    // If there's no path, clear everything
    if (!path) {
      setAllPathNodes([]);
      setCurrentFloorNodes([]);
      setNextFloorInPath(null);
      initialFloorDetectedRef.current = false;
      pathIdRef.current = null;
      return;
    }
    
    // Check if this is a new path
    const isNewPath = pathIdRef.current !== JSON.stringify(path);
    
    // Process path data if it exists
    if (path.path && path.path.length > 0) {
      setAllPathNodes(path.path);
      
      // For new paths, always detect and set initial floor
      if (isNewPath) {
        // Store path signature
        pathIdRef.current = JSON.stringify(path);
        // Reset floor detection flag
        initialFloorDetectedRef.current = false;
        
        // Force initial floor detection for every new path
        if (!manualFloorChange && onInitialFloorDetected) {
          const startNode = path.path[0];
          if (startNode && startNode.floor) {
            const floorNumber = startNode.floor.replace('H-', '');
            const startingFloor = `H${floorNumber}`;
            onInitialFloorDetected(startingFloor);
            initialFloorDetectedRef.current = true;
          }
        }
      }
    }
  }, [path, manualFloorChange, onInitialFloorDetected]);

  // Update current floor nodes whenever relevant state changes
  useEffect(() => {
    if (allPathNodes.length > 0 && currentFloor) {
      const floorFormat = `H-${currentFloor.substring(1)}`;
      
      const nodesForCurrentFloor = allPathNodes.filter(node => node.floor === floorFormat);
      setCurrentFloorNodes(nodesForCurrentFloor);
      
      // Don't check for next floor if manual change was made
      if (!manualFloorChange) {
        checkForFloorChange(floorFormat, nodesForCurrentFloor);
      } else {
        setNextFloorInPath(null);
      }
    } else {
      setCurrentFloorNodes([]);
    }
  }, [allPathNodes, currentFloor, floorChangeConfirmed, manualFloorChange]);
  
  // Helper function to check if path continues to another floor
  const checkForFloorChange = (floorFormat, nodesForCurrentFloor) => {
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
  };

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
