import React from "react";
import renderer from "react-test-renderer";
import ThemeToggle from "@/app/components/ui/ThemeToggle";
import { ThemeProvider } from "@/app/components/context/ThemeContext";


jest.mock('@react-native-async-storage/async-storage', () => ({
  setItem: jest.fn(),
  getItem: jest.fn(() => Promise.resolve('light')),
  removeItem: jest.fn(),
  clear: jest.fn(),
}));

test("ThemeToggle renders correctly", () => {
  const tree = renderer.create(
    <ThemeProvider>
      <ThemeToggle />
    </ThemeProvider>
  ).toJSON();
  expect(tree).toMatchSnapshot();
});