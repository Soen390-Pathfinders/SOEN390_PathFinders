import React from "react";
import { Text, View, StyleSheet } from "react-native";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import OutdoorMap from "../components/maps/OutdoorMap";
import useTheme from "../hooks/useTheme";
import { getStyles } from "../styles";
import { GOOGLE_MAPS_APIKEY } from "../constants";
import CampusPilotHeader from "../components/ui/CampusPilotHeader";

export default function OutdoorDirections() {
  const { theme } = useTheme(); // Use the custom hook
  const globalStyles = getStyles(theme); // Get styles based on theme

  return (
    <View style={globalStyles.container}>
      {/* Header with logo , title and Dakr/Light theme toggle */}
      <CampusPilotHeader />

      {/* SearchBars using GooglePlacesAutocomplete                  /*Searchbar commented out to test coordinates
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
        />
      </View>*/}

      {/* Map */}
      <View style={globalStyles.mapContainer}>
        <OutdoorMap />
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  textInputContainer: {
    backgroundColor: "#EFF2F4",
    borderRadius: 30,
    margin: 10,
    width: "95%",
    paddingHorizontal: 30,
    flex: 0.5,
  },
  textInput: {
    height: 40,
    color: "#000",
    fontSize: 12,
  },
  predefinedPlacesDescription: {
    color: "#1faadb",
  },
  searchBar: {
    backgroundColor: "#EFF2F4",
    borderColor: "#666",
    borderRadius: 30,
    borderWidth: 0,
    color: "#000",
    flex: 0.2,
    fontSize: 12,
    margin: 10,
    paddingHorizontal: 5,
    width: "95%",
  },
});
