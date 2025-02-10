import React, { useState, useRef } from "react";
import { View, StyleSheet, TouchableOpacity, Alert } from "react-native";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import OutdoorMap from "../components/maps/OutdoorMap";
import useTheme from "../hooks/useTheme";
import { getStyles } from "../styles";
import { GOOGLE_MAPS_APIKEY } from "../constants";
import CampusPilotHeader from "../components/ui/CampusPilotHeader";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { useLocation } from "../components/context/userLocationContext";
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';

export default function OutdoorDirections() {
  const { theme } = useTheme();
  const globalStyles = getStyles(theme);

  const [startLocation, setStartLocation] = useState(null);
  const [destination, setDestination] = useState(null);
  const [travelMode, setTravelMode] = useState("WALKING");

  const { userLocation } = useLocation(); // Get user's current location

  // Refs for GooglePlacesAutocomplete to control input text
  const startLocationRef = useRef();
  const destinationRef = useRef();

  const handleGoPress = () => {
    if (startLocation && destination) {
      console.log(`Navigating from: ${startLocation} to: ${destination} via ${travelMode}`);
    } else {
      Alert.alert(
        "Missing Information",
        "Please fill in both the Start Location and Destination.",
        [{ text: "OK", style: "default" }]
      );
    }
  };

  // Function to set current location in the search bar and state
  const setToCurrentLocation = (type) => {
    const locationText = `${userLocation.latitude.toFixed(6)}, ${userLocation.longitude.toFixed(6)}`;

    if (type === "start") {
      setStartLocation(locationText); // Store as string
      startLocationRef.current.setAddressText(locationText); // Update search bar
    } else if (type === "destination") {
      setDestination(locationText); // Store as string
      destinationRef.current.setAddressText(locationText); // Update search bar
    }
  };

  return (
    <View style={globalStyles.container}>
      {/* Header */}
      <CampusPilotHeader />

      {/* Start Location with Current Location Icon */}
      <View style={styles.inputWithLocationContainer}>
        <GooglePlacesAutocomplete
          ref={startLocationRef}
          styles={{
            container: styles.googleBarWithButton,
            textInput: styles.googleInput,
            listView: { flex: 0 },
          }}
          placeholder="Start Location"
          onPress={(data, details = null) => {
            const latLng = `${details.geometry.location.lat.toFixed(6)}, ${details.geometry.location.lng.toFixed(6)}`;
            setStartLocation(latLng); // Store as string
          }}
          fetchDetails={true}
          query={{
            key: GOOGLE_MAPS_APIKEY,
            language: "en",
          }}
        />

        {/* Current Location Button */}
        <TouchableOpacity onPress={() => setToCurrentLocation("start")} style={styles.locationButton}>
        <MaterialIcons name="my-location" size={36} color="#007BFF" />
        </TouchableOpacity>
      </View>

      {/* Destination with Current Location Icon */}
      <View style={styles.inputWithLocationContainer}>
        <GooglePlacesAutocomplete
          ref={destinationRef}
          styles={{
            container: styles.googleBarWithButton,
            textInput: styles.googleInput,
            listView: { flex: 0 },
          }}
          placeholder="Select Destination"
          onPress={(data, details = null) => {
            const latLng = `${details.geometry.location.lat.toFixed(6)}, ${details.geometry.location.lng.toFixed(6)}`;
            setDestination(latLng); // Store as string
          }}
          fetchDetails={true}
          query={{
            key: GOOGLE_MAPS_APIKEY,
            language: "en",
          }}
        />

        {/* Current Location Button */}
        <TouchableOpacity onPress={() => setToCurrentLocation("destination")} style={styles.locationButton}>
        <MaterialIcons name="my-location" size={36} color="#007BFF" />
        </TouchableOpacity>
      </View>

      {/* Transportation Mode Selection */}
      <View style={styles.transportModeContainer}>
        {/* Walking Mode */}
        <TouchableOpacity 
          style={[styles.iconButton, travelMode === "WALKING" && styles.iconButtonSelected]}
          onPress={() => setTravelMode("WALKING")}
        >
          <MaterialIcons name="directions-walk" size={24} color={travelMode === "WALKING" ? "#fff" : "#007BFF"} />
        </TouchableOpacity>

        {/* Driving Mode */}
        <TouchableOpacity 
          style={[styles.iconButton, travelMode === "DRIVING" && styles.iconButtonSelected]}
          onPress={() => setTravelMode("DRIVING")}
        >
          <MaterialIcons name="directions-car" size={24} color={travelMode === "DRIVING" ? "#fff" : "#007BFF"} />
        </TouchableOpacity>

        {/* Transit Mode */}
        <TouchableOpacity 
          style={[styles.iconButton, travelMode === "TRANSIT" && styles.iconButtonSelected]}
          onPress={() => setTravelMode("TRANSIT")}
        >
          <MaterialIcons name="directions-transit" size={24} color={travelMode === "TRANSIT" ? "#fff" : "#007BFF"} />
        </TouchableOpacity>
      </View>

      {/* Always Display Map */}
      <View style={globalStyles.mapContainer}>
        <OutdoorMap origin={startLocation} destination={destination} travelMode={travelMode} />
      </View>
    </View>
  );
}

// Styles
const styles = StyleSheet.create({
  googleBarWithButton: {
    flex: 1,
  },
  googleInput: {
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 10,
    height: 50,
    fontSize: 14,
  },
  inputWithLocationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    width: '100%',
  },
  locationButton: {
    padding: 10,
  },

  /* Transport Mode Styles */
  transportModeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginBottom: 10,
    paddingHorizontal: 20,
  },
  iconButton: {
    alignItems: 'center',
    padding: 3,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#007BFF',
    marginHorizontal: 20,
  },
  iconButtonSelected: {
    backgroundColor: '#007BFF',
  },
});
