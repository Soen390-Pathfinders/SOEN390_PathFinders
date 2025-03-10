// _tests_/PolygonRender.test.tsx
import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import PolygonRender from "../app/components/maps/PolygonRender";

jest.mock("react-native-maps", () => {
  const React = require("react");
  const { View } = require("react-native");
  const MockPolygon = (props: any) => (
    <View {...props} testID={props.testID ?? "mockPolygon"} />
  );
  return {
    __esModule: true,
    Polygon: MockPolygon,
  };
});

jest.mock("../app/components/maps/building_outlines", () => [
  {
    id: "b1",
    campus: "SGW",
    coordinates: [
      { latitude: 45.0, longitude: -73.0 },
      { latitude: 45.1, longitude: -73.0 },
      { latitude: 45.1, longitude: -73.1 },
    ],
  },
  {
    id: "b2",
    campus: "LOY",
    coordinates: [
      { latitude: 46.0, longitude: -74.0 },
      { latitude: 46.1, longitude: -74.0 },
      { latitude: 46.1, longitude: -74.1 },
    ],
  },
]);

jest.mock("geolib", () => {
  const actual = jest.requireActual("geolib");
  return {
    ...actual,
    isPointInPolygon: jest.fn(),
    getCenter: jest.fn(),
  };
});
import geolib from "geolib";

jest.mock("../app/components/maps/BuildingAsDestination", () =>
  jest.fn((callback: (res: boolean) => void) => callback(true))
);

jest.mock("../app/components/context/userLocationContext", () => ({
  useLocation: () => ({ userLocation: { latitude: 45.05, longitude: -73.05 } }),
}));

describe("PolygonRender", () => {
  const setBuildingLocationMock = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders a Polygon for each outline", () => {
    (geolib.isPointInPolygon as jest.Mock).mockReturnValue(false);
    const { getAllByTestId } = render(
      <PolygonRender setBuildingLocation={setBuildingLocationMock} />
    );

    const polygons = getAllByTestId(/polygon-/);
    expect(polygons.length).toBe(2);
  });

  it("computes correct fillColor for inside vs outside", () => {

    (geolib.isPointInPolygon as jest.Mock)
      .mockReturnValueOnce(true)
      .mockReturnValueOnce(false);

    const { getByTestId } = render(
      <PolygonRender setBuildingLocation={setBuildingLocationMock} />
    );
    const polygon1 = getByTestId("polygon-b1");
    const polygon2 = getByTestId("polygon-b2");

    expect(polygon1.props.fillColor).toBe("#rgba(80, 130, 18, 0.50)");
    expect(polygon2.props.fillColor).toBe("rgba(0, 0, 255, 0.57)");
  });

  it("calls setBuildingLocation with the center on press", () => {
    (geolib.isPointInPolygon as jest.Mock).mockReturnValue(false);
    (geolib.getCenter as jest.Mock).mockReturnValue({
      latitude: 45.1,
      longitude: -73.05,
    });

    const { getByTestId } = render(
      <PolygonRender setBuildingLocation={setBuildingLocationMock} />
    );
    fireEvent.press(getByTestId("polygon-b1"));
    expect(setBuildingLocationMock).toHaveBeenCalledWith({
      latitude: 45.1,
      longitude: -73.05,
    });
  });

  it("does not call setBuildingLocation if getCenter is null", () => {
    (geolib.isPointInPolygon as jest.Mock).mockReturnValue(false);
    (geolib.getCenter as jest.Mock).mockReturnValue(null);

    const { getByTestId } = render(
      <PolygonRender setBuildingLocation={setBuildingLocationMock} />
    );
    fireEvent.press(getByTestId("polygon-b1"));
    expect(setBuildingLocationMock).not.toHaveBeenCalled();
  });
});
