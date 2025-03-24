// _tests_/FilterPOI.test.tsx
jest.mock("@expo/vector-icons", () => {
    const React = require("react");
    const { Text } = require("react-native");
    return {
      MaterialIcons: ({ name }) => <Text>{name}</Text>,
    };
  });
  
  import React from "react";
  import { render, fireEvent } from "@testing-library/react-native";
  import FilterPOI from "../app/components/ui/FilterPOI";
  
  describe("FilterPOI component", () => {
    const mockOnFilterPress = jest.fn();
  
    it("renders filter button", () => {
      const { getByRole } = render(<FilterPOI onFilterPress={mockOnFilterPress} />);
      const button = getByRole("button");
      expect(button).toBeTruthy();
    });
  
    it("opens modal when filter button is pressed", () => {
      const { getByRole, getByText } = render(<FilterPOI onFilterPress={mockOnFilterPress} />);
      const button = getByRole("button");
      fireEvent.press(button);
      expect(getByText("Select Filters")).toBeTruthy();
    });
  });
  