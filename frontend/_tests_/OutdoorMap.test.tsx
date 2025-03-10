// _tests_/OutdoorMap.test.js

import React from 'react';
import { render } from '@testing-library/react-native';
import OutdoorMap from '../app/components/maps/OutdoorMap';
import { useLocation } from '../app/components/context/userLocationContext';
import { concordiaBuildings } from '../app/components/maps/concordiaBuildings';
import PolygonRender from '../app/components/maps/PolygonRender';

// Mock
jest.mock('react-native-maps', () => {
  const { View } = require('react-native');
  const MockMapView = (props) => <View {...props} />;
  const MockMarker = (props) => <View {...props} />;
  const MockPolygon = (props) => <View {...props} />;
  return {
    __esModule: true,
    default: MockMapView,
    Marker: MockMarker,
    Polygon: MockPolygon,
    PROVIDER_DEFAULT: 'default',
    PROVIDER_GOOGLE: 'google',
  };
});

jest.mock('react-native-maps-directions', () => {
  const { View } = require('react-native');
  return (props) => <View {...props} />;
});

jest.mock('../app/components/context/userLocationContext', () => ({
  useLocation: jest.fn(),
}));

jest.mock('../app/components/maps/PolygonRender', () => {
  const { View } = require('react-native');
  return (props) => <View {...props} />;
});

describe('OutdoorMap Component', () => {
  const mockUserLocation = {
    latitude: 45.49745011600138,
    longitude: -73.57894297258392,
  };

  beforeEach(() => {
    // Cast useLocation to jest.Mock to resolve TypeScript error
    (useLocation as jest.Mock).mockReturnValue({ userLocation: mockUserLocation });
  });

  it('renders without crashing', () => {
    const { getByTestId } = render(
      <OutdoorMap
        origin={null}
        destination={null}
        travelMode="DRIVING"
        onDurationChange={jest.fn()}
        campus="SGW"
        setBuildingLocation={jest.fn()}
      />
    );
    expect(getByTestId('outdoor-map')).toBeTruthy();
  });

  it('renders the correct initial region for SGW campus', () => {
    const { getByTestId } = render(
      <OutdoorMap
        origin={null}
        destination={null}
        travelMode="DRIVING"
        onDurationChange={jest.fn()}
        campus="SGW"
        setBuildingLocation={jest.fn()}
      />
    );
    const mapView = getByTestId('outdoor-map');
    expect(mapView.props.region.latitude).toBe(45.49745011600138);
    expect(mapView.props.region.longitude).toBe(-73.57894297258392);
  });

  it('renders the correct initial region for LOY campus', () => {
    const { getByTestId } = render(
      <OutdoorMap
        origin={null}
        destination={null}
        travelMode="DRIVING"
        onDurationChange={jest.fn()}
        campus="LOY"
        setBuildingLocation={jest.fn()}
      />
    );
    const mapView = getByTestId('outdoor-map');
    expect(mapView.props.region.latitude).toBe(45.4582);
    expect(mapView.props.region.longitude).toBe(-73.6405);
  });

  it('renders markers for Concordia buildings', () => {
    const { getAllByTestId } = render(
      <OutdoorMap
        origin={null}
        destination={null}
        travelMode="DRIVING"
        onDurationChange={jest.fn()}
        campus="SGW"
        setBuildingLocation={jest.fn()}
      />
    );
    const markers = getAllByTestId('marker');
    expect(markers.length).toBe(concordiaBuildings.length);
  });

  it('renders PolygonRender component', () => {
    const { getByTestId } = render(
      <OutdoorMap
        origin={null}
        destination={null}
        travelMode="DRIVING"
        onDurationChange={jest.fn()}
        campus="SGW"
        setBuildingLocation={jest.fn()}
      />
    );
    expect(getByTestId('polygon-render')).toBeTruthy();
  });

  it('renders MapViewDirections when origin and destination are provided', () => {
    const origin = { latitude: 45.49745011600138, longitude: -73.57894297258392 };
    const destination = { latitude: 45.4582, longitude: -73.6405 };
    const { getByTestId } = render(
      <OutdoorMap
        origin={origin}
        destination={destination}
        travelMode="DRIVING"
        onDurationChange={jest.fn()}
        campus="SGW"
        setBuildingLocation={jest.fn()}
      />
    );
    expect(getByTestId('map-view-directions')).toBeTruthy();
  });

  it('does not render MapViewDirections when origin or destination is missing', () => {
    const { queryByTestId } = render(
      <OutdoorMap
        origin={null}
        destination={null}
        travelMode="DRIVING"
        onDurationChange={jest.fn()}
        campus="SGW"
        setBuildingLocation={jest.fn()}
      />
    );
    expect(queryByTestId('map-view-directions')).toBeNull();
  });
});