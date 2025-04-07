import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import RadiusSlider from '../app/components/ui/RadiusButton';
import { Text } from 'react-native';

jest.mock('@react-native-community/slider', () => {
  const { View } = require('react-native');
  return {
    __esModule: true,
    default: function MockSlider(props) {
      return (
        <View 
          testID="mock-slider"
          onValueChange={value => {
            if (props.onValueChange) {
              props.onValueChange(value);
            }
          }}
          value={props.value}
          minimumValue={props.minimumValue}
          maximumValue={props.maximumValue}
          step={props.step}
        />
      );
    }
  };
});

describe('RadiusSlider', () => {
  it('renders without crashing', () => {
    const { root } = render(<RadiusSlider onRadiusChange={() => {}} />);
    expect(root).toBeTruthy();
  });

  it('initializes with default radius of 500', () => {
    const { getByText } = render(<RadiusSlider onRadiusChange={() => {}} />);
    

    expect(getByText('Search radius: 500m')).toBeTruthy();
  });

  it('calls onRadiusChange when slider value changes', () => {

    const mockOnRadiusChange = jest.fn();
    
    const { getByTestId } = render(
      <RadiusSlider onRadiusChange={mockOnRadiusChange} />
    );
    

    const slider = getByTestId('mock-slider');
    

    fireEvent(slider, 'valueChange', 800);
    
    expect(mockOnRadiusChange).toHaveBeenCalledWith(800);
  });

  it('updates display text when radius changes', () => {
    const { getByTestId, getByText } = render(
      <RadiusSlider onRadiusChange={() => {}} />
    );
    

    const slider = getByTestId('mock-slider');
    

    fireEvent(slider, 'valueChange', 700);
    

    expect(getByText('Search radius: 700m')).toBeTruthy();
  });

  it('rounds the radius value in the display text', () => {
    const { getByTestId, getByText } = render(
      <RadiusSlider onRadiusChange={() => {}} />
    );
    

    const slider = getByTestId('mock-slider');

    fireEvent(slider, 'valueChange', 650.75);
    

    expect(getByText('Search radius: 651m')).toBeTruthy();
  });

  it('has correct slider props', () => {
    const { UNSAFE_getByType } = render(
      <RadiusSlider onRadiusChange={() => {}} />
    );
    

    const slider = UNSAFE_getByType(
      require('@react-native-community/slider').default
    );
    

    expect(slider.props.minimumValue).toBe(200);
    expect(slider.props.maximumValue).toBe(1000);
    expect(slider.props.step).toBe(100);
    expect(slider.props.value).toBe(500);
    expect(slider.props.minimumTrackTintColor).toBe('#0072A8');
    expect(slider.props.maximumTrackTintColor).toBe('#0072A8');
    expect(slider.props.thumbTintColor).toBe('#0072A8');
  });

  it('handles min and max boundary values', () => {
    const mockOnRadiusChange = jest.fn();
    const { getByTestId, getByText } = render(
      <RadiusSlider onRadiusChange={mockOnRadiusChange} />
    );
    
    const slider = getByTestId('mock-slider');
    
    fireEvent(slider, 'valueChange', 200);
    expect(getByText('Search radius: 200m')).toBeTruthy();
    expect(mockOnRadiusChange).toHaveBeenCalledWith(200);
    

    fireEvent(slider, 'valueChange', 1000);
    expect(getByText('Search radius: 1000m')).toBeTruthy();
    expect(mockOnRadiusChange).toHaveBeenCalledWith(1000);
  });
});