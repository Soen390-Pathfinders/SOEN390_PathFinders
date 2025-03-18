import React, { useRef, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import Svg, { Circle, Line } from "react-native-svg";
import { Image } from "expo-image";
import { ImageZoom } from "@likashefqet/react-native-image-zoom";
import { Zoomable } from "@likashefqet/react-native-image-zoom";
import PathTrace from "../ui/pathTrace";

export default function Floorplan() {
  const zoomableRef = useRef(null); // Define a reference
  const [scale, setScale] = useState(1);
  // Add state for current floor
  const [currentFloor, setCurrentFloor] = useState("H5");

  const onZoom = (zoomType) => {
    console.log("Zoom event triggered:", zoomType);
  };

  const onAnimationEnd = (finished) => {
    console.log("Animation ended:", finished);
  };

  const [linepath, setlinePath] = useState([]);
  const [loading, setLoading] = useState(true);

  // Function to get the appropriate floor plan image based on current floor
  const getFloorplanImage = () => {
    switch(currentFloor) {
      case "H1":
        return require("../../../assets/floorplans/H1.png");
      case "H5":
        return require("../../../assets/floorplans/H5.jpg");
      case "H9":
        return require("../../../assets/floorplans/H9.jpg");
      default:
        return require("../../../assets/floorplans/H5.jpg");
    }
  };

  return (
    <View style={styles.container}>
      {/* Floor selector */}
      <View style={styles.floorSelector}>
        <TouchableOpacity 
          style={[styles.floorButton, currentFloor === "H1" && styles.selectedFloor]} 
          onPress={() => setCurrentFloor("H1")}
        >
          <Text style={[styles.floorButtonText, currentFloor === "H1" && styles.selectedFloorText]}>H1</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.floorButton, currentFloor === "H5" && styles.selectedFloor]} 
          onPress={() => setCurrentFloor("H5")}
        >
          <Text style={[styles.floorButtonText, currentFloor === "H5" && styles.selectedFloorText]}>H5</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.floorButton, currentFloor === "H9" && styles.selectedFloor]} 
          onPress={() => setCurrentFloor("H9")}
        >
          <Text style={[styles.floorButtonText, currentFloor === "H9" && styles.selectedFloorText]}>H9</Text>
        </TouchableOpacity>
      </View>
      
      <Zoomable
        ref={zoomableRef}
        minScale={1}
        maxScale={9}
        // scale={1.5}
        doubleTapScale={3}
        isSingleTapEnabled
        isDoubleTapEnabled
        onDoubleTap={(zoomType) => {
          //console.log("onDoubleTap", zoomType);
          onZoom(zoomType);
        }}
        onProgrammaticZoom={(zoomType) => {
          //console.log("onZoom", zoomType);
          onZoom(zoomType);
        }}
        style={styles.image}
        onResetAnimationEnd={(finished, values) => {
          // console.log("onResetAnimationEnd", finished);
          //console.log("lastScaleValue:", values?.SCALE.lastValue);
          onAnimationEnd(finished);
        }}
      >
        <View style={styles.svgContainer}>
          {" "}
          <Svg height="100%" width="100%" viewBox="0 0 100 100">
            <PathTrace />
          </Svg>
        </View>
        <View style={styles.floorplanContainer}>
          <Image
            style={styles.image}
            source={getFloorplanImage()} // Use dynamic image source based on selected floor
            contentFit="contain" 
            transition={500}
            resizeMode="cover"
          ></Image>
        </View>
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
  floorSelector: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    paddingVertical: 10,
    backgroundColor: "#f5f5f5",
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
  },
  floorButton: {
    paddingHorizontal: 20,
    paddingVertical: 8,
    marginHorizontal: 5,
    borderRadius: 20,
    backgroundColor: "#e0e0e0",
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
  image: {
    flex: 1,
    width: "100%",
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
});
