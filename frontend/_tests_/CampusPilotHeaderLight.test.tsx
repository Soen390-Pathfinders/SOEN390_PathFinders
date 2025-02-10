import renderer from "react-test-renderer";
import CampusPilotHeader from "@/app/components/ui/CampusPilotHeader";
import { ThemeProvider } from "@/app/components/context/ThemeContext";

jest.mock("@react-native-async-storage/async-storage", () => ({
  setItem: jest.fn(),
  getItem: jest.fn(() => Promise.resolve("light")),
  removeItem: jest.fn(),
  clear: jest.fn(),
}));

test("Headers  renders correctly in light mode", () => {
  const tree = renderer
    .create(
      <ThemeProvider>
        <CampusPilotHeader />
      </ThemeProvider>
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
