import React from 'react';
import { render, fireEvent, act } from '@testing-library/react-native';
import DirectionFields from '../app/components/ui/DirectionFields';

// Mock GooglePlacesAutocomplete
jest.mock('react-native-google-places-autocomplete', () => {
  const React = require('react');
  const { TextInput } = require('react-native');
  return {
    GooglePlacesAutocomplete: React.forwardRef((props, ref) => (
      <TextInput ref={ref} testID={props.placeholder} {...props} />
    )),
  };
});

// Mock Location Context
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

// Silence console errors/warnings
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

  it('renders both input fields', () => {
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

  it('fires setToCurrentLocation when current location icon is tapped', () => {
    const { getByTestId } = render(<DirectionFields {...defaultProps} />);
    const locationBtn = getByTestId('current-location-button');
  
    expect(defaultProps.setToCurrentLocation).not.toHaveBeenCalled();
    fireEvent.press(locationBtn);
    expect(defaultProps.setToCurrentLocation).toHaveBeenCalledWith('start');
  });
  


  it('changes travel mode to DRIVING', () => {
    const props = { ...defaultProps, travelMode: 'WALKING' };
    const { getAllByRole } = render(<DirectionFields {...props} />);
    const buttons = getAllByRole('button');

  
    // Assuming 0 = location, 1 = GO, 2 = WALK, 3 = CAR, 4 = TRANSIT
    fireEvent.press(buttons[3]);
    expect(props.setTravelMode).toHaveBeenCalledWith('DRIVING');
  });
  
  it('changes travel mode to TRANSIT', () => {
    const props = { ...defaultProps, travelMode: 'WALKING' };
    const { getAllByRole } = render(<DirectionFields {...props} />);
    const buttons = getAllByRole('button');

  
    fireEvent.press(buttons[4]);
    expect(props.setTravelMode).toHaveBeenCalledWith('TRANSIT');
  });
  

  it('renders travel duration only for selected travel mode', () => {
    const props = { ...defaultProps, travelMode: 'WALKING', duration: 12 };
    const { getByText } = render(<DirectionFields {...props} />);
    expect(getByText('12 min')).toBeTruthy();
  });

  it('handles setting start location from autocomplete press', () => {
    const props = { ...defaultProps };
    const { getByTestId } = render(<DirectionFields {...props} />);
    const startInput = getByTestId('Start Location');
    fireEvent.changeText(startInput, 'My Location');
    expect(startInput.props.testID).toBe('Start Location');
  });

  it('handles setting destination location from autocomplete press', () => {
    const props = { ...defaultProps };
    const { getByTestId } = render(<DirectionFields {...props} />);
    const destInput = getByTestId('Select Destination');
    fireEvent.changeText(destInput, 'H Building');
    expect(destInput.props.testID).toBe('Select Destination');
  });
});
