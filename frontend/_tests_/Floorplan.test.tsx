import React from 'react';
import { render } from '@testing-library/react-native';
import Floorplan from '../app/components/ui/Floorplan';
import { NavigationContainer } from '@react-navigation/native';

// Fix: require React inside mock factory
jest.mock('@likashefqet/react-native-image-zoom', () => {
  const React = require('react');
  return {
    Zoomable: React.forwardRef(({ children }, ref) => <>{children}</>),
  };
});

// Mock expo-image
jest.mock('expo-image', () => ({
  Image: (props) => <></>,
}));

// Mock pathTrace
jest.mock('../app/components/ui/pathTrace', () => () => <></>);

describe('Floorplan Component', () => {
  it('renders correctly without crashing', () => {
    const dummyPath = []; // Optional: adjust as needed for your component

    const { toJSON } = render(
      <NavigationContainer>
        <Floorplan path={dummyPath} />
      </NavigationContainer>
    );

    expect(toJSON()).toBeTruthy(); // Basic render check
  });
});
