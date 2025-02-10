import renderer from "react-test-renderer";
import OutdoorDirections from "@/app/screens/OutdoorDirections";
import { ThemeProvider } from "@/app/components/context/ThemeContext";
import { LocationProvider } from "@/app/components/context/userLocationContext";

jest.mock("@react-native-async-storage/async-storage", () => ({
  setItem: jest.fn(),
  getItem: jest.fn(() => Promise.resolve("light")),
  removeItem: jest.fn(),
  clear: jest.fn(),
}));

test("Outdoor Directions renders correctly", () => {
  const tree = renderer
    .create(
      <LocationProvider>
        <ThemeProvider>
          <OutdoorDirections />
        </ThemeProvider>
      </LocationProvider>
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
