import React from 'react';
import { render } from '@testing-library/react-native';
import CampusMap from '../app/screens/CampusMap';

// Mock the components and hooks used in CampusMap
jest.mock('../app/components/maps/OutdoorMap', () => {
  return {
    __esModule: true,
    default: function MockOutdoorMap(props) {
      return null; // Return null for now
    }
  };
});

jest.mock('../app/components/ui/CampusPilotHeader', () => {
  return {
    __esModule: true,
    default: function MockCampusPilotHeader() {
      return null; // Return null for now
    }
  };
});

jest.mock('../app/components/ui/CampusToggle', () => {
  return {
    CampusToggle: function MockCampusToggle(props) {
      return null; // Return null for now
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

jest.mock('../app/styles', () => {
  return {
    getStyles: () => ({
      container: {},
      mapContainer: {}
    })
  };
});

describe('CampusMap', () => {
  it('renders without crashing', () => {
    const { root } = render(<CampusMap />);
    expect(root).toBeTruthy();
  });
  
  it('initializes with SGW campus', () => {
    // Instead of mocking useState, let's check the initial props passed to OutdoorMap
    const OutdoorMapModule = require('../app/components/maps/OutdoorMap');
    const mockOutdoorMap = jest.fn().mockReturnValue(null);
    OutdoorMapModule.default = mockOutdoorMap;
    
    render(<CampusMap />);
    
    // The OutdoorMap should receive 'SGW' as the initial campus value
    expect(mockOutdoorMap).toHaveBeenCalledWith(
      expect.objectContaining({ campus: 'SGW' }),
      expect.anything()
    );
  });
  
  it('passes the campus state to OutdoorMap', () => {
    // Create a spy on the OutdoorMap component
    const OutdoorMapModule = require('../app/components/maps/OutdoorMap');
    const mockOutdoorMap = jest.fn().mockReturnValue(null);
    OutdoorMapModule.default = mockOutdoorMap;
    
    render(<CampusMap />);
    
    expect(mockOutdoorMap).toHaveBeenCalledWith(
      expect.objectContaining({ campus: 'SGW' }),
      expect.anything()
    );
  });
  
  it('passes toggleCampus function to CampusToggle', () => {
    // Create a spy on the CampusToggle component
    const ToggleModule = require('../app/components/ui/CampusToggle');
    const mockCampusToggle = jest.fn().mockReturnValue(null);
    ToggleModule.CampusToggle = mockCampusToggle;
    
    render(<CampusMap />);
    
    expect(mockCampusToggle).toHaveBeenCalledWith(
      expect.objectContaining({ 
        campus: 'SGW',
        toggleCampus: expect.any(Function)
      }),
      expect.anything()
    );
  });
  
  it('renders CampusPilotHeader', () => {
    // Create a spy on the CampusPilotHeader component
    const HeaderModule = require('../app/components/ui/CampusPilotHeader');
    const mockHeader = jest.fn().mockReturnValue(null);
    HeaderModule.default = mockHeader;
    
    render(<CampusMap />);
    
    expect(mockHeader).toHaveBeenCalled();
  });
});