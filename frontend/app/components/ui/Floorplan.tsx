import React, { useRef, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import Svg from "react-native-svg";
import { Image } from "expo-image";
import { Zoomable } from "@likashefqet/react-native-image-zoom";
import PathTrace from "../ui/pathTrace";

export default function Floorplan() {
  const zoomableRef = useRef(null);
  // Default to H5 initially, but this will be updated by the PathTrace component
  const [currentFloor, setCurrentFloor] = useState("H5");
  // State to track if floor change was confirmed
  const [floorChangeConfirmed, setFloorChangeConfirmed] = useState(false);
  // State to track next floor in path
  const [nextFloorInPath, setNextFloorInPath] = useState(null);

  const onZoom = (zoomType) => {
    console.log("Zoom event triggered:", zoomType);
  };

  const onAnimationEnd = (finished) => {
    console.log("Animation ended:", finished);
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
      default:
        return require("../../../assets/floorplans/H5.jpg");
    }
  };

  // All available floors
  const floors = ["H1", "H4", "H5", "H6", "H8", "H9"];

  // Handle floor change requested by PathTrace component
  const handleFloorChangeRequired = (newFloor) => {
    setNextFloorInPath(newFloor);
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
  };

  // Handle initial floor detection from PathTrace
  const handleInitialFloorDetected = (floorName) => {
    setCurrentFloor(floorName);
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
              onPress={() => setCurrentFloor(floor)}
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
        onDoubleTap={(zoomType) => {
          onZoom(zoomType);
        }}
        onProgrammaticZoom={(zoomType) => {
          onZoom(zoomType);
        }}
        style={styles.zoomableContainer}
        onResetAnimationEnd={(finished, values) => {
          onAnimationEnd(finished);
        }}
      >
        <View style={styles.svgContainer}>
          <Svg height="100%" width="100%" viewBox="0 0 100 100">
            <PathTrace
              currentFloor={currentFloor}
              onFloorChangeRequired={handleFloorChangeRequired}
              floorChangeConfirmed={floorChangeConfirmed}
              setFloorChangeConfirmed={setFloorChangeConfirmed}
              onInitialFloorDetected={handleInitialFloorDetected}
            />
          </Svg>
        </View>
        <View style={styles.floorplanContainer}>
          <Image
            style={styles.image}
            source={getFloorplanImage()}
            contentFit="contain"
            transition={250}
            resizeMode="cover"
          ></Image>
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
    width: "100%",
    height: "100%",
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
