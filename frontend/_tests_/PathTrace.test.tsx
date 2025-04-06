import React from "react";
import { render } from "@testing-library/react-native";
import PathTrace from "../app/components/ui/pathTrace";

jest.mock("expo-image", () => {
  const { View, Text } = require("react-native");
  return {
    Image: ({ testID }) => (
      <View testID={testID}>
        <Text>Mocked Image</Text>
      </View>
    ),
  };
});

jest.mock("@likashefqet/react-native-image-zoom", () => {
  const React = require("react");
  const { forwardRef, useImperativeHandle } = React;
  const { View, Text } = require("react-native");

  return {
    Zoomable: forwardRef((props, ref) => {
      useImperativeHandle(ref, () => ({
        zoom: jest.fn(),
      }));
      return (
        <View testID="zoomable-mock">
          <Text>Mocked Zoomable</Text>
          {props.children}
        </View>
      );
    }),
  };
});

describe("PathTrace Component", () => {
  it("renders without crashing", () => {
    render(
      <PathTrace
        currentFloor={5}
        onFloorChangeRequired={jest.fn()}
        floorChangeConfirmed={true}
        setFloorChangeConfirmed={jest.fn()}
        onInitialFloorDetected={jest.fn()}
        path={[]}
        manualFloorChange={false}
      />
    );
  });
});
