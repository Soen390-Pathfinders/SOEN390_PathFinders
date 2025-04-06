import axios from "axios";
import { Platform } from "react-native";
import Constants from "expo-constants";

<<<<<<< HEAD
const LOCAL_IP = "192.168.2.28"; // CHANGE THIS to your machine’s IP
=======
const LOCAL_IP = "YOUR_IP"; // CHANGE THIS to your machine’s IP
>>>>>>> 3dc247145e6b0d9484760182270a076e97e018e8

// Check if the app is running on a simulator/emulator
const isEmulator = true; //Change to false if using your physical device

export const API_BASE_URL = isEmulator
  ? Platform.select({
      ios: "http://localhost:8000/api", // iOS Simulator
      android: "http://10.0.2.2:8000/api", // Android Emulator
    })
  : `http://${LOCAL_IP}:8000/api`; // Physical devices

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

const handleRequest = async (requestFunc) => {
  try {
    const response = await requestFunc();
    return response.data;
  } catch (error) {
    console.error("API Error:", error.response?.data?.message || error.message);
    throw error;
  }
};

export const BuildingAPI = {
  getAll: () => handleRequest(() => api.get("/building/all")),
  get: (buildingCode) =>
    handleRequest(() => api.get(`/building/get?code=${buildingCode}`)),
  create: (buildingData) =>
    handleRequest(() => api.post("/building/add", buildingData)),
  update: (buildingData) =>
    handleRequest(() => api.put("/building/modify", buildingData)),
  delete: (buildingData) =>
    handleRequest(() => api.delete("/building/remove", buildingData)),
};

export const CampusAPI = {
  getAll: () => handleRequest(() => api.get("/campus/all")),
  get: (campusCode) =>
    handleRequest(() => api.get(`/campus/get?code=${campusCode}`)),
  create: (campusData) =>
    handleRequest(() => api.post("/campus/add", campusData)),
  update: (campusData) =>
    handleRequest(() => api.put(`/campus/modify`, campusData)),
  delete: (campusData) =>
    handleRequest(() => api.delete(`/campus/remove`, campusData)),
};

export const FloorAPI = {
  getAll: () => handleRequest(() => api.get("/floor/all")),
  get: (floorCode) =>
    handleRequest(() => api.get(`/floor/get?code=${floorCode}`)),
  getAmenities: (floorCode) =>
    handleRequest(() => api.get(`/floor/amenities?code=${floorCode}`)),
  create: (floorData) => handleRequest(() => api.post("/floor/add", floorData)),
  update: (floorData) =>
    handleRequest(() => api.put(`/floor/modify`, floorData)),
  delete: (floorData) =>
    handleRequest(() => api.delete(`/floor/remove`, floorData)),
};

export const RoomAPI = {
  test: () => console.log(getApiUrl()),
  getAll: () => handleRequest(() => api.get("/room/all")),
  get: (roomCode) => handleRequest(() => api.get(`/room/get?code=${roomCode}`)),
  create: (roomData) => handleRequest(() => api.post("/room/add", roomData)),
  update: (roomData) => handleRequest(() => api.put(`/room/modify`, roomData)),
  delete: (roomData) =>
    handleRequest(() => api.delete(`/room/remove`, roomData)),
};

export const POIAPI = {
  getAll: () => handleRequest(() => api.get("/poi/inside/all")),
  get: (poiId) => handleRequest(() => api.get(`/poi/inside/get?id=${poiId}`)),
  create: (poiData) =>
    handleRequest(() => api.post("/poi/inside/add", poiData)),
  update: (poiData) =>
    handleRequest(() => api.put(`/poi/inside/modify`, poiData)),
  delete: (poiData) =>
    handleRequest(() => api.delete(`/poi/inside/remove`, poiData)),
};

export const PathAPI = {
  shortestPathToRoom: (start_room, destination_room, has_disability) =>
    handleRequest(() =>
      api.post("/path/rooms", {
        room1: start_room,
        room2: destination_room,
        accessible: has_disability,
      })
    ),
  shortestPathToAmenity: (start_room, amenity_name, has_disability) =>
    handleRequest(() =>
      api.post("/path/amenity", {
        room1: start_room,
        amenity: amenity_name,
        accessible: has_disability,
      })
    ),
  shortestPathToPOI: (start_room, poi_id, has_disability) =>
    handleRequest(() =>
      api.post("/path/poi", {
        room1: start_room,
        location_id: poi_id,
        accessible: has_disability,
      })
    ),
};
