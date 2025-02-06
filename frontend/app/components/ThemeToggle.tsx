import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import React from "react";
import { useContext } from "react";
import ThemeContext from "./context/ThemeContext";
import { getStyles } from "../styles";
import useTheme from "../hooks/useTheme";

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme(); // Use the custom hook
  const styles = getStyles(theme); // Get styles based on theme

  const handleToggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    toggleTheme(newTheme);
  };

  return (
    <View style={styles.container}>
      <View //style={styles.iconRowView}
      >
        <TouchableOpacity onPress={handleToggleTheme}>
          <Image
            style={{ height: 40, width: 40 }}
            source={
              theme === "dark"
                ? require("../../assets/images/brightness.png")
                : require("../../assets/images/sleep-mode.png")
            }
            tintColor={theme === "dark" ? "#000" : "#fff"} // Invert the color based on theme
          />
        </TouchableOpacity>
      </View>
    </View>
  );
}
