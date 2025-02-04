import React from 'react';
import renderer from 'react-test-renderer';
import HomeScreen from '../app/screens/HomeScreen';
import outdoorMap from '../app/components/maps/outdoorMap.tsx'


test('renders correctly', () => {
  const tree = renderer.create(<HomeScreen />).toJSON();
  expect(tree).toMatchSnapshot();
});