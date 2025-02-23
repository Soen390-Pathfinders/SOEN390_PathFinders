import React from 'react';
import { render, waitFor } from '@testing-library/react-native';
import axios from 'axios';
import {BuildingAPI} from '../api';

jest.mock('axios');

test('BuildingAPI.getAll() returns all buildings', async () => {
    const data = { data: {message: "Success"}};
    axios.get.mockResolvedValue(data);

    const { getByText } = render(<BuildingAPI.getAll />);
    await waitFor(() => expect(getByText('Success')).toBeTruthy());

    expect(axios.get).toHaveBeenCalledTimes("/building/all");
});