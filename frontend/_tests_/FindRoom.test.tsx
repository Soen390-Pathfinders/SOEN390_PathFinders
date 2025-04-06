import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react-native";
import FindRoom from "../app/screens/FindRoom";

// ✅ No React hook dependency needed
global.alert = jest.fn();

jest.mock("@expo/vector-icons", () => {
  const React = require("react");
  return {
    Ionicons: ({ name, size, color }) =>
      React.createElement("Icon", { name, size, color }),
  };
});

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

describe("FindRoom Screen (no react hook mocking)", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("navigates if room is found", async () => {
    const mockGet = require("../api/api.js").RoomAPI.get;
    mockGet.mockResolvedValue({ id: 123 });

    const mockNavigate = jest.fn();
    const mockNavigation = { navigate: mockNavigate };

    const { getByText, getByPlaceholderText } = render(
      <FindRoom navigation={mockNavigation} />
    );

    fireEvent.changeText(getByPlaceholderText("Enter room number (e.g., H-920)"), "H-920");
    fireEvent.press(getByText("Find the room"));

    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith("(screens)/IndoorMap", {
        roomOrPath: "room",
        nodeInfo: { id: 123 },
        path: null,
      });
    });
  });
});
