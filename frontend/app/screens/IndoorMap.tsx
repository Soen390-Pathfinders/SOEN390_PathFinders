import { View, Text, StyleSheet, ImageBackground } from "react-native";
import React from "react";
import CampusPilotHeader from "../components/ui/CampusPilotHeader";
import useTheme from "../hooks/useTheme";
import { getStyles } from "../styles";
import Floorplan from "../components/ui/Floorplan";
import Svg, { Circle } from "react-native-svg";

export default function IndoorMap() {
  const { theme } = useTheme();
  const globalStyles = getStyles(theme);

  return (
    <View style={globalStyles.container}>
      <View style={styles.header}>
        <CampusPilotHeader />
      </View>
      <View style={StyleSheet.absoluteFill}>
        <Floorplan />
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  header: { height: "20%" },
  myImagecontainer: {
    height: "80%",
    width: "100%",
  },
});
