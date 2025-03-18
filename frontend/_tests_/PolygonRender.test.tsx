import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import PolygonRender from '../app/components/maps/PolygonRender';

// Mock outlines data
jest.mock('../app/components/maps/building_outlines', () => [
  {
    id: '1',
    campus: 'SGW',
    coordinates: [{ latitude: 0, longitude: 0 }, { latitude: 1, longitude: 1 }],
  },
  {
    id: '2',
    campus: 'LOY',
    coordinates: [{ latitude: 2, longitude: 2 }, { latitude: 3, longitude: 3 }],
  },
]);

// Mock geolib
jest.mock('geolib', () => ({
  isPointInPolygon: jest.fn(() => false),
  getCenter: jest.fn(() => ({ latitude: 0.5, longitude: 0.5 })),
}));

// Mock context
jest.mock('../app/components/context/userLocationContext', () => ({
  useLocation: () => ({
    userLocation: { latitude: 0, longitude: 0 },
  }),
}));

// Mock react-native-maps' Polygon
jest.mock('react-native-maps', () => {
  const { View } = require('react-native');
  return {
    Polygon: ({ onPress, testID }) => (
      <View testID={testID} onTouchEnd={onPress} />
    ),
  };
});

// Mock buildingAsDestination
jest.mock('../app/components/maps/BuildingAsDestination', () => jest.fn((cb) => cb(true)));

describe('PolygonRender Component', () => {
  it('renders polygons and handles tap', () => {
    const setBuildingLocationMock = jest.fn();

    const { getByTestId } = render(<PolygonRender setBuildingLocation={setBuildingLocationMock} />);

    // ✅ Verify polygon rendering
    const polygon1 = getByTestId('polygon-1');
    expect(polygon1).toBeTruthy();

    // ✅ Simulate tap on polygon
    fireEvent(polygon1, 'onTouchEnd');
    expect(setBuildingLocationMock).toHaveBeenCalledWith({
      latitude: 0.5,
      longitude: 0.5,
    });
  });
});
