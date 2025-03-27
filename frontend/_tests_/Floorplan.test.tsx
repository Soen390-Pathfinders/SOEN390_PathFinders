// _tests_/Floorplan.test.tsx
import React from 'react';
import { render, fireEvent, act } from '@testing-library/react-native';
import Floorplan from '../app/components/ui/Floorplan';

// Mock Zoomable image lib safely
jest.mock('@likashefqet/react-native-image-zoom', () => {
  const React = require('react');
  return {
    Zoomable: React.forwardRef(({ children }, ref) => <>{children}</>),
  };
});

// Mock expo-image safely
jest.mock('expo-image', () => ({
  Image: () => <></>,
}));

// Safe pathTrace mock (no state during render)
jest.mock('../app/components/ui/pathTrace', () => {
  const React = require('react');
  const { useEffect } = React;
  return {
    __esModule: true,
    default: ({ onFloorChangeRequired, onInitialFloorDetected }) => {
      useEffect(() => {
        onInitialFloorDetected('H4');
        onFloorChangeRequired('H6');
      }, []);
      return null;
    },
  };
});

describe('Floorplan Component', () => {
  it('renders correctly', () => {
    const { toJSON } = render(<Floorplan />);
    expect(toJSON()).toBeTruthy();
  });

  it('renders floor buttons and changes floor', () => {
    const { getByText } = render(<Floorplan />);
    fireEvent.press(getByText('H1'));
    expect(getByText('H1')).toBeTruthy();
  });

  it('shows floor change banner and confirms floor switch', () => {
    const { getByText } = render(<Floorplan />);
    expect(getByText('Continue to floor H6?')).toBeTruthy();
    fireEvent.press(getByText('Yes'));
    expect(getByText('H6')).toBeTruthy();
  });

  it('dismisses floor change banner on cancel', async () => {
    const { getByText, queryByText } = render(<Floorplan />);
    await act(async () => {
      fireEvent.press(getByText('No'));
    });
    expect(queryByText('Continue to floor H6?')).toBeNull();
  });
});
