import React, { useState, useRef } from "react";
import { View, StyleSheet, TouchableOpacity, Alert, Text, Image } from "react-native";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import OutdoorMap from "../maps/OutdoorMap";
import useTheme from "@/app/hooks/useTheme";
import { getStyles } from "@/app/styles";
import { GOOGLE_MAPS_APIKEY } from "@/app/constants";
import CampusPilotHeader from "./CampusPilotHeader";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { useLocation } from "../context/userLocationContext";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import useDirectionLogic from "@/app/hooks/useDirectionLogic";

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
}) {
  return (
    <View style={{ zIndex: 5 }}>
      <View style={styles.inputWithLocationContainer}>
        {/* Start Location with Current Location Icon */}
        <GooglePlacesAutocomplete
          ref={startLocationRef}
          styles={{
            container: styles.googleBarWithButton,
            textInput: styles.googleInput,
            listView: { flex: 0 },
          }}
          placeholder="Start Location"
          onPress={(data, details = null) => {
            const latLng = `${details.geometry.location.lat.toFixed(
              6
            )}, ${details.geometry.location.lng.toFixed(6)}`;
            setStartLocation(latLng); // Store as string
          }}
          fetchDetails={true}
          query={{
            key: GOOGLE_MAPS_APIKEY,
            language: "en",
          }}
        />

        {/* Current Location Button for Start */}
        <TouchableOpacity
          onPress={() => setToCurrentLocation("start")}
          style={styles.locationButton}
        >
          <MaterialIcons name="my-location" size={36} color="#193697" />
        </TouchableOpacity>
      </View>
      <View style={styles.inputWithLocationContainer}>
        {/* Destination with GO Button */}
        <GooglePlacesAutocomplete
          ref={destinationRef}
          styles={{
            container: styles.googleBarWithButton,
            textInput: styles.googleInput,
            listView: { flex: 0 },
          }}
          placeholder="Select Destination"
          onPress={(data, details = null) => {
            const latLng = `${details.geometry.location.lat.toFixed(
              6
            )}, ${details.geometry.location.lng.toFixed(6)}`;
            setDestination(latLng); // Store as string
          }}
          fetchDetails={true}
          query={{
            key: GOOGLE_MAPS_APIKEY,
            language: "en",
          }}
        />

        {/* GO Button instead of the current location button */}
        <TouchableOpacity onPress={onGoPress} style={styles.goButton}>
          <Image source={require("../../../assets/images/go.png")}
            style={{
              width: 27,
              height: 27,
              transform: [{ rotate: '180deg' }]
            }
          }>
          </Image>
        </TouchableOpacity>
      </View>

      {/* Transportation Mode Selection */}
      <View style={styles.transportModeContainer}>
        {/* Walking Mode */}
        <TouchableOpacity
          style={[
            styles.iconButton,
            travelMode === "WALKING" && styles.iconButtonSelected,
          ]}
          onPress={() => setTravelMode("WALKING")}
        >
          <MaterialIcons
            name="directions-walk"
            size={24}
            color={travelMode === "WALKING" ? "#fff" : "#193697"}
          />
        </TouchableOpacity>

        {/* Driving Mode */}
        <TouchableOpacity
          style={[
            styles.iconButton,
            travelMode === "DRIVING" && styles.iconButtonSelected,
          ]}
          onPress={() => setTravelMode("DRIVING")}
        >
          <MaterialIcons
            name="directions-car"
            size={24}
            color={travelMode === "DRIVING" ? "#fff" : "#193697"}
          />
        </TouchableOpacity>

        {/* Transit Mode */}
        <TouchableOpacity
          style={[
            styles.iconButton,
            travelMode === "TRANSIT" && styles.iconButtonSelected,
          ]}
          onPress={() => setTravelMode("TRANSIT")}
        >
          <MaterialIcons
            name="directions-transit"
            size={24}
            color={travelMode === "TRANSIT" ? "#fff" : "#193697"}
          />
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
    borderRadius: 20,
    paddingHorizontal: 10,
    height: 50,
    fontSize: 14,
  },
  inputWithLocationContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
    width: "90%",
  },
  locationButton: {
    padding: 10,
  },
  goButton: {
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
  /* Transport Mode Styles */
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
    borderColor: "#193697",
    marginHorizontal: 20,
  },
  iconButtonSelected: {
    backgroundColor: "#193697",
  },
});
