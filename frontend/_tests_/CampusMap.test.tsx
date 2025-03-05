import React from "react";
import { View } from "react-native";
import { render, fireEvent } from "@testing-library/react-native";
import { ThemeProvider } from "../app/components/context/ThemeContext";
import CampusMap from "../app/screens/CampusMap";

jest.mock("@react-native-async-storage/async-storage");

// Mock all child components and the hooks

jest.mock("../app/components/maps/OutdoorMap", () => {
  const { View } = require("react-native");
  return () => <View testID="outdoor-map-mock" />;
});

jest.mock("../app/components/ui/CampusPilotHeader", () => {
  const { View } = require("react-native");
  return () => <View testID="campus-pilot-header" />;
});

jest.mock("../app/components/ui/CampusToggle", () => {
  const { View } = require("react-native");
  return ({ toggleCampus }) => (
    <View testID="campus-toggle" onPress={() => toggleCampus("Loyola")} />
  );
});

jest.mock("../app/hooks/useTheme", () => ({
  __esModule: true,
  default: () => ({
    theme: "light",
    toggleTheme: jest.fn(),
  }),
}));

describe("CampusMap Screen", () => {
  // Test initial campus state
  test("initializes with SGW campus", () => {
    const { getByTestId } = render(
      <ThemeProvider>
        <CampusMap />
      </ThemeProvider>
    );

    const outdoorMap = getByTestId("outdoor-map-mock");
    expect(outdoorMap.props.campus).toBe("SGW");
  });

  // Test campus toggle
  test("campus toggle changes campus state", () => {
    const { getByTestId } = render(
      <ThemeProvider>
        <CampusMap />
      </ThemeProvider>
    );

    const campusToggle = getByTestId("campus-toggle");

    // Simulate campus toggle
    fireEvent.press(campusToggle);

    const outdoorMap = getByTestId("mock-outdoor-map");
    expect(outdoorMap.props.campus).toBe("Loyola");
  });

  // Verify required components are rendered
  test("renders all required components", () => {
    const { getByTestId } = render(
      <ThemeProvider>
        <CampusMap />
      </ThemeProvider>
    );

    expect(() => getByTestId("campus-pilot-header")).not.toThrow();
    expect(() => getByTestId("campus-toggle")).not.toThrow();
    expect(() => getByTestId("outdoor-map-mock")).not.toThrow();
  });
});
