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
  