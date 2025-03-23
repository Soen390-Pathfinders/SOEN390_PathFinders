import React from 'react';
import { render } from '@testing-library/react-native';
import OutdoorMap from '../app/components/maps/OutdoorMap';
import { useLocation } from '../app/components/context/userLocationContext';
import MapViewDirections from 'react-native-maps-directions';
import MapView, { Marker, Polygon } from 'react-native-maps';
import PolygonRender from '../app/components/maps/PolygonRender';
import * as geolib from 'geolib';

jest.mock('geolib', () => ({
  isPointInPolygon: jest.fn().mockReturnValue(false),
  getCenter: jest.fn().mockReturnValue({ latitude: 45.497, longitude: -73.578 }),
}));

jest.mock('react-native-maps', () => {
  const React = require('react');
  const MockMapView = (props: any) => {
    return React.createElement('MapView', props, props.children);
  };
  
  const MockMarker = (props: any) => {
    return React.createElement('Marker', props, props.children);
  };
  
  const MockPolygon = (props: any) => {
    return React.createElement('Polygon', props, props.children);
  };
  
  MockMapView.Marker = MockMarker;
  MockMapView.Polygon = MockPolygon;
  
  return {
    __esModule: true,
    default: MockMapView,
    Marker: MockMarker,
    Polygon: MockPolygon,
    PROVIDER_DEFAULT: 'default',
    PROVIDER_GOOGLE: 'google',
  };
});

const MockMapView = jest.requireMock('react-native-maps').default;
const MockMarker = jest.requireMock('react-native-maps').Marker;
const MockPolygon = jest.requireMock('react-native-maps').Polygon;

jest.mock('react-native-maps-directions', () => {
  const React = require('react');
  const MockMapViewDirections = (props: any) => {
    return React.createElement('MapViewDirections', props, null);
  };
  return {
    __esModule: true,
    default: MockMapViewDirections,
  };
});

const MockMapViewDirections = jest.requireMock('react-native-maps-directions').default;

jest.mock('../app/components/context/userLocationContext', () => ({
  useLocation: jest.fn(),
}));

jest.mock('../app/components/maps/building_outlines', () => {
  return [
    {
      id: '1',
      coordinates: [
        { latitude: 45.497, longitude: -73.578 },
        { latitude: 45.498, longitude: -73.578 },
        { latitude: 45.498, longitude: -73.577 },
        { latitude: 45.497, longitude: -73.577 },
      ],
      campus: 'SGW',
    },
    {
      id: '2',
      coordinates: [
        { latitude: 45.458, longitude: -73.640 },
        { latitude: 45.459, longitude: -73.640 },
        { latitude: 45.459, longitude: -73.639 },
        { latitude: 45.458, longitude: -73.639 },
      ],
      campus: 'LOY',
    },
  ];
});

jest.mock('../app/components/maps/PolygonRender', () => {
  const React = require('react');
  const MockPolygonRender = (props: any) => {
    return React.createElement('PolygonRender', props, null);
  };
  return {
    __esModule: true,
    default: MockPolygonRender,
  };
});

const MockPolygonRender = jest.requireMock('../app/components/maps/PolygonRender').default;

jest.mock('../app/components/maps/BuildingAsDestination', () => {
  return {
    __esModule: true,
    default: jest.fn().mockImplementation((callback) => {
      callback(true);
    }),
  };
});


jest.mock('../app/components/maps/concordiaBuildings', () => ({
  concordiaBuildings: [
    {
      id: '1',
      title: 'Hall Building',
      description: 'Main building',
      latitude: 45.497,
      longitude: -73.578,
    },
    {
      id: '2',
      title: 'Library Building',
      description: 'Library',
      latitude: 45.496,
      longitude: -73.577,
    },
  ],
}));


jest.mock('../app/constants', () => ({
  GOOGLE_MAPS_APIKEY: 'test-api-key',
}));

describe('OutdoorMap Component', () => {
  const mockOnDurationChange = jest.fn();
  const mockSetBuildingLocation = jest.fn();
  
  beforeEach(() => {

    (useLocation as jest.Mock).mockImplementation(() => ({
      userLocation: {
        latitude: 45.497,
        longitude: -73.578,
      }
    }));
    

    jest.clearAllMocks();
  });
  
  test('renders correctly with SGW campus', () => {
    const { UNSAFE_getAllByType } = render(
      <OutdoorMap 
        campus="SGW" 
        origin={null}
        destination={null}
        travelMode="WALKING"
        onDurationChange={mockOnDurationChange}
        setBuildingLocation={mockSetBuildingLocation}
      />
    );
    

    expect(UNSAFE_getAllByType(MockMapView)).toHaveLength(1);
    

    expect(UNSAFE_getAllByType(MockPolygonRender)).toHaveLength(1);
    

    expect(UNSAFE_getAllByType(MockMarker)).toHaveLength(2);
  });
  
  test('renders correctly with LOY campus', () => {
    const { UNSAFE_getAllByType } = render(
      <OutdoorMap 
        campus="LOY" 
        origin={null}
        destination={null}
        travelMode="WALKING"
        onDurationChange={mockOnDurationChange}
        setBuildingLocation={mockSetBuildingLocation}
      />
    );
    

    const mapViews = UNSAFE_getAllByType(MockMapView);
    expect(mapViews).toHaveLength(1);
    

    const mapView = mapViews[0];
    expect(mapView.props.initialRegion).toEqual({
      latitude: 45.4582,
      longitude: -73.6405,
      latitudeDelta: 0.0322,
      longitudeDelta: 0.0221,
    });
  });
  
  test('renders directions when origin and destination are provided', () => {
    const origin = { latitude: 45.497, longitude: -73.578 };
    const destination = { latitude: 45.496, longitude: -73.577 };
    
    const { UNSAFE_getAllByType } = render(
      <OutdoorMap 
        campus="SGW" 
        origin={origin}
        destination={destination}
        travelMode="WALKING"
        onDurationChange={mockOnDurationChange}
        setBuildingLocation={mockSetBuildingLocation}
      />
    );
    

    expect(UNSAFE_getAllByType(MockMapViewDirections)).toHaveLength(1);
  });
  
  test('does not render directions when origin or destination is missing', () => {
    const { UNSAFE_queryAllByType } = render(
      <OutdoorMap 
        campus="SGW" 
        origin={null}
        destination={null}
        travelMode="WALKING"
        onDurationChange={mockOnDurationChange}
        setBuildingLocation={mockSetBuildingLocation}
      />
    );
    

    expect(UNSAFE_queryAllByType(MockMapViewDirections)).toHaveLength(0);
  });
  
  test('calls onDurationChange when directions are ready', () => {
    const origin = { latitude: 45.497, longitude: -73.578 };
    const destination = { latitude: 45.496, longitude: -73.577 };
    
    const { UNSAFE_getAllByType } = render(
      <OutdoorMap 
        campus="SGW" 
        origin={origin}
        destination={destination}
        travelMode="WALKING"
        onDurationChange={mockOnDurationChange}
        setBuildingLocation={mockSetBuildingLocation}
      />
    );
    
    const directions = UNSAFE_getAllByType(MockMapViewDirections)[0];
    

    directions.props.onReady({ distance: 1.5, duration: 10 });
    
    expect(mockOnDurationChange).toHaveBeenCalledWith(10);
  });
  
  test('passes the correct travel mode to directions', () => {
    const origin = { latitude: 45.497, longitude: -73.578 };
    const destination = { latitude: 45.496, longitude: -73.577 };
    
    const { UNSAFE_getAllByType } = render(
      <OutdoorMap 
        campus="SGW" 
        origin={origin}
        destination={destination}
        travelMode="DRIVING"
        onDurationChange={mockOnDurationChange}
        setBuildingLocation={mockSetBuildingLocation}
      />
    );
    
    const directions = UNSAFE_getAllByType(MockMapViewDirections)[0];
    expect(directions.props.mode).toBe("DRIVING");
  });
  
  test('passes setBuildingLocation to PolygonRender', () => {
    const { UNSAFE_getAllByType } = render(
      <OutdoorMap 
        campus="SGW" 
        origin={null}
        destination={null}
        travelMode="WALKING"
        onDurationChange={mockOnDurationChange}
        setBuildingLocation={mockSetBuildingLocation}
      />
    );
    
    const polygonRender = UNSAFE_getAllByType(MockPolygonRender)[0];
    expect(polygonRender.props.setBuildingLocation).toBe(mockSetBuildingLocation);
  });
});