import pkg from "./mockApi.mjs";

const { BuildingAPI, CampusAPI, FloorAPI, RoomAPI, POIAPI, PathAPI } = pkg;

async function testBuildingAPI() {
  try {
    const room = await RoomAPI.get("H-521");
    const path = await PathAPI.shortestPathToRoom("H-521", "H-524", true);
    const path2 = await PathAPI.shortestPathToAmenity("H-521", "BAR", true);
    const path3 = await PathAPI.shortestPathToPOI("H-521", 4, true);
    const amen = await FloorAPI.getAmenities("H-5");
    console.log("Shortest Path to room:", path);
    console.log("Shortest Path to amenity:", path2);
    console.log("Shortest Path to POI:", path3);
    console.log("Amenities on H-5", amen);
    console.log("Room Info:", room);
  } catch (error) {
    console.error("Error fetching buildings:", error);
  }
}

testBuildingAPI();
