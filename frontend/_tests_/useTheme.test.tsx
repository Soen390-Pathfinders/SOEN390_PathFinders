import React from 'react';
import { renderHook } from '@testing-library/react-hooks';
import useTheme from '../app/hooks/useTheme';
import ThemeContext from '../app/components/context/ThemeContext';

describe('useTheme hook', () => {
  it('returns context value when used inside ThemeProvider', () => {
    const wrapper = ({ children }) => (
      <ThemeContext.Provider value={{ theme: 'light', toggleTheme: jest.fn() }}>
        {children}
      </ThemeContext.Provider>
    );

    const { result } = renderHook(() => useTheme(), { wrapper });

    expect(result.current.theme).toBe('light');
    expect(typeof result.current.toggleTheme).toBe('function');
  });

  it('throws error when used outside ThemeProvider', () => {
    const { result } = renderHook(() => useTheme());
    expect(result.error).toEqual(Error('useTheme must be used within a ThemeProvider'));
  });
});
