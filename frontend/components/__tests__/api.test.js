import React from 'react';
import { render, waitFor } from '@testing-library/react-native';
import axios from 'axios';
import {BuildingAPI, CampusAPI, FloorAPI, RoomAPI} from '../api';

jest.mock('axios');

test('BuildingAPI.getAll() returns all buildings', async () => {
    const data = { data: {message: "Success"}};
    axios.get.mockResolvedValue(data);

    const { getByText } = render(<BuildingAPI.getAll />);
    await waitFor(() => expect(getByText('Success')).toBeTruthy());

    expect(axios.get).toHaveBeenCalledTimes("/building/all");
});

test('CampusAPI.getAll() returns all campuses', async () => {
    const data = { data: {message: "Success"}};
    axios.get.mockResolvedValue(data);

    const { getByText } = render(<CampusAPI.getAll />);
    await waitFor(() => expect(getByText('Success')).toBeTruthy());

    expect(axios.get).toHaveBeenCalledTimes("/campus/all");
});

test('FloorAPI.getAll() returns all floors', async () => {
    const data = { data: {message: "Success"}};
    axios.get.mockResolvedValue(data);

    const { getByText } = render(<FloorAPI.getAll />);
    await waitFor(() => expect(getByText('Success')).toBeTruthy());

    expect(axios.get).toHaveBeenCalledTimes("/floor/all");
});

test('RoomAPI.getAll() returns all rooms', async () => {
    const data = { data: {message: "Success"}};
    axios.get.mockResolvedValue(data);

    const { getByText } = render(<RoomAPI.getAll />);
    await waitFor(() => expect(getByText('Success')).toBeTruthy());

    expect(axios.get).toHaveBeenCalledTimes("/room/all");
});