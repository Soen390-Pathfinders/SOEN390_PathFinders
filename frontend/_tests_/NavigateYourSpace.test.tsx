// _tests_/NavigateYourSpace.test.tsx
import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import NavigateYourSpace from "../app/screens/NavigateYourSpace";

// MOCK VECTOR ICONS to prevent expo-font error
jest.mock("@expo/vector-icons", () => ({
  MaterialIcons: "MaterialIcons",
}));

// MOCK useTheme if necessary (if it reads from context)
jest.mock("../app/hooks/useTheme", () => ({
  __esModule: true,
  default: () => ({
    theme: "light",
  }),
}));

describe("NavigateYourSpace Screen", () => {
  it("renders correctly with all components", () => {
    const { getByPlaceholderText, getByText } = render(<NavigateYourSpace />);
    expect(getByText("Navigate Your Space")).toBeTruthy();
    expect(getByPlaceholderText("Start location (e.g., H-920)")).toBeTruthy();
    expect(getByPlaceholderText("Destination (e.g., H-945)")).toBeTruthy();
    expect(getByText("Get directions")).toBeTruthy();
  });

  it("updates input fields when typing", () => {
    const { getByPlaceholderText } = render(<NavigateYourSpace />);
    const startInput = getByPlaceholderText("Start location (e.g., H-920)");
    const destInput = getByPlaceholderText("Destination (e.g., H-945)");

    fireEvent.changeText(startInput, "H-920");
    fireEvent.changeText(destInput, "H-945");

    expect(startInput.props.value).toBe("H-920");
    expect(destInput.props.value).toBe("H-945");
  });

  it("presses the Get directions button", () => {
    const { getByText } = render(<NavigateYourSpace />);
    const button = getByText("Get directions");
    fireEvent.press(button);
    // no actual handler yet, but the press shouldn't crash
  });
});
