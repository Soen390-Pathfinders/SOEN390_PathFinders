import { BuildingAPI, CampusAPI, FloorAPI, RoomAPI, POIAPI } from '../../api/api.js';
import axios from 'axios';

jest.mock('axios');

//BuildingAPI
describe('BuildingAPI', () => {
  test('getAll() returns all buildings', async () => {
    const mockData = { data: { message: 'Success' } };
    axios.get.mockResolvedValue(mockData);

    const result = await BuildingAPI.getAll();

    expect(axios.get).toHaveBeenCalledWith('/building/all');
    expect(result).toEqual(mockData.data);
  });

  test('get() returns a building', async () => {
    const mockData = { data: { message: 'Success' } };
    axios.get.mockResolvedValue(mockData);

    const result = await BuildingAPI.get('testCode');

    expect(axios.get).toHaveBeenCalledWith('/building/get?code=testCode');
    expect(result).toEqual(mockData.data);
  });

  test('create() creates a building', async () => {
    const mockData = { data: { message: 'Success' } };
    axios.post.mockResolvedValue(mockData);
    const dataToSend = { name: 'testBuilding' };

    const result = await BuildingAPI.create(dataToSend);

    expect(axios.post).toHaveBeenCalledWith('/building/add', dataToSend);
    expect(result).toEqual(mockData.data);
  });

  test('update() updates a building', async () => {
    const mockData = { data: { message: 'Success' } };
    axios.put.mockResolvedValue(mockData);
    const dataToSend = { name: 'testBuilding' };

    const result = await BuildingAPI.update(dataToSend);

    expect(axios.put).toHaveBeenCalledWith('/building/modify', dataToSend);
    expect(result).toEqual(mockData.data);
  });

  test('delete() deletes a building', async () => {
    const mockData = { data: { message: 'Success' } };
    axios.delete.mockResolvedValue(mockData);

    const result = await BuildingAPI.delete('testCode');

    expect(axios.delete).toHaveBeenCalledWith('/building/remove?code=testCode');
    expect(result).toEqual(mockData.data);
  });
});


//CampusAPI
describe('CampusAPI', () => {
  test('getAll() returns all campuses', async () => {
    const mockData = { data: { message: 'Success' } };
    axios.get.mockResolvedValue(mockData);

    const result = await CampusAPI.getAll();

    expect(axios.get).toHaveBeenCalledWith('/campus/all');
    expect(result).toEqual(mockData.data);
  });

  test('get() returns a campus', async () => {
    const mockData = { data: { message: 'Success' } };
    axios.get.mockResolvedValue(mockData);

    const result = await CampusAPI.get('testCode');

    expect(axios.get).toHaveBeenCalledWith('/campus/get?code=testCode');
    expect(result).toEqual(mockData.data);
  });

  test('create() creates a campus', async () => {
    const mockData = { data: { message: 'Success' } };
    axios.post.mockResolvedValue(mockData);
    const dataToSend = { name: 'testCampus' };

    const result = await CampusAPI.create(dataToSend);

    expect(axios.post).toHaveBeenCalledWith('/campus/add', dataToSend);
    expect(result).toEqual(mockData.data);
  });

  test('update() updates a campus', async () => {
    const mockData = { data: { message: 'Success' } };
    axios.put.mockResolvedValue(mockData);
    const dataToSend = { name: 'testCampus' };

    const result = await CampusAPI.update(dataToSend);

    expect(axios.put).toHaveBeenCalledWith('/campus/modify', dataToSend);
    expect(result).toEqual(mockData.data);
  });

  test('delete() deletes a campus', async () => {
    const mockData = { data: { message: 'Success' } };
    axios.delete.mockResolvedValue(mockData);

    const result = await CampusAPI.delete('testCode');

    expect(axios.delete).toHaveBeenCalledWith('/campus/remove?code=testCode');
    expect(result).toEqual(mockData.data);
  });
});

//FloorAPI
describe('FloorAPI', () => {
  test('getAll() returns all floors', async () => {
    const mockData = { data: { message: 'Success' } };
    axios.get.mockResolvedValue(mockData);

    const result = await FloorAPI.getAll();

    expect(axios.get).toHaveBeenCalledWith('/floor/all');
    expect(result).toEqual(mockData.data);
  });

  test('get() returns a floor', async () => {
    const mockData = { data: { message: 'Success' } };
    axios.get.mockResolvedValue(mockData);

    const result = await FloorAPI.get('testCode');

    expect(axios.get).toHaveBeenCalledWith('/floor/get?code=testCode');
    expect(result).toEqual(mockData.data);
  });

  test('create() creates a floor', async () => {
    const mockData = { data: { message: 'Success' } };
    axios.post.mockResolvedValue(mockData);
    const dataToSend = { name: 'testFloor' };

    const result = await FloorAPI.create(dataToSend);

    expect(axios.post).toHaveBeenCalledWith('/floor/add', dataToSend);
    expect(result).toEqual(mockData.data);
  });

  test('update() updates a floor', async () => {
    const mockData = { data: { message: 'Success' } };
    axios.put.mockResolvedValue(mockData);
    const dataToSend = { name: 'testFloor' };

    const result = await FloorAPI.update(dataToSend);

    expect(axios.put).toHaveBeenCalledWith('/floor/modify', dataToSend);
    expect(result).toEqual(mockData.data);
  });

  test('delete() deletes a floor', async () => {
    const mockData = { data: { message: 'Success' } };
    axios.delete.mockResolvedValue(mockData);

    const result = await FloorAPI.delete('testCode');

    expect(axios.delete).toHaveBeenCalledWith('/floor/remove?code=testCode');
    expect(result).toEqual(mockData.data);
  });
});

//RoomAPI
describe('RoomAPI', () => {
  test('getAll() returns all rooms', async () => {
    const mockData = { data: { message: 'Success' } };
    axios.get.mockResolvedValue(mockData);

    const result = await RoomAPI.getAll();

    expect(axios.get).toHaveBeenCalledWith('/room/all');
    expect(result).toEqual(mockData.data);
  });

  test('get() returns a room', async () => {
    const mockData = { data: { message: 'Success' } };
    axios.get.mockResolvedValue(mockData);

    const result = await RoomAPI.get('testCode');

    expect(axios.get).toHaveBeenCalledWith('/room/get?code=testCode');
    expect(result).toEqual(mockData.data);
  });

  test('create() creates a room', async () => {
    const mockData = { data: { message: 'Success' } };
    axios.post.mockResolvedValue(mockData);
    const dataToSend = { name: 'testRoom' };

    const result = await RoomAPI.create(dataToSend);

    expect(axios.post).toHaveBeenCalledWith('/room/add', dataToSend);
    expect(result).toEqual(mockData.data);
  });

  test('update() updates a room', async () => {
    const mockData = { data: { message: 'Success' } };
    axios.put.mockResolvedValue(mockData);
    const dataToSend = { name: 'testRoom' };

    const result = await RoomAPI.update(dataToSend);

    expect(axios.put).toHaveBeenCalledWith('/room/modify', dataToSend);
    expect(result).toEqual(mockData.data);
  });

  test('delete() deletes a room', async () => {
    const mockData = { data: { message: 'Success' } };
    axios.delete.mockResolvedValue(mockData);

    const result = await RoomAPI.delete('testCode');

    expect(axios.delete).toHaveBeenCalledWith('/room/remove?code=testCode');
    expect(result).toEqual(mockData.data);
  });
});

//POIAPI
describe('POIAPI', () => {
    beforeEach(() => {
      jest.clearAllMocks();
    });
  
    test('getAll() returns all POIs', async () => {
      const mockData = { data: { message: 'Success' } };
      api.get.mockResolvedValue(mockData);
  
      const result = await POIAPI.getAll();
  
      expect(api.get).toHaveBeenCalledWith('/poi/inside/all');
      expect(result).toEqual(mockData.data);
      expect(handleRequest).toHaveBeenCalled();
    });
  
    test('get() returns a POI', async () => {
      const poiId = '123';
      const mockData = { data: { message: 'Success' } };
      api.get.mockResolvedValue(mockData);
  
      const result = await POIAPI.get(poiId);
  
      expect(api.get).toHaveBeenCalledWith(`/poi/inside/get?id=${poiId}/`);
      expect(result).toEqual(mockData.data);
      expect(handleRequest).toHaveBeenCalled();
    });
  
    test('create() creates a POI', async () => {
      const poiData = { name: 'Test POI' };
      const mockData = { data: { message: 'Success' } };
      api.post.mockResolvedValue(mockData);
  
      const result = await POIAPI.create(poiData);
  
      expect(api.post).toHaveBeenCalledWith('/poi/inside/add', poiData);
      expect(result).toEqual(mockData.data);
      expect(handleRequest).toHaveBeenCalled();
    });
  
    test('update() updates a POI', async () => {
      const poiData = { id: '123', name: 'Updated POI' };
      const mockData = { data: { message: 'Success' } };
      api.put.mockResolvedValue(mockData);
  
      const result = await POIAPI.update(poiData);
  
      expect(api.put).toHaveBeenCalledWith('/poi/inside/modify', poiData);
      expect(result).toEqual(mockData.data);
      expect(handleRequest).toHaveBeenCalled();
    });
  
    test('delete() deletes a POI', async () => {
      const poiData = { id: '123' };
      const mockData = { data: { message: 'Success' } };
      api.delete.mockResolvedValue(mockData);
  
      const result = await POIAPI.delete(poiData);
  
      expect(api.delete).toHaveBeenCalledWith('/poi/inside/remove', poiData);
      expect(result).toEqual(mockData.data);
      expect(handleRequest).toHaveBeenCalled();
    });
  });