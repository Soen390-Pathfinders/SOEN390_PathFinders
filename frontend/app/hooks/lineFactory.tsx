import { View } from "react-native";
import React from "react";
import { Line } from "react-native-svg";

export default function LineFactory({ node1, node2 }) {
  return (
    // Trace and retrun the line item for each set of 2 nodes
    <View>
      <Line
        x1={node1.x_coor}
        y1={node1.y_coor}
        x2={node2.x_coor}
        y2={node2.y_coor}
        stroke="green"
        strokeLinejoin="miter"
        strokeWidth="0.5"
      />
    </View>
  );
}
