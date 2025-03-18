import { View, Text, StyleSheet } from "react-native";
import React from "react";
import AppLogo from "./AppLogo";
import { getStyles } from "@/app/styles";
import useTheme from "@/hooks/useTheme";
import ThemeToggle from "./ThemeToggle";
import { StatusBar } from "expo-status-bar";

export default function CampusPilotHeader() {
  const { theme, toggleTheme } = useTheme(); // Use the custom hook
  const styles = getStyles(theme); // Get styles based on theme

  return (
    /* Adding the status bar on top of the screen */
    <View style={{ flex: 0.7 }}>
      <View>
        <StatusBar style="dark" />
      </View>
      <View style={styles.iconRow}>
        <View style={styles.iconRowView}>
          <AppLogo />
        </View>
        <View>
          <Text style={[styles.logo]}>Campus Pilot</Text>
        </View>
        {/* Dark/light theme toggle */}
        <ThemeToggle />
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  headerContainer: {
    flex: 0.5,
    paddingTop: 20,
  },
  iconRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 10,
    paddingTop: 10,
  },
  iconRowView: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  logo: {
    fontSize: 20,
    fontWeight: "bold",
  },
});
