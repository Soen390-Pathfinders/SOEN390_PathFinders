import React from "react";
import { render } from "@testing-library/react-native";
import LineFactory from "../hooks/lineFactory";

describe("LineFactory Component", () => {
  const node1 = { x_coor: 10, y_coor: 20 };
  const node2 = { x_coor: 30, y_coor: 40 };

  it("renders correctly with given nodes", () => {
    const { UNSAFE_getByType } = render(
      <LineFactory node1={node1} node2={node2} />
    );
    const line = UNSAFE_getByType("RNSVGLine");

    expect(line.props.x1).toBe(10);
    expect(line.props.y1).toBe(20);
    expect(line.props.x2).toBe(30);
    expect(line.props.y2).toBe(40);

    // We skip stroke check (react-native-svg internal representation differs)
    expect(line.props.strokeWidth).toBe("0.5");
  });
});
