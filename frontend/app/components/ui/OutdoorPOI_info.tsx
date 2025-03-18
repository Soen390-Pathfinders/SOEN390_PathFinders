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
    width: 200,
    height: 100,
    backgroundColor: "white",
    borderRadius: 10,
    padding: 15,
  },
});
