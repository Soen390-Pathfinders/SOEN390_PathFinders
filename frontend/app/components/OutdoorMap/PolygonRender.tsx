import outlines from "./building_outlines";
import * as geolib from "geolib";
import { useLocation } from "../context/userLocationContext";
import { Polygon } from "react-native-maps";
import { View } from "react-native";
import React from "react";
import buildingAsDestination from "./buildingAsDestination";

export default function PolygonRender({ destination }) {
  const { userLocation } = useLocation(); // Get user Location
  /*const userLocation = {
    latitude: 45.49745011599649,
    longitude: -73.57908244723633,
  };*/ // For testing purposes

  return (
    <View>
      {outlines.map((outline) => {
        // use geolib to verify if the user location is inside a building polygon
        const isUserInsideBuilding = geolib.isPointInPolygon(
          userLocation,
          outline.coordinates
        );

        return (
          <Polygon
            key={outline.id}
            coordinates={outline.coordinates}
            fillColor={
              isUserInsideBuilding
                ? "#rgba(80, 130, 18, 0.50)" // Green if user is inside
                : outline.campus === "SGW"
                ? "rgba(145, 35, 55, 0.57)" // Red for SGW
                : "rgba(0, 0, 255, 0.57)" // Blue for LOY
            }
            strokeColor={
              isUserInsideBuilding
                ? "#rgba(80, 130, 18, 0.99)" // Green stroke if user is inside
                : outline.campus === "SGW"
                ? "rgba(145, 35, 55, 0.99)"
                : "rgba(0, 0, 255, 0.99)"
            }
            strokeWidth={2}
            onPress={() => {
              console.log("Polygon pressed"); // Add this line to verify if the handler is triggered  //TODO: Verify why the handler is not triggeredtriggered
              buildingAsDestination((result) => {
                if (result) {
                  destination(outline.coordinates[0]); // Set to the first coordinate
                }
              });
            }}
          />
        );
      })}
    </View>
  );
}
