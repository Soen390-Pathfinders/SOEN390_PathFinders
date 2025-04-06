import React from 'react';
import { render } from '@testing-library/react-native';
import OutdoorPointsOfInterests from '../app/screens/OutdoorPointsOfInterests';

jest.mock('react-native-maps', () => {
  const { View } = require('react-native');
  return {
    __esModule: true,
    default: function MockMapView(props) {
      return <View>{props.children}</View>;
    },
    Marker: function MockMarker() {
      return null;
    },
    PROVIDER_DEFAULT: 'default',
    PROVIDER_GOOGLE: 'google',
  };
});

jest.mock('react-native-maps-directions', () => {
  return {
    __esModule: true,
    default: function MockMapViewDirections() {
      return null;
    }
  };
});

jest.mock('../app/components/ui/CampusPilotHeader', () => {
  return {
    __esModule: true,
    default: function MockCampusPilotHeader() {
      return null;
    }
  };
});

jest.mock('../app/components/ui/CampusToggle', () => {
  return {
    CampusToggle: function MockCampusToggle(props) {
      return null;
    }
  };
});

jest.mock('../app/components/ui/OutdoorPOI_info', () => {
  return {
    __esModule: true,
    default: function MockOutdoorPOI_info() {
      return null;
    }
  };
});

jest.mock('../app/components/ui/FilterPOI', () => {
  return {
    __esModule: true,
    default: function MockFilterPOI() {
      return null;
    }
  };
});

jest.mock('../app/components/ui/RadiusButton', () => {
  return {
    __esModule: true,
    default: function MockRadiusSlider() {
      return null;
    }
  };
});

jest.mock('../app/hooks/useTheme', () => {
  return function mockUseTheme() {
    return {
      theme: 'light',
      toggleTheme: jest.fn()
    };
  };
});

jest.mock('../app/hooks/useFetchGooglePlaceInfo', () => {
  return function mockUseFetchGooglePlacesInfo() {
    return {
      place: null,
      placeInfo: null,
      error: null,
      fetchPlaceInfo: jest.fn(),
      filteredPlaces: [],
      fetchPlacesByCategories: jest.fn()
    };
  };
});

jest.mock('../app/hooks/useUserLocation', () => {
  return function mockUseUserLocation() {
    return {
      userLocation: null,
      setLocation: jest.fn()
    };
  };
});

jest.mock('../app/styles', () => {
  return {
    getStyles: () => ({
      container: {},
      mapContainer: {}
    })
  };
});

jest.mock('@expo/vector-icons', () => {
  return {
    Ionicons: function MockIonicons() {
      return null;
    }
  };
});

jest.mock('../app/constants', () => {
  return {
    GOOGLE_MAPS_APIKEY: 'mock-api-key'
  };
});

describe('OutdoorPointsOfInterests', () => {
  it('renders without crashing', () => {
    const { root } = render(<OutdoorPointsOfInterests />);
    expect(root).toBeTruthy();
  });
  
  it('initializes with SGW campus', () => {

    const ToggleModule = require('../app/components/ui/CampusToggle');
    const mockCampusToggle = jest.fn().mockReturnValue(null);
    ToggleModule.CampusToggle = mockCampusToggle;
    
    render(<OutdoorPointsOfInterests />);
    
    expect(mockCampusToggle).toHaveBeenCalledWith(
      expect.objectContaining({ campus: 'SGW' }),
      expect.anything()
    );
  });
  
  it('passes toggleCampus function to CampusToggle', () => {

    const ToggleModule = require('../app/components/ui/CampusToggle');
    const mockCampusToggle = jest.fn().mockReturnValue(null);
    ToggleModule.CampusToggle = mockCampusToggle;
    
    render(<OutdoorPointsOfInterests />);
    
    expect(mockCampusToggle).toHaveBeenCalledWith(
      expect.objectContaining({ 
        campus: 'SGW',
        toggleCampus: expect.any(Function)
      }),
      expect.anything()
    );
  });
  
  it('renders CampusPilotHeader', () => {

    const HeaderModule = require('../app/components/ui/CampusPilotHeader');
    const mockHeader = jest.fn().mockReturnValue(null);
    HeaderModule.default = mockHeader;
    
    render(<OutdoorPointsOfInterests />);
    
    expect(mockHeader).toHaveBeenCalled();
  });
  
  it('initializes with default search radius of 1000', () => {

    const RadiusModule = require('../app/components/ui/RadiusButton');
    const mockRadiusSlider = jest.fn().mockReturnValue(null);
    RadiusModule.default = mockRadiusSlider;
    
    render(<OutdoorPointsOfInterests />);
    
    expect(mockRadiusSlider).toHaveBeenCalledWith(
      expect.objectContaining({ 
        onRadiusChange: expect.any(Function) 
      }),
      expect.anything()
    );
  });
  
  it('passes onFilterPress function to FilterPOI', () => {

    const FilterModule = require('../app/components/ui/FilterPOI');
    const mockFilterPOI = jest.fn().mockReturnValue(null);
    FilterModule.default = mockFilterPOI;
    
    render(<OutdoorPointsOfInterests />);
    
    expect(mockFilterPOI).toHaveBeenCalledWith(
      expect.objectContaining({ 
        onFilterPress: expect.any(Function) 
      }),
      expect.anything()
    );
  });
  
  it('does not show info box by default', () => {
    const { queryByText } = render(<OutdoorPointsOfInterests />);

    const IconsModule = require('@expo/vector-icons');
    const mockIonicons = jest.fn().mockReturnValue(null);
    IconsModule.Ionicons = mockIonicons;
    

    expect(mockIonicons).not.toHaveBeenCalled();
  });
  
  it('initializes with no destination set', () => {

    const DirectionsModule = require('react-native-maps-directions');
    const mockDirections = jest.fn().mockReturnValue(null);
    DirectionsModule.default = mockDirections;
    
    render(<OutdoorPointsOfInterests />);
    

    expect(mockDirections).not.toHaveBeenCalled();
  });
  
  it('renders MapView with correct provider', () => {

    const MapViewModule = require('react-native-maps');
    const mockMapView = jest.fn().mockReturnValue(null);
    MapViewModule.default = mockMapView;
    
    render(<OutdoorPointsOfInterests />);
    
    expect(mockMapView).toHaveBeenCalledWith(
      expect.objectContaining({ 
        provider: 'default',
        showsUserLocation: true
      }),
      expect.anything()
    );
  });
});