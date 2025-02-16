import React, { useState, useRef } from "react";
import { View, StyleSheet, TouchableOpacity, Alert, Text } from "react-native";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import OutdoorMap from "../components/maps/OutdoorMap";
import useTheme from "../hooks/useTheme";
import { getStyles } from "../styles";
import { GOOGLE_MAPS_APIKEY } from "../constants";
import CampusPilotHeader from "../components/ui/CampusPilotHeader";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { useLocation } from "../components/context/userLocationContext";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import ConcordiaShuttleTimes from "../components/ui/ConcordiaShuttleTimes";

export default function OutdoorDirections() {
  const { theme } = useTheme();
  const globalStyles = getStyles(theme);

  return (
    <View style={globalStyles.container}>
      {/* Header */}
      <CampusPilotHeader />
      {/*Shuttle Timing*/}
      <ConcordiaShuttleTimes />
      {/*Outdoor Map*/}
      <View style={globalStyles.mapContainer}>
        <OutdoorMap
        /*   origin={{
            latitude: 45.45823278377158,
            longitude: -73.63915536118513,
          }}
          destination={{
            latitude: 45.4972030019821,
            longitude: -73.57852620369705,
          }}
          travelMode={""}*/ //TODO:  Should we trace the shuttle path with react-native-maps polyline or direction ?
        />
      </View>
    </View>
  );
}

// Styles
const styles = StyleSheet.create({
  googleBarWithButton: {
    flex: 1,
  },

  iconButton: {
    alignItems: "center",
    padding: 3,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#007BFF",
    marginHorizontal: 20,
  },
  iconButtonSelected: {
    backgroundColor: "#007BFF",
  },
});
