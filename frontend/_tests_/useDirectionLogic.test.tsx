/**
 * @jest-environment jsdom
 */
import { renderHook, render, act } from "@testing-library/react";
import useDirectionLogic from "../app/hooks/useDirectionLogic";

// Mock useLocation
jest.mock("../app/components/context/userLocationContext", () => ({
  useLocation: jest.fn(() => ({
    userLocation: { latitude: 45.5, longitude: -73.6 },
  })),
}));

// Mock Alert
jest.mock("react-native/Libraries/Alert/Alert", () => ({
  alert: jest.fn(),
}));

describe("useDirectionLogic hook", () => {
  it("has correct initial state", () => {
    const { result } = renderHook(() => useDirectionLogic());

    expect(result.current.startLocation).toBe(null);
    expect(result.current.destination).toBe(null);
    expect(result.current.travelMode).toBe("WALKING");
  });

  it("sets submittedStart and submittedDestination on handleGoPress", () => {
    const { result } = renderHook(() => useDirectionLogic());

    act(() => {
      result.current.setStartLocation("start");
      result.current.setDestination("destination");
    });

    act(() => {
      result.current.handleGoPress();
    });

    expect(result.current.submittedStart).toBe("start");
    expect(result.current.submittedDestination).toBe("destination");
  });

  it("triggers Alert if start or destination missing", () => {
    const { result } = renderHook(() => useDirectionLogic());
    const alertMock = require("react-native/Libraries/Alert/Alert").alert;

    act(() => {
      result.current.handleGoPress();
    });

    expect(alertMock).toHaveBeenCalledWith(
      "Missing Information",
      "Please fill in both the Start Location and Destination.",
      [{ text: "OK", style: "default" }]
    );
  });

  it("sets start location correctly with setToCurrentLocation", () => {
    const { result } = renderHook(() => useDirectionLogic());

    act(() => {
      result.current.setToCurrentLocation("start");
    });

    expect(result.current.startLocation).toBe("45.500000, -73.600000");
  });

  it("sets destination correctly with setToCurrentLocation", () => {
    const { result } = renderHook(() => useDirectionLogic());

    act(() => {
      result.current.setToCurrentLocation("destination");
    });

    expect(result.current.destination).toBe("45.500000, -73.600000");
  });

  test("buildng location is null", () => {
    // Mock console.error to monitor output
    const consoleErrorSpy = jest
      .spyOn(console, "error")
      .mockImplementation(() => {});

    // Use renderHook instead of render + component
    const { result } = renderHook(() => useDirectionLogic());

    // Call the method with null building location
    act(() => {
      result.current.setToBuildingLocation(null, null);
    });

    // Verify console.error was called with the expected message
    expect(consoleErrorSpy).toHaveBeenCalledWith(
      "Building location is not available."
    );

    // Restore console error
    consoleErrorSpy.mockRestore();
  });
  it("correctly sets start location state", () => {
    // Render the hook normally
    const { result } = renderHook(() => useDirectionLogic());

    // Mock building location
    const buildingLocation = {
      latitude: 45.123456789,
      longitude: -73.987654321,
    };

    // Expected formatted text
    const expectedText = "45.123457, -73.987654";

    // Call the function
    act(() => {
      result.current.setToBuildingLocation("start", buildingLocation);
    });

    // Just check that the state was updated correctly
    expect(result.current.startLocation).toBe(expectedText);
  });

  it("correctly sets destination location state", () => {
    // Render the hook normally
    const { result } = renderHook(() => useDirectionLogic());

    // Mock building location
    const buildingLocation = {
      latitude: 46.555555555,
      longitude: -74.666666666,
    };

    // Expected formatted text
    const expectedText = "46.555556, -74.666667";

    // Call the function
    act(() => {
      result.current.setToBuildingLocation("destination", buildingLocation);
    });

    // the state was updated correctly
    expect(result.current.destination).toBe(expectedText);
  });
});
