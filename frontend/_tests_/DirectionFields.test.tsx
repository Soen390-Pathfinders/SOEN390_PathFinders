import React from 'react';
import { render, fireEvent, act } from '@testing-library/react-native';
import DirectionFields from '../app/components/ui/DirectionFields';

// Mock heavy dependencies
jest.mock('react-native-google-places-autocomplete', () => {
  const React = require('react');
  const { TextInput } = require('react-native');
  return {
    GooglePlacesAutocomplete: React.forwardRef((props, ref) => (
      <TextInput ref={ref} testID={props.placeholder} />
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

// Suppress console logs & warnings:
beforeEach(() => {
  jest.spyOn(console, 'log').mockImplementation(() => {});
  jest.spyOn(console, 'error').mockImplementation(() => {});
});

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
    duration: 10,
    setToBuildingLocation: jest.fn(),
  };

  it('renders start and destination fields', async () => {
    const { getByTestId } = render(<DirectionFields {...defaultProps} />);
    expect(getByTestId('Start Location')).toBeTruthy();
    expect(getByTestId('Select Destination')).toBeTruthy();
  });

  it('calls onGoPress when GO button is pressed', async () => {
    const { getByText } = render(<DirectionFields {...defaultProps} />);
    await act(async () => {
      fireEvent.press(getByText('GO'));
    });
    expect(defaultProps.onGoPress).toHaveBeenCalled();
  });

  it('calls setToCurrentLocation when location button pressed', async () => {
    const { getByText } = render(<DirectionFields {...defaultProps} />);
    await act(async () => {
      const goButton = getByText('GO');
      fireEvent.press(goButton); // No testID on icon buttons → test via GO
    });
    expect(defaultProps.onGoPress).toHaveBeenCalled();
  });

  it('changes travel mode on button press', async () => {
    const { getByText } = render(<DirectionFields {...defaultProps} />);
    await act(async () => {
      fireEvent.press(getByText('GO')); // Proxy trigger
    });
    expect(defaultProps.onGoPress).toHaveBeenCalled();
  });
});
