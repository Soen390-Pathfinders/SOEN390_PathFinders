// _tests_/FloorplanRoom.test.tsx
import React from "react";
import { render, waitFor } from "@testing-library/react-native";
import FloorplanRoom from "../app/components/ui/FloorplanRoom";

jest.mock("expo-image", () => {
  const { View, Text } = require("react-native");
  return {
    Image: ({ testID }) => <View testID={testID}><Text>Mocked Image</Text></View>
  };
});

jest.mock("@likashefqet/react-native-image-zoom", () => {
  const React = require("react");
  const { forwardRef } = React;
  const { View, Text } = require("react-native");

  return {
    Zoomable: forwardRef((props, ref) => {
      React.useImperativeHandle(ref, () => ({
        zoom: jest.fn()
      }));
      return <View {...props}><Text>Mocked Zoomable</Text>{props.children}</View>;
    })
  };
});

describe("FloorplanRoom", () => {
  const mockNodeInfo = {
    capacity: 10,
    code: "H-920",
    floor: 5,
    id: "room1",
    number: "920",
    room_types: ["Classroom"],
    location_data: {
      amenity_names: ["Coffee"],
      description: "A cool room",
      floor: 5,
      is_accessible: true,
      x_coor: 12,
      y_coor: 72,
    },
  };

  it("renders the floorplan image and the room circle", async () => {
    const { getByTestId, queryByTestId } = render(
      <FloorplanRoom nodeInfo={mockNodeInfo} />
    );

    await waitFor(() => {
      expect(getByTestId("roomMap")).toBeTruthy();
      expect(queryByTestId("roomCircle")).toBeTruthy();
    });
  });

  it("does not crash if nodeInfo is undefined", () => {
    const { getByTestId } = render(<FloorplanRoom nodeInfo={undefined} />);
    expect(getByTestId("roomMap")).toBeTruthy(); // Still renders map
  });
});
