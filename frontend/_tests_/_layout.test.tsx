// _tests_/_layout.test.tsx

import React from 'react';
import { render } from '@testing-library/react-native';
import { Platform } from 'react-native';
import TabLayout from '../app/_layout';
import { Tabs } from 'expo-router';
import { useColorScheme } from '@/hooks/useColorScheme';
import { HapticTab } from '@/components/HapticTab';
import TabBarBackground from '@/components/ui/TabBarBackground';
import { Colors } from '@/constants/Colors';

// Mock the useColorScheme hook
jest.mock('@/hooks/useColorScheme', () => ({
  useColorScheme: jest.fn(),
}));

// Mock the HapticTab component
jest.mock('@/components/HapticTab', () => jest.fn((props) => props.children));

// Mock the IconSymbol component
jest.mock('@/components/ui/IconSymbol', () => ({
  IconSymbol: jest.fn(({ size, name, color }) => (
    <div data-testid="icon-symbol" style={{ color }}>{name}</div>
  )),
}));

// Mock the TabBarBackground component
jest.mock('@/components/ui/TabBarBackground', () =>
  jest.fn(() => <div data-testid="tab-bar-background" />)
);

describe('TabLayout Component', () => {
  beforeEach(() => {
    // Mock the useColorScheme hook to return 'light' by default
    (useColorScheme as jest.Mock).mockReturnValue('light');
  });

  it('renders the Tabs component with correct screenOptions', () => {
    const { getByTestId } = render(<TabLayout />);

    // Check if the Tabs component is rendered
    const tabsComponent = getByTestId('tabs');
    expect(tabsComponent).toBeTruthy();

    // Check if the screenOptions are applied correctly
    expect((Tabs as any).mock.calls[0][0].screenOptions).toEqual({
      tabBarActiveTintColor: Colors.light.tint,
      headerShown: false,
      tabBarButton: HapticTab,
      tabBarBackground: TabBarBackground,
      tabBarStyle: Platform.select({
        ios: {
          position: 'absolute',
        },
        default: {},
      }),
    });
  });

  it('renders the Home tab with correct options', () => {
    const { getByText, getByTestId } = render(<TabLayout />);

    // Check if the Home tab is rendered
    const homeTab = getByText('Home');
    expect(homeTab).toBeTruthy();

    // Check if the Home tab icon is rendered
    const homeIcon = getByTestId('icon-symbol');
    expect(homeIcon.props.children).toBe('house.fill');
  });

  it('renders the Explore tab with correct options', () => {
    const { getByText, getByTestId } = render(<TabLayout />);

    // Check if the Explore tab is rendered
    const exploreTab = getByText('Explore');
    expect(exploreTab).toBeTruthy();

    // Check if the Explore tab icon is rendered
    const exploreIcon = getByTestId('icon-symbol');
    expect(exploreIcon.props.children).toBe('paperplane.fill');
  });

  it('updates the tabBarActiveTintColor based on the color scheme', () => {
    // Mock the useColorScheme hook to return 'dark'
    (useColorScheme as jest.Mock).mockReturnValue('dark');

    const { getByTestId } = render(<TabLayout />);

    // Check if the tabBarActiveTintColor is updated for the dark theme
    expect((Tabs as any).mock.calls[0][0].screenOptions.tabBarActiveTintColor).toBe(Colors.dark.tint);
  });
});