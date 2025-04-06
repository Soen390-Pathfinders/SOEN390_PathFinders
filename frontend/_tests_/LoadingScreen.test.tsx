import React from 'react';
import { render, act } from '@testing-library/react-native';
import LoadingScreen from '../app/screens/LoadingScreen';


jest.mock('react-native-reanimated', () =>
  require('react-native-reanimated/mock')
);


jest.mock('expo-linear-gradient', () => {
  const { View } = require('react-native');
  return {
    LinearGradient: View,
  };
});



describe('LoadingScreen', () => {
  jest.useFakeTimers(); // Control time manually

  it('renders all text components', () => {
    const onFinish = jest.fn();
    const { getByText } = render(<LoadingScreen onFinish={onFinish} />);

    expect(getByText("Campus Pilot")).toBeTruthy();
    expect(getByText("Concordia's Campus Guide")).toBeTruthy();
    expect(
      getByText("© 2025 Concordia University\nAll Rights Reserved")
    ).toBeTruthy();
  });

  it('calls onFinish after 4 seconds', () => {
    const onFinish = jest.fn();
    render(<LoadingScreen onFinish={onFinish} />);

    // Fast-forward time
    act(() => {
      jest.advanceTimersByTime(4000);
    });

    expect(onFinish).toHaveBeenCalled();
  });
});