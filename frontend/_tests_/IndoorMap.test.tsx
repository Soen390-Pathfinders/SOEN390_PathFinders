import React from 'react';
import { render } from '@testing-library/react-native';
import IndoorMap from '../app/screens/IndoorMap';

jest.mock('../app/components/ui/CampusPilotHeader', () => () => null);


jest.mock('../app/components/ui/Floorplan', () => {
  const { Text } = require('react-native');
  return () => <Text>Floorplan</Text>;
});

jest.mock('../app/components/ui/FloorplanRoom', () => {
  const { Text } = require('react-native');
  return ({ nodeInfo }) => <Text>FloorplanRoom - {nodeInfo?.code}</Text>;
});

jest.mock('../app/hooks/useTheme', () => () => ({ theme: 'light' }));

jest.mock('../app/styles', () => ({
  getStyles: () => ({
    container: { flex: 1 },
  }),
}));

describe('IndoorMap', () => {
  it('renders FloorplanRoom when roomOrPath is "room"', () => {
    const route = {
      params: {
        roomOrPath: 'room',
        nodeInfo: { code: 'H123' },
      },
    };

    const { getByText } = render(<IndoorMap route={route} />);
    expect(getByText(/FloorplanRoom/)).toBeTruthy();
    expect(getByText(/H123/)).toBeTruthy();
  });

  it('renders Floorplan when roomOrPath is not "room"', () => {
    const route = {
      params: {
        roomOrPath: 'path',
      },
    };

    const { getByText } = render(<IndoorMap route={route} />);
    expect(getByText('Floorplan')).toBeTruthy();
  });
});
