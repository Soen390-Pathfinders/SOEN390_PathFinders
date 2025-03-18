import { View, Text, StyleSheet } from "react-native";
import React from "react";

export default function OutdoorPOI_info() {
  return (
    <View style={styles.infoBoxContainer}>
      <Text>open Now</Text>
      <Text>open Now</Text>
      <Text>open Now</Text>
      <Text>open Now</Text>
    </View>
  );
}
const styles = StyleSheet.create({
  infoBoxContainer: {
    position: "absolute", // Take the box out of normal flow
    top: 50, // Position from the top
    left: 20, // Position from the left
    width: 200, // Set your desired width
    height: 100, // Set your desired height
    backgroundColor: "white", // Or any color you want
    borderRadius: 10, // Optional: rounded corners
    padding: 15, // Optional: inner spacing
  },
});
