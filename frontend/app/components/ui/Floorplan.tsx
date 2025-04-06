import React, { useRef, useState, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from "react-native";
import Svg, { Circle, Line } from "react-native-svg";
import { Image } from "expo-image";
import { Zoomable } from "@likashefqet/react-native-image-zoom";
import PathTrace from "../ui/pathTrace";
import { floors, floorplanImages, defaultFloor } from "@/app/data/floorplanData";
import { useNavigation } from "@react-navigation/native";
import { DrawerNavigationProp } from "@react-navigation/drawer";


type RootDrawerParamList = {
  OutdoorDirections: {
    customStartLocation: string;
    customDestination: string;
    showPrompt: boolean,
    path
  };
};
type NavigationProp = DrawerNavigationProp<RootDrawerParamList>;

export default function Floorplan({path}) {

  const navigation = useNavigation<NavigationProp>(); // Drawer navigation
  
  const zoomableRef = useRef(null);
  // Use imported default floor
  const [currentFloor, setCurrentFloor] = useState(defaultFloor);
  // State to track if floor change was confirmed
  const [floorChangeConfirmed, setFloorChangeConfirmed] = useState(false);
  // State to track next floor in path
  const [nextFloorInPath, setNextFloorInPath] = useState(null);
  // Whether to show the "Have you exited?" banner
  const [showExitPrompt, setShowExitPrompt] = useState(false);
  // Coordinates or label for outdoor destination (set when path is cross-building)
  const [outdoorDestination, setOutdoorDestination] = useState(null);

  // State to track if the floor was manually changed by the user
  const [manualFloorChange, setManualFloorChange] = useState(false);

  // Create a ref to store previous path value to detect changes
  const prevPathRef = useRef(null);
  
  // When new path data arrives, reset states
  useEffect(() => {
    // Only run this if path has changed
    if (path && path !== prevPathRef.current) {
      // Store new path in ref
      prevPathRef.current = path;
      
      // When a new path is loaded, explicitly reset states
      setManualFloorChange(false);
      setFloorChangeConfirmed(false);
      setNextFloorInPath(null);
      
      // Don't reset currentFloor here - that will happen via onInitialFloorDetected
    }
  }, [path]);

  const onZoom = (zoomType) => {
    // Zoom handling
  };

  const onAnimationEnd = (finished) => {
    // Animation ended handling
  };

  // Function to get the appropriate floor plan image based on current floor
  const getFloorplanImage = () => {
    switch (currentFloor) {
      case "H1":
        return require("../../../assets/floorplans/H1.png");
      case "H4":
        return require("../../../assets/floorplans/H4.jpg");
      case "H5":
        return require("../../../assets/floorplans/H5.jpg");
      case "H6":
        return require("../../../assets/floorplans/H6.jpg");
      case "H8":
        return require("../../../assets/floorplans/H8.jpg");
      case "H9":
        return require("../../../assets/floorplans/H9.jpg");
      case "SP1":
        return require("../../../assets/floorplans/SP1.png")
      default:
        return require("../../../assets/floorplans/H5.jpg");
    }
  };

  // All available floors
  const floors = ["H1", "H4", "H5", "H6", "H8", "H9"];

  // Handle floor change requested by PathTrace component
  const handleFloorChangeRequired = (newFloor) => {
    // Only show the prompt if the floor wasn't manually changed
    if (!manualFloorChange) {
      setNextFloorInPath(newFloor);
    }
  };

  // Handle confirmation of floor change
  const handleFloorChangeConfirmation = (confirmed) => {
    setFloorChangeConfirmed(confirmed);
    if (confirmed && nextFloorInPath) {
      // Actually change the floor
      setCurrentFloor(nextFloorInPath);
    }
    // Reset the next floor after handling
    setNextFloorInPath(null);
    // Always reset manual floor change after a confirmation (whether yes or no)
    setManualFloorChange(false);
  };

  // Handle initial floor detection from PathTrace
  const handleInitialFloorDetected = (floorName) => {
    // Only update the floor if it wasn't manually changed
    if (!manualFloorChange) {
      setCurrentFloor(floorName);
    }
  };

  // Handle manual floor change from buttons
  const handleManualFloorChange = (floor) => {
    // Force update the floor regardless of any other state
    setCurrentFloor(floor);
    setManualFloorChange(true);
    setNextFloorInPath(null);
    setFloorChangeConfirmed(false);
  };

  return (
    <View style={styles.container}>
      {/* Floor selector */}
      <View style={styles.floorSelectorContainer}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.floorScroller}
          snapToAlignment="center"
        >
          {floors.map((floor) => (
            <TouchableOpacity
              key={floor}
              style={[
                styles.floorButton,
                currentFloor === floor && styles.selectedFloor,
              ]}
              onPress={() => handleManualFloorChange(floor)}
              activeOpacity={0.6}
            >
              <Text
                style={[
                  styles.floorButtonText,
                  currentFloor === floor && styles.selectedFloorText,
                ]}
              >
                {floor}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      <Zoomable
        ref={zoomableRef}
        minScale={1}
        maxScale={9}
        doubleTapScale={3}
        isSingleTapEnabled
        isDoubleTapEnabled
        onDoubleTap={onZoom}
        onProgrammaticZoom={onZoom}
        style={styles.zoomableContainer}
        onResetAnimationEnd={onAnimationEnd}
      >
        <View style={styles.svgContainer}>
          <Svg height="100%" width="100%" viewBox="0 0 100 100">
            <PathTrace
              currentFloor={currentFloor}
              currentBuilding={currentFloor[0]}
              onFloorChangeRequired={handleFloorChangeRequired}
              floorChangeConfirmed={floorChangeConfirmed}
              setFloorChangeConfirmed={setFloorChangeConfirmed}
              onInitialFloorDetected={handleInitialFloorDetected}

              onDetectedCrossBuildingPath={(isCrossBuilding, destinationCoordinate) => {
                if (isCrossBuilding) {
                  // Store destination and show the "exit building" banner
                  setOutdoorDestination(destinationCoordinate);
                  setShowExitPrompt(true);
                  
                }
              }}
            
              path={path}
              manualFloorChange={manualFloorChange}

            />
          </Svg>
        </View>
        
        <View style={styles.floorplanContainer}>
          <Image
            style={styles.image}
            source={getFloorplanImage()} 
            contentFit="contain"
            transition={250}
            resizeMode="contain"
          />
        </View>

        {/* Floor change banner */}
        {nextFloorInPath && (
          <View style={styles.bannerContainer}>
            <View style={styles.banner}>
              <Text style={styles.bannerText}>
                Continue to floor {nextFloorInPath}?
              </Text>

              <View style={styles.bannerButtons}>
                <TouchableOpacity
                  style={[styles.button, styles.buttonNo]}
                  onPress={() => handleFloorChangeConfirmation(false)}
                >
                  <Text style={styles.buttonText}>No</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={[styles.button, styles.buttonYes]}
                  onPress={() => handleFloorChangeConfirmation(true)}
                >
                  <Text style={styles.buttonText}>Yes</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        )}

        {showExitPrompt && (
          <View style={styles.bannerContainer}>
            <View style={styles.banner}>
              <Text style={styles.bannerText}>
                Have you exited the building?
              </Text>
              <View style={styles.bannerButtons}>
                <TouchableOpacity
                  style={[styles.button, styles.buttonYes]}
                  onPress={() => {
                    setShowExitPrompt(false); // Hide banner
                    // Navigate to outdoor directions with the dynamic coordinates
                    
                    navigation.navigate("OutdoorDirections", {
                      customStartLocation: "start",
                      customDestination: outdoorDestination,
                      showPrompt: showExitPrompt,
                      path: path
                    });
                    
                  }}
                >
                  <Text style={styles.buttonText}>Yes</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        )}

      </Zoomable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  floorSelectorContainer: {
    width: "100%",
    backgroundColor: "#f5f5f5",
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
    zIndex: 100, // Ensure this is always on top
  },
  floorScroller: {
    paddingHorizontal: 5,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 8,
  },
  floorButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginHorizontal: 3,
    borderRadius: 20,
    backgroundColor: "#e0e0e0",
    minWidth: 45,
  },
  selectedFloor: {
    backgroundColor: "#3498db",
  },
  floorButtonText: {
    fontSize: 16,
    fontWeight: "500",
    color: "#333",
  },
  selectedFloorText: {
    color: "white",
  },
  zoomableContainer: {
    flex: 1,
    width: "100%",
  },
  image: {
    flex: 1,
    position: 'absolute',
    width: "100%",
    height: "100%",
    transform:[{scaleY:1.2}]
  },
  svgContainer: {
    height: "100%",
    width: "100%",
    position: "absolute",
    left: 0,
    top: 0,
    zIndex: 4,
  },
  floorplanContainer: {
    height: "100%",
    width: "100%",
    position: "absolute",
    left: 0,
    top: 0,
    zIndex: 2,
    aspectRatio:1
  },
  bannerContainer: {
    position: "absolute",
    bottom: 20,
    left: 0,
    right: 0,
    zIndex: 10,
    alignItems: "center",
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
});
