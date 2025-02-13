import React from "react";
import renderer from "react-test-renderer";
import CustomDrawerContent from "@/app/drawer/CustomDrawerContent";
import { ThemeProvider } from "@/app/components/context/ThemeContext";
import { SafeAreaProvider } from 'react-native-safe-area-context';

// Mock AsyncStorage
jest.mock('@react-native-async-storage/async-storage', () => ({
  setItem: jest.fn(),
  getItem: jest.fn(() => Promise.resolve('light')),
}));

// Mock expo-router
jest.mock('expo-router', () => ({
  useRouter: () => ({
    push: jest.fn(),
  }),
  useNavigation: () => ({
    dispatch: jest.fn(),
    navigate: jest.fn(),
  }),
}));

// Mock drawer
jest.mock('@react-navigation/drawer', () => ({
  createDrawerNavigator: jest.fn(),
  DrawerContentScrollView: ({ children }) => children,
  DrawerItemList: () => null,
  DrawerItem: () => null,
}));

// Mock native
jest.mock('@react-navigation/native', () => ({
  DrawerActions: {
    closeDrawer: jest.fn(),
  },
}));

test("Drawer menu shows navigation options", () => {
  const tree = renderer.create(
    <SafeAreaProvider>
      <ThemeProvider>
        <CustomDrawerContent />
      </ThemeProvider>
    </SafeAreaProvider>
  ).toJSON();
  expect(tree).toMatchSnapshot();
});