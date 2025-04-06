import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import OutdoorPOI_info from "../app/components/ui/OutdoorPOI_info";

// Mock vector icons to prevent font loading issues
jest.mock("react-native-vector-icons/MaterialIcons", () => "Icon");

// Mock useUserLocation hook
jest.mock("@/app/hooks/useUserLocation", () => ({
  __esModule: true,
  default: () => ({
    userLocation: { latitude: 45.497, longitude: -73.579 },
    setLocation: jest.fn(),
  }),
}));

// Mock Reanimated
jest.mock("react-native-reanimated", () =>
  require("react-native-reanimated/mock")
);

const mockPlace = {
  name: "Test Place",
  rating: 4.5,
  opening_hours: {
    open_now: true,
    weekday_text: ["Monday: 9AM–5PM", "Tuesday: 9AM–5PM"],
  },
  geometry: {
    location: { lat: 45.5, lng: -73.6 },
  },
};

describe("OutdoorPOI_info", () => {
  it("renders name, distance, rating, and status", () => {
    const { getByText } = render(
      <OutdoorPOI_info info={mockPlace} onDirectionPress={jest.fn()} placeId="123" />
    );

    expect(getByText("Test Place")).toBeTruthy();
    expect(getByText(/★/)).toBeTruthy();
    expect(getByText(/Distance:/)).toBeTruthy();
    expect(getByText(/Open now/)).toBeTruthy();
  });

  it("calls onDirectionPress when Directions is pressed", () => {
    const onDirectionPressMock = jest.fn();
    const { getByText } = render(
      <OutdoorPOI_info
        info={mockPlace}
        onDirectionPress={onDirectionPressMock}
        placeId="abc123"
      />
    );

    fireEvent.press(getByText("Directions"));
    expect(onDirectionPressMock).toHaveBeenCalledWith("abc123");
  });
  it("expands to show hours when Schedule is pressed", () => {
    const { getByText } = render(
      <OutdoorPOI_info info={mockPlace} onDirectionPress={jest.fn()} placeId="123" />
    );
  
    // Click Schedule
    fireEvent.press(getByText("Schedule"));
  
    // Assert hours are visible
    expect(getByText("Open Hours:")).toBeTruthy();
    expect(getByText("Monday: 9AM–5PM")).toBeTruthy();
  });
  

  it("shows warning if place is closed", () => {
    const closedPlace = {
      ...mockPlace,
      opening_hours: {
        open_now: false,
        weekday_text: [],
      },
    };

    const { getByText } = render(
      <OutdoorPOI_info info={closedPlace} onDirectionPress={jest.fn()} placeId="123" />
    );

    expect(getByText("This point of interest is currently closed")).toBeTruthy();
  });
});
