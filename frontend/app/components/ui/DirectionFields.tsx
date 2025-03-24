import React, { useEffect } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
} from "react-native";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import { GOOGLE_MAPS_APIKEY } from "@/app/constants";
import { useLocation } from "../context/userLocationContext";

export default function DirectionFields({
  startLocation,
  setStartLocation,
  destination,
  setDestination,
  onGoPress,
  startLocationRef,
  destinationRef,
  travelMode,
  setTravelMode,
  setToCurrentLocation,
  duration,
  setToBuildingLocation,
}) {
  useEffect(() => {
    if (destination && destinationRef.current) {
      destinationRef.current.setAddressText(destination);
    }
  }, [destination]);

  return (
    <View style={{ zIndex: 5 }}>
      {/* Start Location Input */}
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
            setStartLocation(latLng);
          }}
          fetchDetails={true}
          query={{
            key: GOOGLE_MAPS_APIKEY,
            language: "en",
          }}
        />

        {/* Current Location Button */}
        <TouchableOpacity
          onPress={() => setToCurrentLocation("start")}
          style={styles.locationButton}
          accessibilityRole="button"
          testID="current-location-button"
        >
          <MaterialIcons name="my-location" size={36} color="#007BFF" />
        </TouchableOpacity>
      </View>

      {/* Destination Input */}
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
            setDestination(latLng);
          }}
          fetchDetails={true}
          query={{
            key: GOOGLE_MAPS_APIKEY,
            language: "en",
          }}
        />

        {/* GO Button */}
        <TouchableOpacity
          onPress={onGoPress}
          style={styles.goButton}
          accessibilityRole="button"
        >
          <Text style={styles.goButtonText}>GO</Text>
        </TouchableOpacity>
      </View>

      {/* Transportation Mode Buttons */}
      <View style={styles.transportModeContainer}>
        {/* Walking */}
        <TouchableOpacity
          onPress={() => setTravelMode("WALKING")}
          style={[
            styles.iconButton,
            travelMode === "WALKING" && styles.iconButtonSelected,
          ]}
          accessibilityRole="button"
        >
          <View style={styles.iconContainer}>
            <MaterialIcons
              name="directions-walk"
              size={24}
              color={travelMode === "WALKING" ? "#fff" : "#007BFF"}
            />
            {duration !== null && travelMode === "WALKING" && (
              <Text style={styles.duration}>{Math.round(duration)} min</Text>
            )}
          </View>
        </TouchableOpacity>

        {/* Driving */}
        <TouchableOpacity
          onPress={() => setTravelMode("DRIVING")}
          style={[
            styles.iconButton,
            travelMode === "DRIVING" && styles.iconButtonSelected,
          ]}
          accessibilityRole="button"
        >
          <View style={styles.iconContainer}>
            <MaterialIcons
              name="directions-car"
              size={24}
              color={travelMode === "DRIVING" ? "#fff" : "#007BFF"}
            />
            {duration !== null && travelMode === "DRIVING" && (
              <Text style={styles.duration}>{Math.round(duration)} min</Text>
            )}
          </View>
        </TouchableOpacity>

        {/* Transit */}
        <TouchableOpacity
          onPress={() => setTravelMode("TRANSIT")}
          style={[
            styles.iconButton,
            travelMode === "TRANSIT" && styles.iconButtonSelected,
          ]}
          accessibilityRole="button"
        >
          <View style={styles.iconContainer}>
            <MaterialIcons
              name="directions-transit"
              size={24}
              color={travelMode === "TRANSIT" ? "#fff" : "#007BFF"}
            />
            {duration !== null && travelMode === "TRANSIT" && (
              <Text style={styles.duration}>{Math.round(duration)} min</Text>
            )}
          </View>
        </TouchableOpacity>
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
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 10,
    height: 50,
    fontSize: 14,
  },
  inputWithLocationContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
    width: "100%",
  },
  locationButton: {
    padding: 10,
  },
  goButton: {
    backgroundColor: "#007BFF",
    padding: 10,
    borderRadius: 10,
    marginLeft: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  goButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  transportModeContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    marginBottom: 10,
    paddingHorizontal: 20,
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
  iconContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  duration: {
    marginLeft: 8,
    color: "#fff",
    fontSize: 16,
    paddingRight: 5,
  },
});
