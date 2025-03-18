import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import CustomDrawerContent from '../app/drawer/CustomDrawerContent';

// Mock Drawer Components
jest.mock('@react-navigation/drawer', () => ({
  DrawerContentScrollView: ({ children }: any) => <>{children}</>,
  DrawerItemList: () => <></>,
}));

jest.mock('@expo/vector-icons/Fontisto', () => 'Fontisto');
jest.mock('../app/components/ui/AppLogo', () => () => <></>);

describe('CustomDrawerContent', () => {
  const mockDispatch = jest.fn();
  const testNavigation = { dispatch: mockDispatch };

  it('renders correctly', () => {
    const { getByText } = render(
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
    const { getByRole } = render(
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
