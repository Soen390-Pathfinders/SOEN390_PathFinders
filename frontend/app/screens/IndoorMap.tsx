import { View, Text, StyleSheet, ImageBackground } from "react-native";
import React from "react";
import CampusPilotHeader from "../components/ui/CampusPilotHeader";
import useTheme from "../hooks/useTheme";
import { getStyles } from "../styles";
import Floorplan from "../components/ui/Floorplan";

export default function IndoorMap() {
  const { theme } = useTheme();
  const globalStyles = getStyles(theme);

  return (
    <View style={globalStyles.container}>
      <CampusPilotHeader />

      <View style={styles.mycontainer}>
        <Floorplan />
        <Text>Hello</Text>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  mycontainer: {
    backgroundColor: "#e7e7e7",
    height: "50%",
  },
});
