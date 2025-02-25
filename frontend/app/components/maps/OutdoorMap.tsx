// Renders the Google Map through react-native-maps API
import React, { useState } from "react";
import MapView, { Marker, Polygon, PROVIDER_DEFAULT } from "react-native-maps";
import { PROVIDER_GOOGLE } from "react-native-maps";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import MapViewDirections from "react-native-maps-directions";
import { GOOGLE_MAPS_APIKEY } from "../../constants";
import outlines from "./building_outlines";
import { useLocation } from "../context/userLocationContext";
import PolygonRender from "./PolygonRender";
import useTheme from "../../hooks/useTheme";
import { darkMapStyle } from "../../styles";
import { concordiaBuildings } from "./concordiaBuildings";

export default function OutdoorMap({ origin, destination, travelMode, campus }) {
  //{ origin, destination, travelMode }

  const { userLocation } = useLocation(); // Get location from context
  const { theme } = useTheme();
  const mapStyle = theme === "light" ? darkMapStyle : [];

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

  return (
    <View style={{ flex: 1 }}>
      <MapView
        provider={PROVIDER_DEFAULT}
        style={styles.map}
        showsUserLocation={true}
        initialRegion={initialRegions[campus]}
        region={initialRegions[campus]}
        customMapStyle={mapStyle}
      >
        {/* Render building outlines */}
        <PolygonRender />
        {/* Render markers */}
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
