import { BuildingAPI, CampusAPI, FloorAPI, RoomAPI, POIAPI } from '../../api/api';
import axios from 'axios';

jest.mock('../../api/api', () => {
  const mockApi = {
    get: jest.fn(),
    post: jest.fn(),
    put: jest.fn(),
    delete: jest.fn(),
  };

  return {
    __esModule: true,
    default: mockApi,
    BuildingAPI: {
      getAll: jest.fn(() => mockApi.get('/building/all')),
      get: jest.fn((buildingCode) => mockApi.get(`/building/get?code=${buildingCode}`)),
      create: jest.fn((buildingData) => mockApi.post('/building/add', buildingData)),
      update: jest.fn((buildingData) => mockApi.put('/building/modify', buildingData)),
      delete: jest.fn((buildingData) => mockApi.delete('/building/remove', { data: buildingData })),
    },
    CampusAPI: {
      getAll: jest.fn(() => mockApi.get('/campus/all')),
      get: jest.fn((campusCode) => mockApi.get(`/campus/get?code=${campusCode}`)),
      create: jest.fn((campusData) => mockApi.post('/campus/add', campusData)),
      update: jest.fn((campusData) => mockApi.put('/campus/modify', campusData)),
      delete: jest.fn((campusData) => mockApi.delete('/campus/remove', { data: campusData })),
    },
    FloorAPI: {
      getAll: jest.fn(() => mockApi.get('/floor/all')),
      get: jest.fn((floorCode) => mockApi.get(`/floor/get?code=${floorCode}`)),
      create: jest.fn((floorData) => mockApi.post('/floor/add', floorData)),
      update: jest.fn((floorData) => mockApi.put('/floor/modify', floorData)),
      delete: jest.fn((floorData) => mockApi.delete('/floor/remove', { data: floorData })),
    },
    RoomAPI: {
      getAll: jest.fn(() => mockApi.get('/room/all')),
      get: jest.fn((roomCode) => mockApi.get(`/room/get?code=${roomCode}`)),
      create: jest.fn((roomData) => mockApi.post('/room/add', roomData)),
      update: jest.fn((roomData) => mockApi.put('/room/modify', roomData)),
      delete: jest.fn((roomData) => mockApi.delete('/room/remove', { data: roomData })),
    },
    POIAPI: {
      getAll: jest.fn(() => mockApi.get('/poi/inside/all')),
      get: jest.fn((poiId) => mockApi.get(`/poi/inside/get?id=${poiId}`)),
      create: jest.fn((poiData) => mockApi.post('/poi/inside/add', poiData)),
      update: jest.fn((poiData) => mockApi.put('/poi/inside/modify', poiData)),
      delete: jest.fn((poiData) => mockApi.delete('/poi/inside/remove', { data: poiData })),
    },
  };
});

describe('API Tests', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('BuildingAPI', () => {
    it('should fetch all buildings', async () => {
      const mockData = [{ id: 1, name: 'Building A' }];
      BuildingAPI.getAll.mockResolvedValue({ data: mockData });

      const result = await BuildingAPI.getAll();
      expect(BuildingAPI.getAll).toHaveBeenCalled();
      expect(result).toEqual({ data: mockData });
    });

    it('should fetch a building by code', async () => {
      const mockData = { id: 1, name: 'Building A', code: 'B01' };
      BuildingAPI.get.mockResolvedValue({ data: mockData });

      const result = await BuildingAPI.get('B01');
      expect(BuildingAPI.get).toHaveBeenCalledWith('B01');
      expect(result).toEqual({ data: mockData });
    });

    it('should create a new building', async () => {
      const mockData = { id: 1, name: 'Building A', code: 'B01' };
      BuildingAPI.create.mockResolvedValue({ data: mockData });

      const result = await BuildingAPI.create(mockData);
      expect(BuildingAPI.create).toHaveBeenCalledWith(mockData);
      expect(result).toEqual({ data: mockData });
    });

    it('should update a building', async () => {
      const mockData = { id: 1, name: 'Building A Updated', code: 'B01' };
      BuildingAPI.update.mockResolvedValue({ data: mockData });

      const result = await BuildingAPI.update(mockData);
      expect(BuildingAPI.update).toHaveBeenCalledWith(mockData);
      expect(result).toEqual({ data: mockData });
    });

    it('should delete a building', async () => {
      const mockData = { id: 1, code: 'B01' };
      BuildingAPI.delete.mockResolvedValue({ data: {} });

      const result = await BuildingAPI.delete(mockData);
      expect(BuildingAPI.delete).toHaveBeenCalledWith(mockData);
      expect(result).toEqual({ data: {} });
    });
  });

  describe('CampusAPI', () => {
    it('should fetch all campuses', async () => {
      const mockData = [{ id: 1, name: 'Campus A' }];
      CampusAPI.getAll.mockResolvedValue({ data: mockData });

      const result = await CampusAPI.getAll();
      expect(CampusAPI.getAll).toHaveBeenCalled();
      expect(result).toEqual({ data: mockData });
    });

    it('should fetch a campus by code', async () => {
      const mockData = { id: 1, name: 'Campus A', code: 'C01' };
      CampusAPI.get.mockResolvedValue({ data: mockData });

      const result = await CampusAPI.get('C01');
      expect(CampusAPI.get).toHaveBeenCalledWith('C01');
      expect(result).toEqual({ data: mockData });
    });

    it('should create a new campus', async () => {
      const mockData = { id: 1, name: 'Campus A', code: 'C01' };
      CampusAPI.create.mockResolvedValue({ data: mockData });

      const result = await CampusAPI.create(mockData);
      expect(CampusAPI.create).toHaveBeenCalledWith(mockData);
      expect(result).toEqual({ data: mockData });
    });

    it('should update a campus', async () => {
      const mockData = { id: 1, name: 'Campus A Updated', code: 'C01' };
      CampusAPI.update.mockResolvedValue({ data: mockData });

      const result = await CampusAPI.update(mockData);
      expect(CampusAPI.update).toHaveBeenCalledWith(mockData);
      expect(result).toEqual({ data: mockData });
    });

    it('should delete a campus', async () => {
      const mockData = { id: 1, code: 'C01' };
      CampusAPI.delete.mockResolvedValue({ data: {} });

      const result = await CampusAPI.delete(mockData);
      expect(CampusAPI.delete).toHaveBeenCalledWith(mockData);
      expect(result).toEqual({ data: {} });
    });
  });

  describe('FloorAPI', () => {
    it('should fetch all floors', async () => {
      const mockData = [{ id: 1, number: '1', code: 'B01-1' }];
      FloorAPI.getAll.mockResolvedValue({ data: mockData });

      const result = await FloorAPI.getAll();
      expect(FloorAPI.getAll).toHaveBeenCalled();
      expect(result).toEqual({ data: mockData });
    });

    it('should fetch a floor by code', async () => {
      const mockData = { id: 1, number: '1', code: 'B01-1' };
      FloorAPI.get.mockResolvedValue({ data: mockData });

      const result = await FloorAPI.get('B01-1');
      expect(FloorAPI.get).toHaveBeenCalledWith('B01-1');
      expect(result).toEqual({ data: mockData });
    });

    it('should create a new floor', async () => {
      const mockData = { id: 1, number: '1', code: 'B01-1' };
      FloorAPI.create.mockResolvedValue({ data: mockData });

      const result = await FloorAPI.create(mockData);
      expect(FloorAPI.create).toHaveBeenCalledWith(mockData);
      expect(result).toEqual({ data: mockData });
    });

    it('should update a floor', async () => {
      const mockData = { id: 1, number: '1', code: 'B01-1' };
      FloorAPI.update.mockResolvedValue({ data: mockData });

      const result = await FloorAPI.update(mockData);
      expect(FloorAPI.update).toHaveBeenCalledWith(mockData);
      expect(result).toEqual({ data: mockData });
    });

    it('should delete a floor', async () => {
      const mockData = { id: 1, code: 'B01-1' };
      FloorAPI.delete.mockResolvedValue({ data: {} });

      const result = await FloorAPI.delete(mockData);
      expect(FloorAPI.delete).toHaveBeenCalledWith(mockData);
      expect(result).toEqual({ data: {} });
    });
  });

  describe('RoomAPI', () => {
    it('should fetch all rooms', async () => {
      const mockData = [{ id: 1, number: '101', code: 'B01-101' }];
      RoomAPI.getAll.mockResolvedValue({ data: mockData });

      const result = await RoomAPI.getAll();
      expect(RoomAPI.getAll).toHaveBeenCalled();
      expect(result).toEqual({ data: mockData });
    });

    it('should fetch a room by code', async () => {
      const mockData = { id: 1, number: '101', code: 'B01-101' };
      RoomAPI.get.mockResolvedValue({ data: mockData });

      const result = await RoomAPI.get('B01-101');
      expect(RoomAPI.get).toHaveBeenCalledWith('B01-101');
      expect(result).toEqual({ data: mockData });
    });

    it('should create a new room', async () => {
      const mockData = { id: 1, number: '101', code: 'B01-101' };
      RoomAPI.create.mockResolvedValue({ data: mockData });

      const result = await RoomAPI.create(mockData);
      expect(RoomAPI.create).toHaveBeenCalledWith(mockData);
      expect(result).toEqual({ data: mockData });
    });

    it('should update a room', async () => {
      const mockData = { id: 1, number: '101', code: 'B01-101' };
      RoomAPI.update.mockResolvedValue({ data: mockData });

      const result = await RoomAPI.update(mockData);
      expect(RoomAPI.update).toHaveBeenCalledWith(mockData);
      expect(result).toEqual({ data: mockData });
    });

    it('should delete a room', async () => {
      const mockData = { id: 1, code: 'B01-101' };
      RoomAPI.delete.mockResolvedValue({ data: {} });

      const result = await RoomAPI.delete(mockData);
      expect(RoomAPI.delete).toHaveBeenCalledWith(mockData);
      expect(result).toEqual({ data: {} });
    });
  });

  describe('POIAPI', () => {
    it('should fetch all POIs', async () => {
      const mockData = [{ id: 1, description: 'POI A' }];
      POIAPI.getAll.mockResolvedValue({ data: mockData });

      const result = await POIAPI.getAll();
      expect(POIAPI.getAll).toHaveBeenCalled();
      expect(result).toEqual({ data: mockData });
    });

    it('should fetch a POI by ID', async () => {
      const mockData = { id: 1, description: 'POI A' };
      POIAPI.get.mockResolvedValue({ data: mockData });

      const result = await POIAPI.get(1);
      expect(POIAPI.get).toHaveBeenCalledWith(1);
      expect(result).toEqual({ data: mockData });
    });

    it('should create a new POI', async () => {
      const mockData = { id: 1, description: 'POI A' };
      POIAPI.create.mockResolvedValue({ data: mockData });

      const result = await POIAPI.create(mockData);
      expect(POIAPI.create).toHaveBeenCalledWith(mockData);
      expect(result).toEqual({ data: mockData });
    });

    it('should update a POI', async () => {
      const mockData = { id: 1, description: 'POI A Updated' };
      POIAPI.update.mockResolvedValue({ data: mockData });

      const result = await POIAPI.update(mockData);
      expect(POIAPI.update).toHaveBeenCalledWith(mockData);
      expect(result).toEqual({ data: mockData });
    });

    it('should delete a POI', async () => {
      const mockData = { id: 1 };
      POIAPI.delete.mockResolvedValue({ data: {} });

      const result = await POIAPI.delete(mockData);
      expect(POIAPI.delete).toHaveBeenCalledWith(mockData);
      expect(result).toEqual({ data: {} });
    });
  });
});
