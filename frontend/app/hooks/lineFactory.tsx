import { View, Text } from "react-native";
import React from "react";
import { Line } from "react-native-svg";

export default function LineFactory({ nodePath }) {
  // Define the type of segmentsArray to hold React Elements (SVG <Line> elements)
  const segmentsArray: JSX.Element[] = [];

  for (let i = 0; i < nodePath.length - 1; i++) {
    let x1 = nodePath[i].x_coor;
    let y1 = nodePath[i].y_coor;
    let x2 = nodePath[i + 1].x_coor;
    let y2 = nodePath[i + 1].y_coor;
    let key = "line" + i;
    let line = (
      <Line
        key={key}
        x1={x1}
        y1={y1}
        x2={x2}
        y2={y2}
        stroke="green"
        strokeWidth="2"
      />
    );
    segmentsArray.push(line);
  }
  return (
    // Return the array of lines
    segmentsArray
  );
}
