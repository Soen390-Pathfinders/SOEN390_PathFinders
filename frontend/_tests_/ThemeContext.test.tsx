import React from 'react';
import { render, act } from '@testing-library/react-native';
import { ThemeProvider } from '../app/components/context/ThemeContext';
import ThemeContext from '../app/components/context/ThemeContext';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Mock AsyncStorage
jest.mock('@react-native-async-storage/async-storage', () => ({
  getItem: jest.fn(() => Promise.resolve(null)),
  setItem: jest.fn(() => Promise.resolve()),
}));

describe('ThemeContext', () => {
  it('provides default theme value', () => {
    let contextValue;
    render(
      <ThemeProvider>
        <ThemeContext.Consumer>
          {value => {
            contextValue = value;
            return null;
          }}
        </ThemeContext.Consumer>
      </ThemeProvider>
    );

    expect(contextValue.theme).toBe('light');
    expect(typeof contextValue.toggleTheme).toBe('function');
  });

  it('toggles theme and saves to AsyncStorage', async () => {
    let contextValue;
    render(
      <ThemeProvider>
        <ThemeContext.Consumer>
          {value => {
            contextValue = value;
            return null;
          }}
        </ThemeContext.Consumer>
      </ThemeProvider>
    );

    await act(async () => {
      contextValue.toggleTheme('dark');
    });

    expect(contextValue.theme).toBe('dark');
    expect(AsyncStorage.setItem).toHaveBeenCalledWith('theme', 'dark');
  });

  it('loads saved theme from AsyncStorage', async () => {
    AsyncStorage.getItem.mockResolvedValueOnce('dark');
  
    let contextValue;
    const { findByText } = render(
      <ThemeProvider>
        <ThemeContext.Consumer>
          {value => {
            contextValue = value;
            return null;
          }}
        </ThemeContext.Consumer>
      </ThemeProvider>
    );
  
    // Wait for effect to finish
    await act(async () => {
      await Promise.resolve();
    });
  
    expect(AsyncStorage.getItem).toHaveBeenCalledWith('theme');
    expect(contextValue.theme).toBe('dark');
  });
  
});
