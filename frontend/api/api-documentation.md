# Campus Navigation System API Documentation

## Overview

This document provides detailed instructions for using the Campus Navigation API in frontend applications. The API allows interaction with campus data, buildings, floors, rooms, points of interest, and navigation paths.

## Base Configuration

The API uses Axios for HTTP requests with a base URL of `http://localhost:8000/api`. All requests include JSON content type headers, and responses are automatically parsed.

## Error Handling

All API methods return detailed 

## API Modules

### CampusAPI

Manages campus data including locations and basic information.

| Method               | Description                 | Parameters                                       | Return Data             |
| -------------------- | --------------------------- | ------------------------------------------------ | ----------------------- |
| `getAll()`           | Retrieves all campuses      | None                                             | Array of campus objects |
| `get(campusCode)`    | Retrieves a specific campus | `campusCode`: String code identifier             | Campus object           |
| `create(campusData)` | Creates a new campus        | `campusData`: Object with campus details         | Created campus object   |
| `update(campusData)` | Updates an existing campus  | `campusData`: Object with updated campus details | Updated campus object   |
| `delete(campusData)` | Deletes a campus            | `campusData`: Object with campus identifier      | Deletion confirmation   |

**Campus Object Structure:**

```javascript
{
  id: Number,
  name: String,
  code: String,       // 3-character unique identifier
  latitude: Number,   // Decimal with 6 places
  longitude: Number   // Decimal with 6 places
}
```

### BuildingAPI

Manages building data within campuses.

| Method                 | Description                   | Parameters                                           | Return Data               |
| ---------------------- | ----------------------------- | ---------------------------------------------------- | ------------------------- |
| `getAll()`             | Retrieves all buildings       | None                                                 | Array of building objects |
| `get(buildingCode)`    | Retrieves a specific building | `buildingCode`: String code identifier               | Building object           |
| `create(buildingData)` | Creates a new building        | `buildingData`: Object with building details         | Created building object   |
| `update(buildingData)` | Updates an existing building  | `buildingData`: Object with updated building details | Updated building object   |
| `delete(buildingData)` | Deletes a building            | `buildingData`: Object with building identifier      | Deletion confirmation     |

**Building Object Structure:**

```javascript
{
  id: Number,
  name: String,            // Short name
  long_name: String,       // Full name
  code: String,            // 3-character unique identifier
  description: String,     // Optional description
  address: String,         // Physical address
  campus: String,          // Campus code this building belongs to
  floor_count: Number,     // Number of floors
  latitude: Number,        // Decimal with 6 places
  longitude: Number        // Decimal with 6 places
}
```

### FloorAPI

Manages floors within buildings.

| Method                    | Description                                         | Parameters                                                     | Return Data                            |
| ------------------------- | --------------------------------------------------- | -------------------------------------------------------------- | -------------------------------------- |
| `getAll()`                | Retrieves all floors                                | None                                                           | Array of floor objects                 |
| `get(floorCode)`          | Retrieves a specific floor                          | `floorCode`: String code identifier (format: `BUILDING-FLOOR`) | Floor object                           |
| `getAmenities(floorCode)` | Retrieves all amenities related to a specific floor | `floorCode`: String code identifier (format: `BUILDING-FLOOR`) | Array of amenities and associated POIs |
| `create(floorData)`       | Creates a new floor                                 | `floorData`: Object with floor details                         | Created floor object                   |
| `update(floorData)`       | Updates an existing floor                           | `floorData`: Object with updated floor details                 | Updated floor object                   |
| `delete(floorData)`       | Deletes a floor                                     | `floorData`: Object with floor identifier                      | Deletion confirmation                  |

**Floor Object Structure:**

```javascript
{
  id: Number,
  building: String,      // Building code this floor belongs to
  number: String,        // Floor number/identifier
  code: String,          // Auto-generated code (BUILDING-NUMBER)
  description: String    // Optional description
}
```

### RoomAPI

Manages rooms within floors.

| Method             | Description               | Parameters                                                   | Return Data           |
| ------------------ | ------------------------- | ------------------------------------------------------------ | --------------------- |
| `getAll()`         | Retrieves all rooms       | None                                                         | Array of room objects |
| `get(roomCode)`    | Retrieves a specific room | `roomCode`: String code identifier (format: `BUILDING-ROOM`) | Room object           |
| `create(roomData)` | Creates a new room        | `roomData`: Object with room details                         | Created room object   |
| `update(roomData)` | Updates an existing room  | `roomData`: Object with updated room details                 | Updated room object   |
| `delete(roomData)` | Deletes a room            | `roomData`: Object with room identifier                      | Deletion confirmation |

**Room Object Structure:**

```javascript
{
  id: Number,
  number: String,                   // Room number
  floor: String,                    // Floor code this room belongs to
  code: String,                     // Auto-generated code (BUILDING-NUMBER)
  capacity: Number,                 // Room capacity
  type: [String],                   // Array of room type names for creating/updating
  room_types: [String],             // Array of room type names (read-only)
  location: Number,                 // InsidePOI ID for creating/updating
  location_data: Object             // Full InsidePOI object with details (read-only)
}
```

### POIAPI

Manages Points of Interest (POIs) inside buildings.

| Method            | Description              | Parameters                                 | Return Data           |
| ----------------- | ------------------------ | ------------------------------------------ | --------------------- |
| `getAll()`        | Retrieves all POIs       | None                                       | Array of POI objects  |
| `get(poiId)`      | Retrieves a specific POI | `poiId`: Numeric ID                        | POI object            |
| `create(poiData)` | Creates a new POI        | `poiData`: Object with POI details         | Created POI object    |
| `update(poiData)` | Updates an existing POI  | `poiData`: Object with updated POI details | Updated POI object    |
| `delete(poiData)` | Deletes a POI            | `poiData`: Object with POI identifier      | Deletion confirmation |

**InsidePOI Object Structure:**

```javascript
{
  id: Number,
  floor: String,            // Floor code this POI belongs to
  description: String,      // Optional description
  is_accessible: Boolean,   // Accessibility flag
  amenities: [String],      // Array of amenity names for creating/updating
  amenity_names: [String],  // Array of amenity names (read-only)
  x_coor: Number,           // X coordinate on floor map
  y_coor: Number            // Y coordinate on floor map
}
```

### PathAPI

Calculates navigation paths between rooms. The has_disability attribute is optional (default is false) and can be used to compute the shortest accessible path for students with disabilities.

| Method                                                             | Description                                                                  | Parameters                                                                                        | Return Data      |
| ------------------------------------------------------------------ | ---------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------- | ---------------- |
| `shortestPathToRoom(start_room, destination_room, has_disability)` | Calculates the shortest path between two rooms                               | `start_room`: String (room code), `destination_room`: String (room code), `has_disability`: Boolean | Path data object |
| `shortestPathToAmenity(start_room, amenity_name, has_disability)`  | Calculates the shortest path from a room to a POI with the specified amenity | `start_room`: String (room code), `amenity_name`: AmenityType, `has_disability`: Boolean            | Path data object |
| `shortestPathToPOI(start_room, poi_id, has_disability)`            | Calculates the shortest path from a room to a POI                            | `start_room`: String (room code), `poi_id`: Integer, `has_disability`: Boolean                      | Path data object |

**Path Data Structure:**

```javascript
{
  path: [
    {
      id: Number,
      floor: String,            // Floor code this POI belongs to
      description: String,      // Optional description
      is_accessible: Boolean,   // Accessibility flag
      amenities: [String],      // Array of amenity names for creating/updating
      amenity_names: [String],  // Array of amenity names (read-only)
      x_coor: Number,           // X coordinate on floor map
      y_coor: Number            // Y coordinate on floor map
    },
    // Additional nodes...
  ],
  distance: Number,        // Total path distance
}
```

## Usage Examples

### Fetching all buildings

```javascript
import { BuildingAPI } from "./api";

async function getAllBuildings() {
  try {
    const buildings = await BuildingAPI.getAll();
    console.log("Buildings:", buildings);
    return buildings;
  } catch (error) {
    console.error("Failed to fetch buildings:", error);
  }
}
```

### Creating a new room

```javascript
import { RoomAPI } from "./api";

async function createRoom() {
  const roomData = {
    number: "101",
    floor: "H-5", // Floor code
    capacity: 30,
    is_wheelchair_accessible: true,
    type: "CLASSROOM|LAB", // Pipe-separated list of room types
    location: 42, // ID of an InsidePOI
  };

  try {
    const newRoom = await RoomAPI.create(roomData);
    console.log("Room created:", newRoom);
    return newRoom;
  } catch (error) {
    console.error("Failed to create room:", error);
  }
}
```

### Finding a path between rooms

```javascript
import { PathAPI } from "./api";

async function findPath() {
  try {
    const path = await PathAPI.shortestPath("H-521", "H-524");
    console.log("Path found:", path);
    return path;
  } catch (error) {
    console.error("Failed to find path:", error);
  }
}
```
