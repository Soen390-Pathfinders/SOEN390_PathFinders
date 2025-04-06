import { useState, useEffect } from "react";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import OutdoorMap from "../components/maps/OutdoorMap";
import useTheme from "../hooks/useTheme";
import { getStyles } from "../styles";
import CampusPilotHeader from "../components/ui/CampusPilotHeader";
import DirectionFields from "../components/ui/DirectionFields";
import useDirectionLogic from "../hooks/useDirectionLogic";
import { useNavigation } from "expo-router";

type NavigationProp = DrawerNavigationProp<RootDrawerParamList>;

export default function OutdoorDirections({ route }) {
  const { theme } = useTheme();
  const globalStyles = getStyles(theme);
  const navigation = useNavigation<NavigationProp>();
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
  const [showPrompt, setPrompt] = useState(false); // Whether to show the "Have you arrived?" banner
  const [trimmedPath, setTrimmedPath] = useState(null); //hold the trimmed path if coming from indoor navigation multi building
  
  useEffect(() => {
    if (route?.params?.customStartLocation) {
      setToCurrentLocation(route.params.customStartLocation);
    }
    if (route?.params?.customDestination) {
      setDestination(route.params.customDestination);
    }
    if(route?.params?.showPrompt){
      setPrompt(route.params.showPrompt)
    }
    if(route?.params?.path){
      const t_path = route.params.path;

      if (t_path?.path?.length > 0) {
        const fullPath = t_path.path;

        const isSPAtStart = fullPath[0].floor.startsWith("SP");
        const isSPAtEnd = fullPath[fullPath.length - 1].floor.startsWith("SP");

        let newPathArray = [];

        if (isSPAtStart) {
          // Remove all SP floors – keep only non-SP parts
          newPathArray = fullPath.filter(p => !p.floor.startsWith("SP"));
        } else if (isSPAtEnd) {
          // Keep only SP floors – discard non-SP parts
          newPathArray = fullPath.filter(p => p.floor.startsWith("SP"));
        } else {
          // Just in case: keep full path as-is
          newPathArray = [...fullPath];
        }

        const trimmedPath = {
          distance: 0, // Optional: recalculate if needed
          path: newPathArray,
        };

        console.log("trimmed path");
        console.log(trimmedPath);

        setTrimmedPath(trimmedPath);
      }

      
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
          setBuildingLocation={setBuildingLocation}
        />
        {showPrompt && (
                  <View style={styles.bannerContainer}>
                    <View style={styles.banner}>
                      <Text style={styles.bannerText}>
                        Have you reached the destination?
                      </Text>
                      <View style={styles.bannerButtons}>
        
                        <TouchableOpacity
                          style={[styles.button, styles.buttonYes]}
                          onPress={() => {
                            setPrompt(false); // Hide banner
                            // Navigate to outdoor directions with the dynamic coordinates
                            
                            navigation.navigate("(screens)/IndoorMap", trimmedPath);
                            
                          }}
                        >
                          <Text style={styles.buttonText}>Yes</Text>
                        </TouchableOpacity>
                      </View>
                    </View>
                  </View>
                )}
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
  bannerContainer: {
    position: "absolute",
    bottom: 20,
    left: 0,
    right: 0,
    zIndex: 10,
    alignItems: "center",
  },
  button: {
    padding: 8,
    borderRadius: 4,
    marginLeft: 6,
    minWidth: 60,
    alignItems: "center",
  },
  buttonYes: {
    backgroundColor: "#3498db",
  },
  buttonNo: {
    backgroundColor: "#e74c3c",
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 12,
  },
  banner: {
    backgroundColor: "rgba(255, 255, 255, 0.85)",
    borderRadius: 8,
    padding: 12,
    width: "80%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "rgba(0, 0, 0, 0.1)",
  },
  bannerText: {
    color: "#333",
    flex: 1,
    fontSize: 14,
    marginRight: 10,
    fontWeight: "500",
  },
  bannerButtons: {
    flexDirection: "row",
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
