import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import ToggleAccessibility from "@/app/components/ui/AccessibilityPathToggle";

// Mock the MaterialIcons component
jest.mock("@expo/vector-icons", () => ({
  MaterialIcons: "MaterialIcons",
}));

describe("ToggleAccessibility Component", () => {
  test("renders correctly with accessibility OFF", () => {
    const mockSetAccessibilityNeed = jest.fn();
    const { getByText } = render(
      <ToggleAccessibility
        accessibilityNeed={false}
        setAccessibilityNeed={mockSetAccessibilityNeed}
      />
    );

    // Check if the OFF text is displayed
    expect(getByText(/Accessible Path Option OFF/i)).toBeTruthy();
  });

  test("renders correctly with accessibility ON", () => {
    const mockSetAccessibilityNeed = jest.fn();
    const { getByText } = render(
      <ToggleAccessibility
        accessibilityNeed={true}
        setAccessibilityNeed={mockSetAccessibilityNeed}
      />
    );

    // Check if the ON text is displayed
    expect(getByText(/Accessible Path Option ON/i)).toBeTruthy();
  });

  test("calls setAccessibilityNeed with the opposite value when pressed", () => {
    const mockSetAccessibilityNeed = jest.fn();

    // Test with accessibilityNeed initially false
    const { getByText, rerender } = render(
      <ToggleAccessibility
        accessibilityNeed={false}
        setAccessibilityNeed={mockSetAccessibilityNeed}
      />
    );

    // Find the button and press it
    const button = getByText(/Accessible Path Option OFF/i);
    fireEvent.press(button);

    // Check if setAccessibilityNeed was called with true
    expect(mockSetAccessibilityNeed).toHaveBeenCalledWith(true);

    // Rerender with accessibilityNeed true
    rerender(
      <ToggleAccessibility
        accessibilityNeed={true}
        setAccessibilityNeed={mockSetAccessibilityNeed}
      />
    );

    // Find the button again and press it
    const updatedButton = getByText(/Accessible Path Option ON/i);
    fireEvent.press(updatedButton);

    // Check if setAccessibilityNeed was called with false
    expect(mockSetAccessibilityNeed).toHaveBeenCalledWith(false);
  });
});
