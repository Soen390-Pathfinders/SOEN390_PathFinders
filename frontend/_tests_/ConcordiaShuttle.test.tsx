/**
 * @jest-environment jsdom
 */

import React from 'react';
import { render } from '@testing-library/react-native';

// Create useTheme mock that works with both path variants
const useThemeMock = () => ({
  theme: 'light',
  toggleTheme: jest.fn()
});

// Mock both possible paths for useTheme
jest.mock('../app/hooks/useTheme', () => useThemeMock);
jest.mock('../app/hooks/useTheme.ts', () => useThemeMock);

jest.mock('../app/components/ui/CampusPilotHeader', () => ({
  __esModule: true,
  default: () => null
}));

jest.mock('../app/components/ui/ConcordiaShuttleTimes', () => ({
  __esModule: true,
  default: () => null
}));

// Mock react-native-maps
jest.mock('react-native-maps', () => {
  const React = require('react');
  
  const MockMapView = ({ children, ...props }) => {
    return React.createElement('MapView', props, children);
  };
  
  const MockMarker = ({ children, ...props }) => {
    return React.createElement('Marker', props, children);
  };
  
  return {
    __esModule: true,
    default: MockMapView,
    Marker: MockMarker,
    PROVIDER_DEFAULT: 'default',
    PROVIDER_GOOGLE: 'google',
  };
});

// Mock styles if needed
jest.mock('../app/styles', () => ({
  getStyles: () => ({
    container: {},
    mapContainer: {}
  })
}));

// Import the ACTUAL component after setting up all mocks
import ConcordiaShuttle from '../app/screens/ConcordiaShuttle';

describe('ConcordiaShuttle', () => {
  it('renders the component', () => {
    const { UNSAFE_getAllByType } = render(<ConcordiaShuttle />);
    const mapViews = UNSAFE_getAllByType('MapView');
    expect(mapViews.length).toBeGreaterThan(0);
  });

  it('renders map markers for both campuses', () => {
    const { UNSAFE_getAllByType } = render(<ConcordiaShuttle />);
    const markers = UNSAFE_getAllByType('Marker');
    expect(markers.length).toBe(2);
  });

  it('initializes MapView with correct props', () => {
    const { UNSAFE_getAllByProps } = render(<ConcordiaShuttle />);
    const mapViews = UNSAFE_getAllByProps({ 
      showsUserLocation: true,
      provider: 'default' 
    });
    expect(mapViews.length).toBeGreaterThan(0);
  });

  it('initializes MapView with correct initial region', () => {
    const { UNSAFE_getAllByType } = render(<ConcordiaShuttle />);
    const mapViews = UNSAFE_getAllByType('MapView');
    expect(mapViews.length).toBeGreaterThan(0);
    
    // Check individual properties instead of the whole object
    const mapView = mapViews[0];
    expect(mapView.props.initialRegion.latitude).toBe(45.477716);
    expect(mapView.props.initialRegion.longitude).toBe(-73.608841);
    expect(mapView.props.initialRegion.latitudeDelta).toBe(0.1);
    expect(mapView.props.initialRegion.longitudeDelta).toBe(0.1);
  });

  it('contains marker for Loyola campus with correct coordinates', () => {
    const { UNSAFE_getAllByType } = render(<ConcordiaShuttle />);
    const markers = UNSAFE_getAllByType('Marker');
    
    // Find Loyola marker by checking its title
    const loyolaMarker = markers.find(m => m.props.title === 'Loyola Campus');
    expect(loyolaMarker).toBeTruthy();
    expect(loyolaMarker.props.coordinate.latitude).toBe(45.45823278377158);
    expect(loyolaMarker.props.coordinate.longitude).toBe(-73.63915536118513);
  });

  it('contains marker for SGW campus with correct coordinates', () => {
    const { UNSAFE_getAllByType } = render(<ConcordiaShuttle />);
    const markers = UNSAFE_getAllByType('Marker');
    
    // Find SGW marker by checking its title
    const sgwMarker = markers.find(m => m.props.title === 'SGW Campus');
    expect(sgwMarker).toBeTruthy();
    expect(sgwMarker.props.coordinate.latitude).toBe(45.4972030019821);
    expect(sgwMarker.props.coordinate.longitude).toBe(-73.57852620369705);
  });
});