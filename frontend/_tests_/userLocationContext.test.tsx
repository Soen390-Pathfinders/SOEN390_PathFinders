import React from 'react';
import { renderHook, act } from '@testing-library/react-hooks';
import { LocationProvider, useLocation } from '../app/components/context/userLocationContext';

describe('userLocationContext', () => {
  it('provides default user location', () => {
    const wrapper = ({ children }) => <LocationProvider>{children}</LocationProvider>;

    const { result } = renderHook(() => useLocation(), { wrapper });

    expect(result.current.userLocation).toEqual({
      latitude: -73.57907171854552,
      longitude: 45.49749147752672,
    });
  });

  it('updates user location when updateUserLocation is called', () => {
    const wrapper = ({ children }) => <LocationProvider>{children}</LocationProvider>;

    const { result } = renderHook(() => useLocation(), { wrapper });

    act(() => {
      result.current.updateUserLocation(50, 60);
    });

    expect(result.current.userLocation).toEqual({
      latitude: 50,
      longitude: 60,
    });
  });

  it('throws error if used outside LocationProvider', () => {
    const { result } = renderHook(() => useLocation());
    expect(result.error).toEqual(Error('useLocation must be used within a LocationProvider'));
  });
});
