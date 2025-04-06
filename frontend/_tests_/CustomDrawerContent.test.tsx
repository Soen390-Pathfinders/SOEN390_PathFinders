import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { NavigationContainer } from '@react-navigation/native';
import CustomDrawerContent from '../app/drawer/CustomDrawerContent';


jest.mock("@likashefqet/react-native-image-zoom", () => {
  const React = require("react");
  const { forwardRef, useImperativeHandle } = React;
  const { View, Text } = require("react-native");

  return {
    Zoomable: forwardRef((props, ref) => {
      useImperativeHandle(ref, () => ({
        zoom: jest.fn(),
      }));
      return (
        <View testID="zoomable-mock">
          <Text>Mocked Zoomable</Text>
          {props.children}
        </View>
      );
    }),
  };
});

// Mock drawer components
jest.mock('@react-navigation/drawer', () => ({
  DrawerContentScrollView: ({ children }: any) => <>{children}</>,
  DrawerItemList: () => <></>,
}));

//  Mock icon and AppLogo
jest.mock('@expo/vector-icons/Fontisto', () => 'Fontisto');
jest.mock('../app/components/ui/AppLogo', () => () => <></>);

describe('CustomDrawerContent', () => {
  const mockDispatch = jest.fn();
  const testNavigation = { dispatch: mockDispatch };

  const renderWithNavigation = () =>
    render(
      <NavigationContainer>
        <CustomDrawerContent
          testNavigation={testNavigation}
          state={{}}
          navigation={{}}
          descriptors={{}}
        />
      </NavigationContainer>
    );

  it('renders correctly', () => {
    const { getByText } = renderWithNavigation();
    expect(getByText('Campus Pilot')).toBeTruthy();
  });

  it('calls closeDrawer on button press', () => {
    const { getByRole } = renderWithNavigation();
    const button = getByRole('button');
    fireEvent.press(button);
    expect(mockDispatch).toHaveBeenCalledWith(
      expect.objectContaining({ type: 'CLOSE_DRAWER' })
    );
  });
});
