import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import NavigateYourSpace from "../app/screens/NavigateYourSpace";

// MOCK VECTOR ICONS
jest.mock("@expo/vector-icons", () => {
  const React = require("react");
  return {
    MaterialIcons: (props: any) => React.createElement("MaterialIcons", props),
  };
});

// MOCK ALERT
global.alert = jest.fn();

// MOCK NAVIGATION
jest.mock("expo-router", () => ({
  useNavigation: () => ({
    navigate: jest.fn(),
  }),
}));

// MOCK THEME
jest.mock("../app/hooks/useTheme", () => () => ({
  theme: "light",
}));

// MOCK API
jest.mock("../api/api", () => ({
  PathAPI: {
    shortestPathToRoom: jest.fn(() => Promise.resolve("mockedRoomPath")),
    shortestPathToAmenity: jest.fn(() => Promise.resolve("mockedAmenityPath")),
  },
}));

describe("NavigateYourSpace", () => {
  it("renders all inputs and button", () => {
    const { getByPlaceholderText, getByText } = render(<NavigateYourSpace />);
    expect(getByPlaceholderText("Start location (e.g., H-920)")).toBeTruthy();
    expect(getByPlaceholderText("Destination (room or amenity)")).toBeTruthy();
    expect(getByText("Get directions")).toBeTruthy();
  });

  it("shows alert when start location is empty", () => {
    const { getByText } = render(<NavigateYourSpace />);
    fireEvent.press(getByText("Get directions"));
    expect(global.alert).toHaveBeenCalledWith("Please enter a start location");
  });

  it("shows alert when destination is empty", () => {
    const { getByText, getByPlaceholderText } = render(<NavigateYourSpace />);
    fireEvent.changeText(
      getByPlaceholderText("Start location (e.g., H-920)"),
      "H-920"
    );
    fireEvent.press(getByText("Get directions"));
    expect(global.alert).toHaveBeenCalledWith("Please enter a destination");
  });

  it("calls API for room path when valid input given", async () => {
    const { getByText, getByPlaceholderText } = render(<NavigateYourSpace />);
    fireEvent.changeText(
      getByPlaceholderText("Start location (e.g., H-920)"),
      "H-920"
    );
    fireEvent.changeText(
      getByPlaceholderText("Destination (room or amenity)"),
      "H-1001"
    );
    fireEvent.press(getByText("Get directions"));

    await new Promise((r) => setTimeout(r, 0)); // wait for async
    expect(
      require("../api/api").PathAPI.shortestPathToRoom
    ).toHaveBeenCalledWith("H-920", "H-1001", false);
  });

  it("calls API for amenity when matched", async () => {
    const { getByText, getByPlaceholderText } = render(<NavigateYourSpace />);
    fireEvent.changeText(
      getByPlaceholderText("Start location (e.g., H-920)"),
      "H-920"
    );
    fireEvent.changeText(
      getByPlaceholderText("Destination (room or amenity)"),
      "Water Fountain"
    );
    fireEvent.press(getByText("Get directions"));

    await new Promise((r) => setTimeout(r, 0)); // wait for async
    expect(
      require("../api/api").PathAPI.shortestPathToAmenity
    ).toHaveBeenCalled();
  });
});
