import React, { useState } from "react";
import MapView, { Marker, Polygon } from "react-native-maps";
import { PROVIDER_GOOGLE } from "react-native-maps";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import MapViewDirections from "react-native-maps-directions";
import { GOOGLE_MAPS_APIKEY } from "../../constants";
import outlines from "./building_outlines";

export default function OutdoorMap() {
  const [campus, setCampus] = useState("SGW");

  const toggleCampus = (selectedCampus) => {
    setCampus(selectedCampus);
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

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[
            styles.campusButton,
            campus === "SGW" ? styles.activeButton : styles.inactiveButton,
          ]}
          onPress={() => toggleCampus("SGW")}
        >
          <Text style={styles.buttonText}>SGW</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.campusButton,
            campus === "LOY" ? styles.activeButton : styles.inactiveButton,
          ]}
          onPress={() => toggleCampus("LOY")}
        >
          <Text style={styles.buttonText}>Loyola</Text>
        </TouchableOpacity>
      </View>
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
  buttonContainer: {
    position: "absolute",
    top: -52,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },
  campusButton: {
    padding: 10,
    borderRadius: 10,
    marginHorizontal: 10,
    width: 100,
    alignItems: "center",
  },
  activeButton: {
    backgroundColor: "#575757",
  },
  inactiveButton: {
    backgroundColor: "#AAAAAA",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
