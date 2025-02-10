import React, { useState } from "react";
import MapView, { Marker, Polygon } from "react-native-maps";
import { PROVIDER_GOOGLE } from "react-native-maps";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import MapViewDirections from "react-native-maps-directions";
import { GOOGLE_MAPS_APIKEY } from "../../constants";
import outlines from "./building_outlines";

export default function OutdoorMap() {
  const [campus, setCampus] = useState("SGW");

  const toggleCampus = () => {
    setCampus(campus === "SGW" ? "LOY" : "SGW");
  };

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
        {outlines
          .filter((outline) => outline.campus === campus)
          .map((outline) => (
            <Polygon
              key={outline.id}
              coordinates={outline.coordinates}
              fillColor={
                outline.campus === "SGW"
                  ? "rgba(145, 35, 55, 0.57)"
                  : "rgba(0, 0, 255, 0.57)"
              }
              strokeColor={
                outline.campus === "SGW"
                  ? "rgba(145, 35, 55, 0.99)"
                  : "rgba(0, 0, 255, 0.99)"
              }
              strokeWidth={2}
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
      </MapView>

      <TouchableOpacity style={styles.toggleButton} onPress={toggleCampus}>
        <Text style={styles.buttonText}>{`Switch to ${campus === "SGW" ? "Loyola" : "SGW"}`}</Text>
      </TouchableOpacity>
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
  toggleButton: {
    position: "absolute",
    bottom: 40,
    left: "50%",
    transform: [{ translateX: -50 }],
    backgroundColor: "#000",
    padding: 10,
    borderRadius: 10,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
