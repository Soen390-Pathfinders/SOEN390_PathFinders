import React from "react";
import { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import useTheme from "../hooks/useTheme";
import { getStyles } from "../styles";
import CampusPilotHeader from "../components/ui/CampusPilotHeader";
import { CampusToggle } from "../components/ui/CampusToggle";
import OutdoorPOI_info from "../components/ui/outdoorPOI_info";
import MapView, {
  Marker,
  PROVIDER_DEFAULT,
  PROVIDER_GOOGLE,
} from "react-native-maps";

export default function OutdoorPointsOfInterests() {
  const { theme } = useTheme();
  const globalStyles = getStyles(theme);
  const [campus, setCampus] = useState("SGW"); // Default to SGW

  const toggleCampus = (selectedCampus) => {
    setCampus(selectedCampus);
  };

  const campusCoordinates = {
    LOY: {
      latitude: 45.45823278377158,
      longitude: -73.63915536118513,
      latitudeDelta: 0.01,
      longitudeDelta: 0.01,
      title: "Loyola Campus",
      description: "Concordia University Loyola Campus",
    },
    SGW: {
      latitude: 45.4972030019821,
      longitude: -73.57852620369705,
      latitudeDelta: 0.01,
      longitudeDelta: 0.01,
      title: "SGW Campus",
      description: "Concordia University SGW Campus",
    },
  };

  return (
    <View style={globalStyles.container}>
      <CampusPilotHeader />
      <CampusToggle campus={campus} toggleCampus={toggleCampus} />

      <View style={globalStyles.mapContainer}>
        <View style={styles.infoBoxOverMap}>
          <OutdoorPOI_info />
        </View>

        <MapView
          showsUserLocation={true}
          provider={PROVIDER_DEFAULT}
          style={{ flex: 1 }}
          initialRegion={campusCoordinates[campus]}
          region={campusCoordinates[campus]}
        ></MapView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  infoBoxOverMap: {
    position: "absolute", // Take the box out of normal flow
    top: 50, // Position from the top
    left: 20, // Position from the left
    width: 200, // Set your desired width
    height: 100, // Set your desired height
    backgroundColor: "white", // Or any color you want
    borderRadius: 10, // Optional: rounded corners
    padding: 15, // Optional: inner spacing
    zIndex: 1, // Ensures the box appears above the map
    elevation: 3, // For Android shadow
    shadowColor: "#000", // For iOS shadow
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
});
