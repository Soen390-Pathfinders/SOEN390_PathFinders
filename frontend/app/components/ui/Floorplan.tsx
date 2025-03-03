import React from "react";
import { View, Text, StyleSheet } from "react-native";
import Svg, { Circle } from "react-native-svg";
import { Image } from "expo-image";

export default function Floorplan() {
  return (
    <View style={styles.container}>
      <Image
        style={styles.image}
        source={require("../../../assets/floorplans/H5.jpg")}
        contentFit="cover"
        transition={1000}
        resizeMode="cover" // Ensures the image covers the container
      />

      {/*svg will come hete */}
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    flex: 1,
    width: "100%",
    backgroundColor: "#0553",
  },
});
