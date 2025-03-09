import { View, Text } from "react-native";
import React from "react";
import { useEffect, useState } from "react";
import pathNodes from "../../data/pathNodes.json";
import LineFactory from "@/app/hooks/lineFactory";

export default function PathTrace() {
  //Get the information from the json file
  const myData = pathNodes; // No need for fetch
  console.log(myData);

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

  useEffect(() => {
    setNodePath(pathNodes); // Load JSON on component mount
  }, []);

  // **Use a for loop to generate components and store them in an array**
  const mypath = LineFactory({ nodePath });

  return (
    <View>
      {mypath} {/* Render the array of lines */}{" "}
    </View>
  );
}
