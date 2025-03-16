import React, { useRef, useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import Svg, { Circle, Line } from "react-native-svg";
import { Image } from "expo-image";
import { Zoomable } from "@likashefqet/react-native-image-zoom";

export default function FloorplanRoom({ nodeInfo }) {
  console.log("Inside Floor plan this is the room node");
  console.log(nodeInfo);
  // Destructure the values of roomNode
  const { capacity, code, floor, id, number, room_types, location_data } =
    nodeInfo || {};
  // Destructure the location data
  const {
    amenity_names,
    description,
    floor: locationFloor,
    is_accessible,
    x_coor,
    y_coor,
  } = location_data || {};

  const initialScale = 1; // initial scale is 1
  const zoomableRef = useRef(null);
  const [scale, setScale] = useState(initialScale);

  const onZoom = (zoomType) => {
    console.log("Zoom event triggered:", zoomType);
  };

  const onAnimationEnd = (finished) => {
    console.log("Animation ended2:", finished);
  };

  const [loading, setLoading] = useState(true);

  // Zoom in on the room when component mounts
  useEffect(() => {
    console.log(x_coor, y_coor);
    if (zoomableRef.current && nodeInfo?.location_data) {
      const { x_coor, y_coor } = nodeInfo.location_data;

      // Add a delay to zoom on the room after the component has rendered
      setTimeout(() => {
        console.log("let's zoom in");
        zoomableRef.current.zoom(2, 2, 5);
      }, 800);
      console.log("let's zoom innnn");
    }
  }, [nodeInfo]);

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
          <Svg height="100%" width="100%" viewBox="0 0 100 100">
            {nodeInfo?.location_data && (
              <Circle
                cx={x_coor}
                cy={y_coor}
                r="5"
                stroke="black"
                strokeWidth="0.2"
                fill="rgba(145, 35, 55, 0.4)"
              />
            )}
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
