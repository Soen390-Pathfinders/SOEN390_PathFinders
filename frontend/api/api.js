import axios from "axios";

const API_BASE_URL = process.env.REACT_APP_API_URL || "http://localhost:8000";

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
    getAll: () => handleRequest(() => api.get("/building_get/")),
    get: (buildingName) => handleRequest(() => api.get(`/building_get/${buildingName}/`)),
    create: (buildingData) => handleRequest(() => api.post("/building_create/", buildingData)),
    update: (buildingName, updatedData) =>
      handleRequest(() => api.put(`/building_update/${buildingName}/`, updatedData)),
    delete: (buildingName) => handleRequest(() => api.delete(`/building_delete/${buildingName}/`)),
  };
  


  export const CampusAPI = {
    getAll: () => handleRequest(() => api.get("/campus/")),
    get: (campusId) => handleRequest(() => api.get(`/campus/${campusId}/`)),
    create: (campusData) => handleRequest(() => api.post("/campus_create/", campusData)),
    update: (campusId, updatedData) =>
      handleRequest(() => api.put(`/campus_update/${campusId}/`, updatedData)),
    delete: (campusId) => handleRequest(() => api.delete(`/campus_delete/${campusId}/`)),
  };
  


  export const FloorAPI = {
    getAll: () => handleRequest(() => api.get("/floor/")),
    get: (floorId) => handleRequest(() => api.get(`/floor/${floorId}/`)),
    create: (floorData) => handleRequest(() => api.post("/floor/create/", floorData)),
    update: (floorId, updatedData) =>
      handleRequest(() => api.put(`/floor/${floorId}/update/`, updatedData)),
    delete: (floorId) => handleRequest(() => api.delete(`/floor/${floorId}/delete/`)),
  };
  


  export const RoomAPI = {
    getAll: () => handleRequest(() => api.get("/room/")),
    get: (roomId) => handleRequest(() => api.get(`/room/${roomId}/`)),
    create: (roomData) => handleRequest(() => api.post("/room/create/", roomData)),
    update: (roomId, updatedData) =>
      handleRequest(() => api.put(`/room/${roomId}/update/`, updatedData)),
    delete: (roomId) => handleRequest(() => api.delete(`/room/${roomId}/delete/`)),
  };
  


  //export const POIAPI = {
   // getAll: () => handleRequest(() => api.get("/pointOfInterest/")),
  //  get: (poiId) => handleRequest(() => api.get(`/pointOfInterest/${poiId}/`)),
  //  create: (poiData) => handleRequest(() => api.post("/pointOfInterest_create/", poiData)),
  //  update: (poiId, updatedData) =>
  //    handleRequest(() => api.put(`/pointOfInterest_update/${poiId}/`, updatedData)),
  //  delete: (poiId) => handleRequest(() => api.delete(`/pointOfInterest_delete/${poiId}/`)),
 // };
  
  //export default api;
  