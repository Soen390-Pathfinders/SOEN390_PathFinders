/**
 * @jest-environment jsdom
 */
import React from "react";
import { render } from "@testing-library/react-native";
import OutdoorMap from "../app/components/maps/OutdoorMap";

// Mock constants
jest.mock("../app/constants", () => ({
  GOOGLE_MAPS_APIKEY: "fake-api-key",
}));

// Mock react-native-maps
jest.mock("react-native-maps", () => {
  const React = require("react");
  const { View } = require("react-native");
  const Mock = (props) => <View {...props} />;
  Mock.Marker = (props) => <View {...props} />;
  return {
    __esModule: true,
    default: Mock,
    Marker: Mock.Marker,
    PROVIDER_DEFAULT: "default",
  };
});

// Mock MapViewDirections
jest.mock("react-native-maps-directions", () => {
  return jest.fn(() => {
    return <></>;
  });
});

// Mock PolygonRender
jest.mock("../app/components/maps/PolygonRender", () => {
  return jest.fn(() => <></>);
});

// Mock userLocationContext
jest.mock("../app/components/context/userLocationContext", () => ({
  useLocation: () => ({
    userLocation: { latitude: 45.5, longitude: -73.6 },
  }),
}));

describe("OutdoorMap", () => {
  const baseProps = {
    origin: null,
    destination: null,
    travelMode: "WALKING",
    onDurationChange: jest.fn(),
    campus: "SGW",
    setBuildingLocation: jest.fn(),
  };

  it("renders MapView with initial region", () => {
    const { getByTestId } = render(<OutdoorMap {...baseProps} />);
    expect(getByTestId("map")).toBeTruthy();
  });

  it("renders building markers", () => {
    const { UNSAFE_queryAllByType } = render(<OutdoorMap {...baseProps} />);
    const markers = UNSAFE_queryAllByType(require("react-native-maps").Marker);
    expect(markers.length).toBeGreaterThan(0);
  });

  it("renders PolygonRender with setBuildingLocation prop", () => {
    const PolygonRender = require("../app/components/maps/PolygonRender");
    render(<OutdoorMap {...baseProps} />);
    expect(PolygonRender).toHaveBeenCalledWith(
      expect.objectContaining({
        setBuildingLocation: baseProps.setBuildingLocation,
      }),
      {}
    );
  });

  it("renders MapViewDirections when origin and destination are present", () => {
    const MapViewDirections = require("react-native-maps-directions");
    render(
      <OutdoorMap
        {...baseProps}
        origin={{ latitude: 45.5, longitude: -73.6 }}
        destination={{ latitude: 45.6, longitude: -73.7 }}
      />
    );
    expect(MapViewDirections).toHaveBeenCalledWith(
      expect.objectContaining({
        origin: { latitude: 45.5, longitude: -73.6 },
        destination: { latitude: 45.6, longitude: -73.7 },
        apikey: "fake-api-key",
        mode: "WALKING",
        strokeWidth: 7,
        strokeColor: "blue",
        onReady: expect.any(Function),
      }),
      {}
    );
  });
});
