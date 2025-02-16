import { View, Text, StyleSheet } from "react-native";
import React from "react";

export default function ConcordiaShuttleTimes() {
  return (
    <View style={styles.timecontainer}>
      <Text>ConcordiaShuttleTimes</Text>
    </View>
  );
}
// Styles
const styles = StyleSheet.create({
  timecontainer: {
    backgroundColor: "#007BFF", //TODO: Change the color , I wanted to make it obvious that this is a different component
    height: "30%",
    width: "100%",
  },
});
