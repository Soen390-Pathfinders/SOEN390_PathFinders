// __tests__/IndoorDirections.test.tsx
import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import IndoorDirections from "../app/screens/IndoorDirections";

jest.mock("@react-navigation/native", () => ({
  useNavigation: () => ({
    navigate: jest.fn(),
  }),
}));

jest.mock("../app/hooks/useTheme", () => () => ({
  theme: "light",
}));

describe("IndoorDirections Screen", () => {
  it("renders correctly", () => {
    const { getByText } = render(<IndoorDirections />);
    expect(getByText("Find Your Way")).toBeTruthy();
    expect(getByText("Find a room")).toBeTruthy();
    expect(getByText("Get directions")).toBeTruthy();
  });

  it("navigates to FindRoom", () => {
    const navigate = jest.fn();
    jest.spyOn(require("@react-navigation/native"), "useNavigation").mockReturnValue({ navigate });

    const { getByText } = render(<IndoorDirections />);
    fireEvent.press(getByText("Find a room"));
    expect(navigate).toHaveBeenCalledWith("(screens)/FindRoom");
  });

  it("navigates to NavigateYourSpace", () => {
    const navigate = jest.fn();
    jest.spyOn(require("@react-navigation/native"), "useNavigation").mockReturnValue({ navigate });

    const { getByText } = render(<IndoorDirections />);
    fireEvent.press(getByText("Get directions"));
    expect(navigate).toHaveBeenCalledWith("(screens)/NavigateYourSpace");
  });
});