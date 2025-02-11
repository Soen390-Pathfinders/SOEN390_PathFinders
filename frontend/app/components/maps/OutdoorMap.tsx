// Renders the Google Map through react-native-maps API
import React, { useState } from "react";
import MapView, { Marker, Polygon } from "react-native-maps";
import { PROVIDER_GOOGLE } from "react-native-maps";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import MapViewDirections from "react-native-maps-directions";
import { GOOGLE_MAPS_APIKEY } from "../../constants";
import outlines from "./building_outlines";
import { useLocation } from "../context/userLocationContext";
import PolygonRender from "./PolygonRender";

export default function OutdoorMap({origin, destination, travelMode}) {
  //{ origin, destination, travelMode }
 

  const [campus, setCampus] = useState("SGW");
  const { userLocation } = useLocation(); // Get location from context

  const initialRegions = {
    SGW: {
      latitude: 45.49745011600138,
      longitude: -73.57894297258392,
      latitudeDelta: 0.0322,
      longitudeDelta: 0.0221,
    },
    LOY: {
      latitude: 45.4582,
      longitude: -73.6405,
      latitudeDelta: 0.0322,
      longitudeDelta: 0.0221,
    },
  };

  const concordiaBuildings = [
    {
      id: 1,
      latitude: 45.49745011600138,
      longitude: -73.57894297258392,
      title: "Hall Building",
      description: "H Building Concordia University",
      campus: "SGW",
    },
    {
      id: 2,
      latitude: 45.4582,
      longitude: -73.6405,
      title: "Loyola Campus Main Building",
      description: "Loyola Campus Concordia University",
      campus: "LOY",
    },
  ];

  return (
    <View style={{ flex: 1 }}>
      <MapView
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        showsUserLocation={true}
        initialRegion={initialRegions[campus]}
        region={initialRegions[campus]}
      >
        {/* Render building outlines */}
        <PolygonRender />
        {/* Render building markers */}
        {concordiaBuildings.map((marker) => (
          <Marker
            key={marker.id}
            coordinate={{
              latitude: marker.latitude,
              longitude: marker.longitude,
            }}
            title={marker.title}
            description={marker.description}
          />
        ))}

        {concordiaBuildings
          .filter((marker) => marker.campus === campus)
          .map((marker) => (
            <Marker
              key={marker.id}
              coordinate={{
                latitude: marker.latitude,
                longitude: marker.longitude,
              }}
              title={marker.title}
              description={marker.description}
            />
          ))}

        {/* Render Directions if both origin and destination are set */}
        {origin && destination && (
          <MapViewDirections
            origin={origin}
            destination={destination}
            apikey={GOOGLE_MAPS_APIKEY}
            mode={travelMode} // Dynamic travel mode
            strokeWidth={7}
            strokeColor="blue"
          />
        )}
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  map: {
    position: "absolute",
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
});
