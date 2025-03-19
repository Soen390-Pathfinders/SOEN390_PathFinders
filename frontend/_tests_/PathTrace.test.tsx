import React from 'react';
import { render, waitFor } from '@testing-library/react-native';
import PathTrace from '../app/components/ui/pathTrace';

// Mock JSON data
jest.mock('../app/data/pathNodes.json', () => []);

jest.mock('../api/api', () => ({
  PathAPI: {
    shortestPathToRoom: jest.fn(() =>
      Promise.resolve({
        path: [
          { id: 1, floor: '5', description: null, is_accessible: true, amenity_names: [], x_coor: 10, y_coor: 10 },
          { id: 2, floor: '5', description: null, is_accessible: true, amenity_names: [], x_coor: 20, y_coor: 20 },
        ],
      })
    ),
  },
}));

jest.mock('../app/hooks/lineFactory', () => () => <></>);

describe('PathTrace Component', () => {
  it('renders without crashing', async () => {
    render(<PathTrace />);
    await waitFor(() => {});
  });
});
