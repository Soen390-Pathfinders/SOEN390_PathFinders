import { View, Text } from "react-native";
import React from "react";
import { useEffect, useState } from "react";
import pathNodes from "../../data/pathNodes.json";
import LineFactory from "@/app/hooks/lineFactory";
import { Circle } from "react-native-svg";

export default function PathTrace() {
  //Get the information from the json file
  const pathInfo = pathNodes;

  //Get the data from the pathode Json file
  const [nodePath, setNodePath] = useState<pathNodes[]>([]);

  // Define the type for each node object
  type pathNodes = {
    id: number;
    floor: string;
    description: string | null;
    x_coor: number;
    y_coor: number;
  };

  //The path will be updated every time the json file is modified
  useEffect(() => {
    setNodePath(pathNodes); // Load JSON on component mount
  }, [pathNodes]);

  return (
    <View>
      {nodePath.map((node, index) => {
        //For every node in the path, create a line to the next node using lineFactory
        //make sure the index is not the last node

        if (index === nodePath.length - 1) {
          return (
            <View key={node.id}>
              {/* Create a circle for the last node */}
              <Circle
                cx={node.x_coor}
                cy={node.y_coor}
                r="0.5"
                fill="red" // red color for the destination
                stroke="none"
              />
            </View>
          );
        }
        return (
          <View>
            {/*Create a circle for each node */}
            <Circle
              cx={node.x_coor}
              cy={node.y_coor}
              r="0.5"
              fill={index === 0 ? "blue" : "green"}
              stroke="none"
            />
            {/*LineFactory returns every line segments based on the nodes */}
            <LineFactory
              key={`line-${index}`}
              node1={node}
              node2={nodePath[index + 1]}
            />
          </View>
        );
      })}
    </View>
  );
}
