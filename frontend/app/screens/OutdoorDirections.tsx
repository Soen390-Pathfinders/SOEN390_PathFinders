import { useState, useEffect } from "react";
import { View, StyleSheet } from "react-native";
import OutdoorMap from "../components/maps/OutdoorMap";
import useTheme from "../hooks/useTheme";
import { getStyles } from "../styles";
import CampusPilotHeader from "../components/ui/CampusPilotHeader";
import DirectionFields from "../components/ui/DirectionFields";
import useDirectionLogic from "../hooks/useDirectionLogic";

export default function OutdoorDirections({ route }) {
  const { theme } = useTheme();
  const globalStyles = getStyles(theme);
  const {
    startLocation,
    setStartLocation,
    destination,
    setDestination,
    setBuildingLocation,
    travelMode,
    setTravelMode,
    submittedStart,
    submittedDestination,
    handleGoPress,
    setToCurrentLocation,
    setToBuildingLocation,
    startLocationRef,
    destinationRef,
  } = useDirectionLogic();
  const [duration, setDuration] = useState(null); // For the trip duration

  useEffect(() => {
    if (route?.params?.customStartLocation) {
      setToCurrentLocation(route.params.customStartLocation);
    }
    if (route?.params?.customDestination) {
      setDestination(route.params.customDestination);
    }
  }, [route.params]); // Only runs when route.params changes

  return (
    <View style={globalStyles.container}>
      {/* Header */}
      <CampusPilotHeader />
      {/*Add start and destination fields and buttons*/}
      <DirectionFields
        startLocation={startLocation}
        setStartLocation={setStartLocation}
        destination={destination}
        setDestination={setDestination}
        onGoPress={handleGoPress} // Pass the handleGoPress function
        startLocationRef={startLocationRef} // Pass the ref
        destinationRef={destinationRef} // Pass the ref
        travelMode={travelMode}
        setTravelMode={setTravelMode} // Pass the setTravelMode function
        setToCurrentLocation={setToCurrentLocation} // Pass the setToCurrentLocation function
        duration={duration}
        setToBuildingLocation={setToBuildingLocation} // Pass the setToBuildingLocation function
      />
      {/* Always Display Map with Submitted Locations */}
      <View style={globalStyles.mapContainer}>
        <OutdoorMap
          origin={submittedStart}
          destination={submittedDestination}
          travelMode={travelMode}
          onDurationChange={setDuration}
          setBuildingLocation={setBuildingLocation} campus={undefined}        />
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
    borderColor: "#007BFF",
    marginHorizontal: 20,
  },
  iconButtonSelected: {
    backgroundColor: "#007BFF",
  },
});
