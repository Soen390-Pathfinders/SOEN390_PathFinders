// Code: CampusPilotHeader component , contais the logo, title and theme toggle
import { View, Text } from "react-native";
import React from "react";
import AppLogo from "./AppLogo";
import { getStyles } from "@/app/styles";
import useTheme from "@/app/hooks/useTheme";
import ThemeToggle from "./ThemeToggle";
import { StatusBar } from "expo-status-bar";

export default function CampusPilotHeader() {
  const { theme, toggleTheme } = useTheme(); // Use the custom hook
  const styles = getStyles(theme); // Get styles based on theme

  return (
    /* Adding the status bar on top of the screen */
    <View style={{ flex: 0.6 }}>
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
