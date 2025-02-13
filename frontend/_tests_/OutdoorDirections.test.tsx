import React from "react";
import renderer from "react-test-renderer";
import OutdoorDirections from "@/app/screens/OutdoorDirections";
import { ThemeProvider } from "@/app/components/context/ThemeContext";
import { LocationProvider } from "@/app/components/context/userLocationContext";


jest.mock('@react-native-async-storage/async-storage', () => ({
  setItem: jest.fn(),
  getItem: jest.fn(() => Promise.resolve('light')),
}));

// Mock expo-font properly
jest.mock('expo-font', () => ({
  isLoaded: jest.fn(() => true),
  loadAsync: jest.fn(),
  __metadata__: { loadedNativeFonts: [] }  
}));

// Mock all vector icons
jest.mock('@expo/vector-icons', () => ({
  MaterialIcons: 'MaterialIcons',
  Fontisto: 'Fontisto',
  createIconSet: () => 'Icon'
}));

// Mock GooglePlacesAutocomplete
jest.mock('react-native-google-places-autocomplete', () => ({
  GooglePlacesAutocomplete: () => null
}));

// Mock OutdoorMap component
jest.mock('@/app/components/maps/OutdoorMap', () => {
  return function MockOutdoorMap() {
    return null;
  };
});

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