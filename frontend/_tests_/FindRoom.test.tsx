// __tests__/FindRoom.test.tsx

jest.mock("@expo/vector-icons", () => {
    const React = require("react");
    return {
      Ionicons: ({ name, size, color }) => React.createElement("Icon", { name, size, color }),
    };
  });
  
import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react-native";
import FindRoom from "../app/screens/FindRoom";

// Mock global alert so it doesn't break tests
global.alert = jest.fn();

// Mocks
jest.mock("@react-navigation/native", () => ({
  useNavigation: () => ({
    navigate: jest.fn(),
  }),
}));

jest.mock("../api/api.js", () => ({
  RoomAPI: {
    get: jest.fn(),
  },
}));

jest.mock("../app/hooks/useTheme", () => () => ({
  theme: "light",
}));

jest.mock("../app/hooks/useRoomCodeValidation", () => () => ({
  validateRoomCode: jest.fn((code) => {
    if (code === "H-920") return { isValid: true };
    return { isValid: false, errorMessage: "Invalid code" };
  }),
}));

describe("FindRoom Screen", () => {
  it("renders correctly", () => {
    const { getByPlaceholderText, getByText } = render(<FindRoom />);
    expect(getByPlaceholderText("Enter room number (e.g., H-920)")).toBeTruthy();
    expect(getByText("Find the room")).toBeTruthy();
  });

  it("alerts for invalid room code", async () => {
    const { getByText, getByPlaceholderText } = render(<FindRoom />);
    const input = getByPlaceholderText("Enter room number (e.g., H-920)");

    fireEvent.changeText(input, "INVALID");
    fireEvent.press(getByText("Find the room"));

    await waitFor(() => {
      expect(global.alert).toHaveBeenCalledWith("Invalid code");
    });
  });

  it("alerts if room is not found", async () => {
    const { getByText, getByPlaceholderText } = render(<FindRoom />);
    const input = getByPlaceholderText("Enter room number (e.g., H-920)");

    const mockGet = require("../api/api.js").RoomAPI.get;
    mockGet.mockResolvedValue(undefined); // simulate room not found

    fireEvent.changeText(input, "H-920");
    fireEvent.press(getByText("Find the room"));

    await waitFor(() => {
      expect(global.alert).toHaveBeenCalledWith(
        "Room not found. Please check the room number and try again."
      );
    });
  });

  it("navigates if room is found", async () => {
    const navigate = jest.fn();
    jest.spyOn(require("@react-navigation/native"), "useNavigation").mockReturnValue({ navigate });

    const mockGet = require("../api/api.js").RoomAPI.get;
    mockGet.mockResolvedValue({ id: 123 });

    const { getByText, getByPlaceholderText } = render(<FindRoom />);
    fireEvent.changeText(getByPlaceholderText("Enter room number (e.g., H-920)"), "H-920");
    fireEvent.press(getByText("Find the room"));

    await waitFor(() => {
      expect(navigate).toHaveBeenCalledWith("(screens)/IndoorMap", {
        roomOrPath: "room",
        nodeInfo: { id: 123 },
      });
    });
  });
});
