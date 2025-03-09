import React, { useRef } from "react";
import { View, StyleSheet } from "react-native";
import { Image } from "expo-image";
import { Zoomable } from "@likashefqet/react-native-image-zoom";
import FilterButton from "./Filter";

export default function Floorplan() {
  const zoomableRef = useRef(null);

  return (
    <View style={styles.container}>
      <Zoomable
        ref={zoomableRef}
        minScale={1}
        maxScale={9}
        doubleTapScale={3}
        isSingleTapEnabled
        isDoubleTapEnabled
        style={styles.imageContainer}
      >
        <Image
          style={styles.image}
          source={require("../../../assets/floorplans/H5.png")}
          contentFit="cover" // Ensures it fills the entire area
          transition={1000}
          resizeMode="cover"
        />
      </Zoomable>
      <FilterButton />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1, // Ensure it takes the whole screen
  },
  imageContainer: {
    flex: 1, // Make sure Zoomable takes full space
    width: "100%",
    height: "100%",
  },
  image: {
    flex: 1, // Ensures the image fills available space
    width: "100%",
    height: "100%",
  },
});

