import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { CampusToggle } from '../app/components/ui/CampusToggle';

describe('CampusToggle Component', () => {
  it('renders both campus buttons', () => {
    const mockToggle = jest.fn();
    const { getByText } = render(<CampusToggle campus="SGW" toggleCampus={mockToggle} />);

    expect(getByText('SGW')).toBeTruthy();
    expect(getByText('Loyola')).toBeTruthy();
  });

  it('SGW button is active when campus="SGW"', () => {
    const mockToggle = jest.fn();
    const { getByText } = render(<CampusToggle campus="SGW" toggleCampus={mockToggle} />);
    
    const sgwButton = getByText('SGW');
    expect(sgwButton).toBeTruthy();
  });

  it('calls toggleCampus when Loyola button is pressed', () => {
    const mockToggle = jest.fn();
    const { getByText } = render(<CampusToggle campus="SGW" toggleCampus={mockToggle} />);

    const loyolaButton = getByText('Loyola');
    fireEvent.press(loyolaButton);
    expect(mockToggle).toHaveBeenCalledWith('LOY');
  });
});
