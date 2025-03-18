import React from "react";
import { render } from "@testing-library/react-native";
import AppLogo from "../app/components/ui/AppLogo";

// Mock the useTheme hook
jest.mock("../app/hooks/useTheme", () => ({
  __esModule: true,
  default: jest.fn(),
}));

import useTheme from "../hooks/useTheme";

describe("AppLogo Component", () => {
  it("renders correctly with light theme", () => {
    (useTheme as jest.Mock).mockReturnValue({
      theme: "light",
      toggleTheme: jest.fn(),
    });

    const { toJSON } = render(<AppLogo />);
    expect(toJSON()).toMatchSnapshot();
  });

  it("renders correctly with dark theme", () => {
    (useTheme as jest.Mock).mockReturnValue({
      theme: "dark",
      toggleTheme: jest.fn(),
    });

    const { toJSON } = render(<AppLogo />);
    expect(toJSON()).toMatchSnapshot();
  });
});
