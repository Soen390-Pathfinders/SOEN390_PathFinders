import React from 'react';
import { render } from '@testing-library/react-native';
import SearchBar from '../app/components/ui/searchBar';

// Mock useTheme hook
jest.mock('../app/hooks/useTheme', () => ({
  __esModule: true,
  default: jest.fn(() => ({ theme: 'light' })),
}));

describe('SearchBar Component', () => {
  it('renders correctly with placeholder', () => {
    const { getByPlaceholderText } = render(<SearchBar />);
    expect(getByPlaceholderText('Search')).toBeTruthy();
  });
});
