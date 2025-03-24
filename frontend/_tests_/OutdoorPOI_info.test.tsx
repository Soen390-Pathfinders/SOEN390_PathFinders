import React from "react";
import { render } from "@testing-library/react-native";
import OutdoorPOI_info from "../app/components/ui/OutdoorPOI_info";

describe("OutdoorPOI_info Component", () => {
  const mockInfo = {
    name: "Test Coffee Shop",
    rating: 4.5,
    opening_hours: {
      open_now: true,
      weekday_text: [
        "Monday: 9:00 AM – 5:00 PM",
        "Tuesday: 9:00 AM – 5:00 PM",
      ],
    },
  };

  it("renders name and rating correctly", () => {
    const { getByText } = render(<OutdoorPOI_info info={mockInfo} />);
    expect(getByText("Name : Test Coffee Shop")).toBeTruthy();
    expect(getByText("userRatings: 4.5 ")).toBeTruthy();
  });

  it("displays open now status as Yes", () => {
    const { getByText } = render(<OutdoorPOI_info info={mockInfo} />);
    expect(getByText("Open Now:Yes ")).toBeTruthy();
  });

  it("renders weekday opening hours", () => {
    const { getByText } = render(<OutdoorPOI_info info={mockInfo} />);
    expect(getByText("Monday: 9:00 AM – 5:00 PM")).toBeTruthy();
    expect(getByText("Tuesday: 9:00 AM – 5:00 PM")).toBeTruthy();
  });

  it("shows closed message when open_now is false", () => {
    const closedInfo = {
      ...mockInfo,
      opening_hours: {
        ...mockInfo.opening_hours,
        open_now: false,
      },
    };
    const { getByText } = render(<OutdoorPOI_info info={closedInfo} />);
    expect(getByText("Open Now:No ")).toBeTruthy();
    expect(getByText("This point of interest is currently closed")).toBeTruthy();
  });

  it("renders fallback when hours are missing", () => {
    const infoWithNoHours = {
      ...mockInfo,
      opening_hours: undefined,
    };
    const { getByText } = render(<OutdoorPOI_info info={infoWithNoHours} />);
    expect(getByText("Operating hours not available")).toBeTruthy();
  });
});
