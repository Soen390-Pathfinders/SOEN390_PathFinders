import React, { useRef, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import Svg, { Circle } from "react-native-svg";
import { Image } from "expo-image";
import { ImageZoom } from "@likashefqet/react-native-image-zoom";
import { Zoomable } from "@likashefqet/react-native-image-zoom";

export default function Floorplan() {
  const zoomableRef = useRef(null); // Define a reference
  const [scale, setScale] = useState(1);

  const onZoom = (zoomType) => {
    console.log("Zoom event triggered:", zoomType);
  };

  const onAnimationEnd = (finished) => {
    console.log("Animation ended:", finished);
  };

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
        <Image
          style={styles.image}
          source={require("../../../assets/floorplans/H5.jpg")} //5fth floor of Hall buildign was used
          contentFit="contain" // entire image is contained
          transition={1000}
          resizeMode="cover" // Ensures the image covers the container
        />
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
});
