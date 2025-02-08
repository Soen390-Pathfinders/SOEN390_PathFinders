import React from "react";
import { Text, View } from "react-native";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import OutdoorMap from "../components/maps/OutdoorMap";
import { StatusBar } from "expo-status-bar";
import AppLogo from "../components/ui/AppLogo";
import ThemeToggle from "../components/ui/ThemeToggle";
import useTheme from "../hooks/useTheme";
import { getStyles } from "../styles";
import { GOOGLE_MAPS_APIKEY } from "../constants"

export default function OutdoorDirections() {
  const { theme } = useTheme(); // Use the custom hook
  const styles = getStyles(theme); // Get styles based on theme

  return (
    <View style={styles.container}>
      {/* Status Bar */}
      <StatusBar style="dark" />

      {/* Header */}
      <View style={styles.iconRow}>
        <View style={styles.iconRowView}>
          <AppLogo />
        </View>
        <View>
          <Text style={[styles.logo]}>Campus Pilot</Text>
        </View>
        {/* Dark/light theme toggle */}
        <ThemeToggle />
      </View>

      {/* SearchBars using GooglePlacesAutocomplete */}
      <View style={styles.searchBar}>
        <GooglePlacesAutocomplete
          placeholder="Start Location"
          onPress={(data, details = null) => {
            console.log("Start Location selected:", data, details);
            // You can update state or perform other actions here
          }}
          fetchDetails={true}
          query={{
            key: GOOGLE_MAPS_APIKEY,
            language: "en",
          }}
          styles={{
            textInputContainer: {
              backgroundColor: "#EFF2F4",
              borderRadius: 30,
              margin: 10,
              width: "95%",
              paddingHorizontal: 10,
            },
            textInput: {
              height: 40,
              color: "#000",
              fontSize: 18,
            },
            predefinedPlacesDescription: {
              color: "#1faadb",
            },
          }}
        />
      </View>

      <View style={styles.searchBar}>
        <GooglePlacesAutocomplete
          placeholder="Select Destination"
          onPress={(data, details = null) => {
            console.log("Select Destination selected:", data, details);
            // Update state or navigate as needed
          }}
          fetchDetails={true}
          query={{
            key: GOOGLE_MAPS_APIKEY,
            language: "en",
          }}
          styles={{
            textInputContainer: {
              backgroundColor: "#EFF2F4",
              borderRadius: 30,
              margin: 10,
              width: "95%",
              paddingHorizontal: 10,
            },
            textInput: {
              height: 40,
              color: "#000",
              fontSize: 18,
            },
            predefinedPlacesDescription: {
              color: "#1faadb",
            },
          }}
        />
      </View>

      {/* Map */}
      <View style={styles.mapContainer}>
        <OutdoorMap />
      </View>
    </View>
  );
}
