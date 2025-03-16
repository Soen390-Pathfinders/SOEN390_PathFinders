import React from 'react';
import { render } from '@testing-library/react-native';
import LoginScreem from '../app/screens/loginScreem'; // Adjust the path accordingly

describe('LoginScreem', () => {
  it('renders correctly', () => {
    const { getByText } = render(<LoginScreem />); // Render the component

    // Check if the text "loginScreem" is rendered
    expect(getByText('loginScreem')).toBeTruthy();
  });
});
