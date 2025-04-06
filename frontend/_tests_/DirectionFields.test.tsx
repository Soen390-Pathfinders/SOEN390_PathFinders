/**
 * @jest-environment jsdom
 */

import React from 'react';
import { render, fireEvent, act } from '@testing-library/react-native';
import DirectionFields from '../app/components/ui/DirectionFields';

// Mock GooglePlacesAutocomplete
jest.mock('react-native-google-places-autocomplete', () => {
  const React = require('react');
  const { TextInput } = require('react-native');
  return {
    GooglePlacesAutocomplete: React.forwardRef((props, ref) => (
      <TextInput
        ref={ref}
        testID={props.placeholder}
        onChangeText={(text) => props.onPress?.({ description: text }, {
          geometry: {
            location: { lat: 1.23, lng: 4.56 },
          },
        })}
      />
    )),
  };
});

// Mock useLocation
jest.mock('../app/components/context/userLocationContext', () => ({
  useLocation: () => ({
    userLocation: { latitude: 45.5, longitude: -73.5 },
  }),
}));

// Mock Icons
jest.mock('@expo/vector-icons', () => ({
  MaterialIcons: 'MaterialIcons',
  Ionicons: 'Ionicons',
  FontAwesome5: 'FontAwesome5',
}));

jest.mock('expo-font', () => ({
  loadAsync: jest.fn(),
}));

describe('DirectionFields Component', () => {
  const defaultProps = {
    startLocation: '',
    setStartLocation: jest.fn(),
    destination: '',
    setDestination: jest.fn(),
    onGoPress: jest.fn(),
    startLocationRef: { current: { setAddressText: jest.fn() } },
    destinationRef: { current: { setAddressText: jest.fn() } },
    travelMode: 'WALKING',
    setTravelMode: jest.fn(),
    setToCurrentLocation: jest.fn(),
    duration: 15,
    setToBuildingLocation: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders input fields', () => {
    const { getByTestId } = render(<DirectionFields {...defaultProps} />);
    expect(getByTestId('Start Location')).toBeTruthy();
    expect(getByTestId('Select Destination')).toBeTruthy();
  });

  it('calls onGoPress when GO is pressed', async () => {
    const { getByTestId } = render(<DirectionFields {...defaultProps} />);
    await act(() => fireEvent.press(getByTestId('GoButton')));
    expect(defaultProps.onGoPress).toHaveBeenCalled();
  });
  
  it('calls setToCurrentLocation when current location icon pressed', () => {
    const { getByTestId } = render(<DirectionFields {...defaultProps} />);
    fireEvent.press(getByTestId('CurrentLocationButton'));
    expect(defaultProps.setToCurrentLocation).toHaveBeenCalledWith('start');
  });
  
  it('sets walking mode when walking button pressed', () => {
    const { getByTestId } = render(<DirectionFields {...defaultProps} />);
    fireEvent.press(getByTestId('WalkButton'));
    expect(defaultProps.setTravelMode).toHaveBeenCalledWith('WALKING');
  });
  
  it('sets driving mode when driving button pressed', () => {
    const { getByTestId } = render(
      <DirectionFields {...defaultProps} travelMode="DRIVING" />
    );
    fireEvent.press(getByTestId('DriveButton'));
    expect(defaultProps.setTravelMode).toHaveBeenCalledWith('DRIVING');
  });
  
  it('sets transit mode when transit button pressed', () => {
    const { getByTestId } = render(
      <DirectionFields {...defaultProps} travelMode="TRANSIT" />
    );
    fireEvent.press(getByTestId('TransitButton'));
    expect(defaultProps.setTravelMode).toHaveBeenCalledWith('TRANSIT');
    });
  
  });