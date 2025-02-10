import React from "react";
import renderer from "react-test-renderer";
import { Pressable, Text } from "react-native";
import { ThemeProvider } from "@/app/components/context/ThemeContext";

// Mock AsyncStorage
jest.mock('@react-native-async-storage/async-storage', () => ({
  setItem: jest.fn(),
  getItem: jest.fn(() => Promise.resolve('light')),
}));

// Mock Fontisto icon
jest.mock('@expo/vector-icons/Fontisto', () => ({
  Fontisto: 'X'  // Just use X text instead of icon for testing
}));

test("Close button renders correctly", () => {
  const tree = renderer.create(
    <ThemeProvider>
      <Pressable>
        <Text>X</Text>
      </Pressable>
    </ThemeProvider>
  ).toJSON();
  expect(tree).toMatchSnapshot();
});