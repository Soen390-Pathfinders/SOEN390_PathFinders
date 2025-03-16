import { render } from '@testing-library/react-native';
import Floorplan from '../app/components/ui/Floorplan';

// Fix: require React inside mock factory
jest.mock('@likashefqet/react-native-image-zoom', () => {
  const React = require('react');
  return {
    Zoomable: React.forwardRef(({ children }, ref) => <>{children}</>),
  };
});

// Mock expo-image
jest.mock('expo-image', () => ({
  Image: (props) => <></>,
}));

// Mock pathTrace
jest.mock('../app/components/ui/pathTrace', () => () => <></>);

describe('Floorplan Component', () => {
  it('renders correctly without crashing', () => {
    const { toJSON } = render(<Floorplan />);
    expect(toJSON()).toBeTruthy(); // Basic render check
  });
});
