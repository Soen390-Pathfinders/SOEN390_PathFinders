import renderer from "react-test-renderer";
import { test } from '@jest/globals';
import CampusPilotHeader from "@/app/components/ui/CampusPilotHeader";
import { ThemeProvider } from "@/app/components/context/ThemeContext";
import { jest } from '@jest/globals';

jest.mock("@react-native-async-storage/async-storage", () => ({
  setItem: jest.fn(),
  getItem: jest.fn(() => Promise.resolve("dark")),
  removeItem: jest.fn(),
  clear: jest.fn(),
}));

test("Headers  renders correctly in dark mode", () => {
  const tree = renderer
    .create(
      <ThemeProvider>
        <CampusPilotHeader />
      </ThemeProvider>
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
