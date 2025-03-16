import React from 'react';
import { render } from '@testing-library/react-native';
import Floorplan from '../app/components/ui/Floorplan';

// Mock child components & libraries
jest.mock('@likashefqet/react-native-image-zoom', () => ({
  Zoomable: ({ children }) => <>{children}</>,
}));

jest.mock('expo-image', () => ({
  Image: (props) => <></>, // Placeholder
}));

jest.mock('../app/components/ui/pathTrace', () => () => <></>);

describe('Floorplan Component', () => {
  it('renders correctly without crashing', () => {
    const { toJSON } = render(<Floorplan />);
    expect(toJSON()).toBeTruthy(); // Basic render check
  });
});
