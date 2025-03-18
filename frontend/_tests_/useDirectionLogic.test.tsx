import { renderHook, act } from "@testing-library/react-hooks";
import useDirectionLogic from "../hooks/useDirectionLogic";

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
});
