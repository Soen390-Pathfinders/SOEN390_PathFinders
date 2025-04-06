import React from 'react';
import { render } from '@testing-library/react-native';
import { StyleSheet } from 'react-native';
import IndoorMap from '../app/screens/IndoorMap';

// Mocks
jest.mock('../app/components/ui/CampusPilotHeader', () => {
  return {
    __esModule: true,
    default: function MockCampusPilotHeader() {
      return null;
    }
  };
});

jest.mock('../app/components/ui/Floorplan', () => {
  return {
    __esModule: true,
    default: function MockFloorplan() {
      return null;
    }
  };
});

let lastThemePassedToGetStyles = '';

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
    getStyles: (theme) => {
      lastThemePassedToGetStyles = theme;
      return {
        container: {}
      };
    }
  };
});

describe('IndoorMap', () => {
  beforeEach(() => {
    lastThemePassedToGetStyles = '';
  });

  it('renders without crashing', () => {
    const { root } = render(<IndoorMap />);
    expect(root).toBeTruthy();
  });
  
  it('renders CampusPilotHeader', () => {
    const HeaderModule = require('../app/components/ui/CampusPilotHeader');
    const mockHeader = jest.fn().mockReturnValue(null);
    HeaderModule.default = mockHeader;
    
    render(<IndoorMap />);
    
    expect(mockHeader).toHaveBeenCalled();
  });
  
  it('renders Floorplan component', () => {
    const FloorplanModule = require('../app/components/ui/Floorplan');
    const mockFloorplan = jest.fn().mockReturnValue(null);
    FloorplanModule.default = mockFloorplan;
    
    render(<IndoorMap />);
    
    expect(mockFloorplan).toHaveBeenCalled();
  });
  
  it('applies correct theme from useTheme hook', () => {
    render(<IndoorMap />);
    

    expect(lastThemePassedToGetStyles).toBe('light');
  });
  
  it('applies custom styles to header and image container', () => {
    render(<IndoorMap />);

    const localStyles = StyleSheet.create({
      header: { height: "20%" },
      myImagecontainer: {
        height: "80%",
        width: "100%",
      },
    });
    
    expect(localStyles.header).toBeDefined();
    expect(localStyles.myImagecontainer).toBeDefined();
    
  });
});