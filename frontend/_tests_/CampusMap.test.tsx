import React from 'react';
import { render } from '@testing-library/react-native';
import CampusMap from '../app/screens/CampusMap';

// Mock the useTheme hook to always return light theme
jest.mock('../app/hooks/useTheme', () => ({
  __esModule: true,
  default: jest.fn(() => ({
    theme: 'light',
    toggleTheme: jest.fn(),
  })),
}));

// Mock getStyles to return dummy styles
jest.mock('../app/styles', () => ({
  getStyles: (theme: string) => ({
    container: { flex: 1, backgroundColor: theme === 'light' ? '#fff' : '#000' },
    mapContainer: { flex: 1 },
  }),
}));

// Mock child components so we isolate CampusMap rendering
jest.mock('../app/components/ui/CampusPilotHeader', () => () => <></>);
jest.mock('../app/components/ui/CampusToggle', () => ({
  CampusToggle: ({ campus, toggleCampus }: any) => <></>,
}));
jest.mock('../app/components/maps/OutdoorMap', () => () => <></>);

describe('CampusMap Screen', () => {
  it('renders correctly', () => {
    const { toJSON } = render(<CampusMap />);
    expect(toJSON()).toMatchSnapshot();
  });
});
