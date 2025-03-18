import { renderHook, act } from "@testing-library/react-hooks";
import useUserLocation from "../hooks/useUserLocation";

// Mock expo-location
jest.mock("expo-location", () => ({
  requestForegroundPermissionsAsync: jest.fn(() =>
    Promise.resolve({ status: "granted" })
  ),
  getCurrentPositionAsync: jest.fn(() =>
    Promise.resolve({
      coords: { latitude: 45.5, longitude: -73.6 },
    })
  ),
}));

// Mock useLocation context
const mockUpdateUserLocation = jest.fn();

jest.mock("../app/components/context/userLocationContext", () => ({
  useLocation: jest.fn(() => ({
    updateUserLocation: mockUpdateUserLocation,
    userLocation: { latitude: 0, longitude: 0 },
  })),
}));

describe("useUserLocation hook", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("requests location permission and updates user location", async () => {
    await act(async () => {
      renderHook(() => useUserLocation());
      // Wait enough time to allow initial location fetch
      await new Promise((res) => setTimeout(res, 10));
    });

    // Permission requested
    expect(
      require("expo-location").requestForegroundPermissionsAsync
    ).toHaveBeenCalled();

    // Location fetched and updateUserLocation called
    expect(require("expo-location").getCurrentPositionAsync).toHaveBeenCalled();
    expect(mockUpdateUserLocation).toHaveBeenCalledWith(45.5, -73.6);
  });

  it("setLocation function updates location", async () => {
    const { result } = renderHook(() => useUserLocation());

    await act(async () => {
      await result.current.setLocation();
    });

    expect(require("expo-location").getCurrentPositionAsync).toHaveBeenCalled();
    expect(mockUpdateUserLocation).toHaveBeenCalledWith(45.5, -73.6);
  });
});
