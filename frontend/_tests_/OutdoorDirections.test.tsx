import React from "react";
import renderer from "react-test-renderer";
import OutdoorDirections from "@/app/screens/OutdoorDirections";
import { ThemeProvider } from "@/app/components/context/ThemeContext";
import { LocationProvider } from "@/app/components/context/userLocationContext";

// Mock GooglePlacesAutocomplete
jest.mock('react-native-google-places-autocomplete', () => ({
  GooglePlacesAutocomplete: () => null
}));

// Mock AsyncStorage
jest.mock('@react-native-async-storage/async-storage', () => ({
  setItem: jest.fn(),
  getItem: jest.fn(() => Promise.resolve('light')),
}));

test("Outdoor Directions renders correctly", () => {
  const tree = renderer.create(
    <LocationProvider>
      <ThemeProvider>
        <OutdoorDirections />
      </ThemeProvider>
    </LocationProvider>
  ).toJSON();
  expect(tree).toMatchSnapshot();
});