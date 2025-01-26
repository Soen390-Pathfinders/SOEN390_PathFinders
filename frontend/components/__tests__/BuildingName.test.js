// HomeScreen.test.js
import React from "react";
import { render } from "@testing-library/react-native";
import HomeScreen from "../../components/Test"; // Make sure the path is correct

test("it renders the welcome text", () => {
  const { getByText } = render(<HomeScreen />);

  // Check if the text "Welcome!" is rendered
  const welcomeText = getByText("Welcome!");
  expect(welcomeText).toBeTruthy();
});

test("it renders the sdsd text", () => {
  const { getByText } = render(<HomeScreen />);

  // Check if the text "Welcome!" is rendered
  const welcomeText = getByText("Weldsdscome!");
  expect(welcomeText).toBeTruthy();
});
