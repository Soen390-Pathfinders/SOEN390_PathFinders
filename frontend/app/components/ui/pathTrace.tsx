import { View } from "react-native";
import React, { useEffect, useState, useRef } from "react";
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
  currentBuilding,
  onInitialFloorDetected = undefined,
  onDetectedCrossBuildingPath = undefined,
  path,
  manualFloorChange = false,
}) {
  const [allPathNodes, setAllPathNodes] = useState<PathNode[]>([]);
  const [currentFloorNodes, setCurrentFloorNodes] = useState<PathNode[]>([]);
  const [nextFloorInPath, setNextFloorInPath] = useState<string | null>(null);

  const initialFloorDetectedRef = useRef(false);
  const pathIdRef = useRef(null);

  const getBuildingFromFloor = (floorStr: string): string => {
    const match = floorStr.match(/^[A-Za-z0-9]+/);
    return match ? match[0] : "";
  };

  useEffect(() => {
    if (!path) {
      setAllPathNodes([]);
      setCurrentFloorNodes([]);
      setNextFloorInPath(null);
      initialFloorDetectedRef.current = false;
      pathIdRef.current = null;
      return;
    }

    const isNewPath = pathIdRef.current !== JSON.stringify(path);

    if (path.path && path.path.length > 0) {
      setAllPathNodes(path.path);

      if (isNewPath) {
        pathIdRef.current = JSON.stringify(path);
        initialFloorDetectedRef.current = false;

        const startNode = path.path[0];
        const endNode = path.path[path.path.length - 1];

        const floorNumber = startNode.floor.replace(`${getBuildingFromFloor(startNode.floor)}-`, "");
        const startingFloor = `${getBuildingFromFloor(startNode.floor)}${floorNumber}`;

        if (onInitialFloorDetected && typeof onInitialFloorDetected === 'function') {
          onInitialFloorDetected(startingFloor);
        }

        if (!manualFloorChange && onInitialFloorDetected) {
          if (startNode && startNode.floor) {
            const floorNumber = startNode.floor.replace(`${getBuildingFromFloor(startNode.floor)}-`, "");
            const startingFloor = `${getBuildingFromFloor(startNode.floor)}${floorNumber}`;
            onInitialFloorDetected(startingFloor);
            initialFloorDetectedRef.current = true;
          }
        }

        const startBuilding = getBuildingFromFloor(startNode.floor);
        const endBuilding = getBuildingFromFloor(endNode.floor);
        const isCrossBuilding = startBuilding !== endBuilding;

        if (onDetectedCrossBuildingPath && typeof onDetectedCrossBuildingPath === 'function') {
          if (isCrossBuilding) {
            let map_to_coordinate = null;
            if (endBuilding === 'H') {
              map_to_coordinate = "45.4582,-73.6405";
            }
            onDetectedCrossBuildingPath(true, map_to_coordinate);
          }
        }
      }
    }
  }, [path, manualFloorChange, onInitialFloorDetected]);

  useEffect(() => {
    if (allPathNodes.length > 0 && currentFloor && currentBuilding) {
      const floorFormat = `${currentBuilding}-${currentFloor.substring(1)}`;

      const nodesForCurrentFloor = allPathNodes.filter(node => {
        const building = getBuildingFromFloor(node.floor);
        return node.floor === floorFormat && building === currentBuilding;
      });

      setCurrentFloorNodes(nodesForCurrentFloor);

      if (!manualFloorChange) {
        checkForFloorChange(floorFormat, nodesForCurrentFloor);
      } else {
        setNextFloorInPath(null);
      }
    } else {
      setCurrentFloorNodes([]);
    }
  }, [allPathNodes, currentFloor, currentBuilding, floorChangeConfirmed, manualFloorChange]);

  const checkForFloorChange = (floorFormat, nodesForCurrentFloor) => {
    const floorIndices = allPathNodes.map((node, index) => ({ floor: node.floor, index }));
    const currentFloorIndices = floorIndices.filter(item => item.floor === floorFormat);

    if (currentFloorIndices.length > 0) {
      const lastNodeIndexOnCurrentFloor = Math.max(...currentFloorIndices.map(item => item.index));

      if (lastNodeIndexOnCurrentFloor < allPathNodes.length - 1) {
        const nextFloorNode = allPathNodes[lastNodeIndexOnCurrentFloor + 1];

        const nextBuilding = getBuildingFromFloor(nextFloorNode.floor);
        const nextFloorNumber = nextFloorNode.floor.replace(`${nextBuilding}-`, "");
        const nextFloor = `${nextBuilding}${nextFloorNumber}`;

        if (nodesForCurrentFloor.length > 0 && !floorChangeConfirmed) {
          onFloorChangeRequired(nextFloor);
          setNextFloorInPath(nextFloor);
        }
      } else {
        setNextFloorInPath(null);
      }
    }
  };

  if (currentFloorNodes.length === 0) {
    return null;
  }

  return (
    <View>
      {currentFloorNodes.map((node, index) => {
        return (
          <View key={index}>
            <Circle
              cx={node.x_coor}
              cy={node.y_coor}
              r="0.5"
              fill={
                index === 0 ? "blue" :
                index === currentFloorNodes.length - 1 ? "red" : "green"
              }
              stroke="none"
            />
            {index !== currentFloorNodes.length - 1 && (
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