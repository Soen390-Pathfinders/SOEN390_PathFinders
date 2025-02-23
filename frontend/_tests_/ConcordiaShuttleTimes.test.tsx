import React from "react";
import { render, screen, fireEvent, act } from "@testing-library/react-native";
import ConcordiaShuttleTimes from "@/app/components/ui/ConcordiaShuttleTimes";
import {
  timeToMinutes,
  getCurrentTimeInMinutes,
  getNextDepartures,
  formatTime,
} from "@/app/components/ui/ConcordiaShuttleTimes";

//timeToMinutes function
describe("timeToMinutes", () => {
  test("converts a string of the form 10:00 to the number of minutes since midnights", () => {
    expect(timeToMinutes("10:00")).toBe(600);
  });

  test("converts a string of the form 0:00 to the number of minutes since midnights", () => {
    expect(timeToMinutes("00:00")).toBe(0);
  });
  test("converts 12:00 to 720 minutes", () => {
    expect(timeToMinutes("12:00")).toBe(720);
  });
  test("returns NaN for invalid time format", () => {
    expect(timeToMinutes("invalid")).toBeNaN();
  });
  test("returns NaN for out-of-range hours", () => {
    expect(timeToMinutes("25:30")).toBeNaN();
  });
});

//getCurrentTimeInMinutes function
describe("getCurrentTimeInMinutes", () => {
  //first of all mock the date object
  beforeAll(() => {
    //The fixed time is set to 17:00
    jest.spyOn(global, "Date").mockImplementation(() => {
      return {
        toLocaleTimeString: () => "17:00", // Mocked time
      };
    });
  });

  afterAll(() => {
    // Restore the original implementation of Date after tests are done
    jest.restoreAllMocks();
  });

  test("returns the mocked current time in minutes", () => {
    // will pass 17:00 to timeToMinutes function
    expect(getCurrentTimeInMinutes()).toBe(1020);
  });
});

//test getDepartures function
describe("getNextDepartures", () => {
  test("returns the next 3 departures after 17:01", () => {
    const currentMinutes = 1021; // 17:01
    expect(getNextDepartures(currentMinutes)).toEqual({
      loyola: ["17:15", "17:30", "17:45"],
      sgw: ["17:15", "17:30", "17:45"],
    });
  });
  test("returns the next 3 departures after 00:00", () => {
    const currentMinutes = 0; // 00:00
    expect(getNextDepartures(currentMinutes)).toEqual({
      loyola: ["9:15", "9:30", "9:45"],
      sgw: ["9:30", "9:45", "10:00"],
    });
  });
});
//formatTime
describe("formattime", () => {
  test("Formats the time from minutes to  a string of the form 0:00", () => {
    expect(formatTime(600)).toBe("10:00");
  });
  test("Formats the time from minutes to  a string of the form 0;00", () => {
    expect(formatTime(0)).toBe("0:00");
  });
  test("Formats the time from minutes to  a string of the form 0:00", () => {
    expect(formatTime(720)).toBe("12:00");
  });
  test("Formats the time from minutes to  a string of the form 0;00", () => {
    expect(formatTime(1441)).toBe("0:01");
  });
});

//test that the components renders correctly
describe("ConcordiaShuttleTimes rendering", () => {
  test("renders the shuttle departure times screen correctly", () => {
    // Renter the parent component
    render(<ConcordiaShuttleTimes />);

    //Make sure the title "Bus Shuttle Departure Times" is rendered
    expect(screen.getByText("Bus Shuttle Departure Times")).toBeTruthy();

    // Make sure the current time is rendering
    expect(screen.getByText(/Current Time:/)).toBeTruthy();

    // Are the row header rendering correctly
    expect(screen.getByText("LOYOLA CAMPUS")).toBeTruthy();
    expect(screen.getByText("SGW CAMPUS")).toBeTruthy();
  });
});
