/**
 * @jest-environment jsdom
 */
import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import FilterPOI from "../app/components/ui/FilterPOI";

// Mock vector icons to prevent expo-font crash
jest.mock("@expo/vector-icons", () => {
  const React = require("react");
  return {
    MaterialIcons: ({ name, size, color }) =>
      React.createElement("MaterialIcons", { name, size, color }),
  };
});

jest.mock("expo-font", () => ({
  loadAsync: jest.fn(),
}));

describe("FilterPOI Component", () => {
  it("opens the modal when filter button is pressed", () => {
    const { getByTestId, queryByText } = render(
      <FilterPOI onFilterPress={jest.fn()} />
    );
    expect(queryByText("Select Filters")).toBeNull();
    fireEvent.press(getByTestId("open-filter-button"));
    expect(queryByText("Select Filters")).toBeTruthy();
  });

  it("selects a category and rating, applies filters", () => {
    const mockFilterPress = jest.fn();
    const { getByTestId, getByText } = render(
      <FilterPOI onFilterPress={mockFilterPress} />
    );

    fireEvent.press(getByTestId("open-filter-button"));
    fireEvent.press(getByTestId("filter-Parks"));
    fireEvent.press(getByTestId("rating-4plus"));
    fireEvent.press(getByTestId("apply-button"));

    expect(mockFilterPress).toHaveBeenCalledWith(["Parks"], [4, 5]);
  });

  it("closes modal when Close is pressed", () => {
    const { getByTestId, queryByText } = render(
      <FilterPOI onFilterPress={jest.fn()} />
    );

    fireEvent.press(getByTestId("open-filter-button"));
    fireEvent.press(getByTestId("close-button"));

    expect(queryByText("Select Filters")).toBeNull();
  });
});
