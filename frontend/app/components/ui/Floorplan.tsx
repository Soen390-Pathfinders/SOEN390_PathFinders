import React, { useRef, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import Svg, { Circle, Line } from "react-native-svg";
import { Image } from "expo-image";
import FilterButton from "./Filter";
import { ImageZoom } from "@likashefqet/react-native-image-zoom";
import { Zoomable } from "@likashefqet/react-native-image-zoom";
import PathTrace from "../ui/pathTrace";

export default function Floorplan() {
  const zoomableRef = useRef(null); // Define a reference
  const [scale, setScale] = useState(1);

  const onZoom = (zoomType) => {
    console.log("Zoom event triggered:", zoomType);
  };

  const onAnimationEnd = (finished) => {
    console.log("Animation ended:", finished);
  };

  const [linepath, setlinePath] = useState([]);
  const [loading, setLoading] = useState(true);

  return (
    <View style={styles.container}>
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
            source={require("../../../assets/floorplans/H5.jpg")} //5fth floor of Hall buildign was used
            contentFit="contain" // entire image is contained
            transition={1000}
            resizeMode="cover" // Ensures the image covers the container
          ></Image>
        </View>
        <FilterButton />
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
