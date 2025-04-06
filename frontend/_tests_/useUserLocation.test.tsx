/**
 * @jest-environment jsdom
 */
import { renderHook, act } from "@testing-library/react";
import useUserLocation from "../app/hooks/useUserLocation";

// 🧩 MOCK FloorplanRoom to avoid crashing from ref.current.zoom
jest.mock("../app/components/ui/FloorplanRoom", () => ({
  __esModule: true,
  default: () => null,
}));

// ✅ MOCK expo-location
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

// ✅ MOCK useLocation context
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
      await new Promise((res) => setTimeout(res, 10));
    });

    expect(
      require("expo-location").requestForegroundPermissionsAsync
    ).toHaveBeenCalled();

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
