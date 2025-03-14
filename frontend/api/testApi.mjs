import pkg from "./mockApi.mjs";

const { BuildingAPI, CampusAPI, FloorAPI, RoomAPI, POIAPI, PathAPI } = pkg;

async function testBuildingAPI() {
  try {
    const room = await RoomAPI.get("H-521");
    const path = await PathAPI.shortestPath("H-521");
    console.log("Shortest Path:", path);
    console.log("Room Info:", room);
  } catch (error) {
    console.error("Error fetching buildings:", error);
  }
}

testBuildingAPI();
