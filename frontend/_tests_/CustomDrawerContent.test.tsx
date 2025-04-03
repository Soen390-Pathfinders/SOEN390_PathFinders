import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { NavigationContainer } from 'expo-router'; // Import NavigationContainer from expo-router
import CustomDrawerContent from '../app/drawer/CustomDrawerContent';

// Mock Drawer Components
jest.mock('@react-navigation/drawer', () => ({
  DrawerContentScrollView: ({ children }: any) => <>{children}</>,
  DrawerItemList: () => <></>,
}));

// Mock vector icon and AppLogo
jest.mock('@expo/vector-icons/Fontisto', () => 'Fontisto');
jest.mock('../app/components/ui/AppLogo', () => () => <></>);

describe('CustomDrawerContent', () => {
  const mockDispatch = jest.fn();
  const testNavigation = { dispatch: mockDispatch };

  const renderWithNavigation = (ui: React.ReactElement) =>
    render(
      <NavigationContainer>
        {ui}
      </NavigationContainer>
    );

  it('renders correctly', () => {
    const { getByText } = renderWithNavigation(
      <CustomDrawerContent
        testNavigation={testNavigation}
        state={{}}
        navigation={{}}
        descriptors={{}}
      />
    );
    expect(getByText('Campus Pilot')).toBeTruthy();
  });

  it('calls closeDrawer on button press', () => {
    const { getByRole } = renderWithNavigation(
      <CustomDrawerContent
        testNavigation={testNavigation}
        state={{}}
        navigation={{}}
        descriptors={{}}
      />
    );
    const button = getByRole('button');
    fireEvent.press(button);
    expect(mockDispatch).toHaveBeenCalled();
  });
});
