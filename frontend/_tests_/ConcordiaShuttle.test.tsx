/**
 * @jest-environment jsdom
 */

import React from 'react';
import { render } from '@testing-library/react-native';
import { Marker, default as MapView } from 'react-native-maps'; // 



// Create useTheme mock that works with both path variants
const useThemeMock = () => ({
  theme: 'light',
  toggleTheme: jest.fn(),
});

// Mock both possible paths for useTheme
jest.mock('../app/hooks/useTheme', () => useThemeMock);
jest.mock('../app/hooks/useTheme.ts', () => useThemeMock);

// Mock CampusPilotHeader and ConcordiaShuttleTimes to avoid their side effects
jest.mock('../app/components/ui/CampusPilotHeader', () => ({
  __esModule: true,
  default: () => null,
}));

jest.mock('../app/components/ui/ConcordiaShuttleTimes', () => ({
  __esModule: true,
  default: () => null,
}));

// Mock react-native-maps
jest.mock('react-native-maps', () => {
  const React = require('react');
  const MockMapView = ({ children, ...props }) =>
    React.createElement('MapView', props, children);
  const MockMarker = ({ children, ...props }) =>
    React.createElement('Marker', props, children);

  return {
    __esModule: true,
    default: MockMapView,
    Marker: MockMarker,
    PROVIDER_DEFAULT: 'default',
    PROVIDER_GOOGLE: 'google',
  };
});

// Mock styles
jest.mock('../app/styles', () => ({
  getStyles: () => ({
    container: {},
    mapContainer: {},
  }),
}));

// Import after mocks
import ConcordiaShuttle from '../app/screens/ConcordiaShuttle';

describe('ConcordiaShuttle', () => {
  it('renders the component', () => {
    const { UNSAFE_getAllByType } = render(<ConcordiaShuttle />);
    const mapViews = UNSAFE_getAllByType(MapView);
    expect(mapViews.length).toBeGreaterThan(0);
  });

  it('renders map markers for both campuses', () => {
    const { UNSAFE_getAllByType } = render(<ConcordiaShuttle />);
    const markers = UNSAFE_getAllByType(Marker);
    expect(markers.length).toBe(2);
  });

  it('initializes MapView with correct props', () => {
    const { UNSAFE_getAllByProps } = render(<ConcordiaShuttle />);
    const mapViews = UNSAFE_getAllByProps({
      showsUserLocation: true,
      provider: 'default',
    });
    expect(mapViews.length).toBeGreaterThan(0);
  });

  it('initializes MapView with correct initial region', () => {
    const { UNSAFE_getAllByType } = render(<ConcordiaShuttle />);
    const mapViews = UNSAFE_getAllByType(MapView);
    const mapView = mapViews[0];
    const region = mapView.props.initialRegion;

    expect(region.latitude).toBe(45.477716);
    expect(region.longitude).toBe(-73.608841);
    expect(region.latitudeDelta).toBe(0.1);
    expect(region.longitudeDelta).toBe(0.1);
  });

  it('includes Loyola Campus marker', () => {
    const { UNSAFE_getAllByType } = render(<ConcordiaShuttle />);
    const marker = UNSAFE_getAllByType(Marker).find(
      (m) => m.props.title === 'Loyola Campus'
    );
    expect(marker).toBeTruthy();
    expect(marker.props.coordinate.latitude).toBe(45.45823278377158);
    expect(marker.props.coordinate.longitude).toBe(-73.63915536118513);
  });

  it('includes SGW Campus marker', () => {
    const { UNSAFE_getAllByType } = render(<ConcordiaShuttle />);
    const marker = UNSAFE_getAllByType(Marker).find(
      (m) => m.props.title === 'SGW Campus'
    );
    expect(marker).toBeTruthy();
    expect(marker.props.coordinate.latitude).toBe(45.4972030019821);
    expect(marker.props.coordinate.longitude).toBe(-73.57852620369705);
  });
});
