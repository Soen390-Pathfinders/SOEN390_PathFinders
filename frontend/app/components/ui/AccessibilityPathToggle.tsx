import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { MaterialIcons } from "@expo/vector-icons"; // For icons

type ToggleAccessibilityProps = {
  accessibilityNeed: boolean;
  setAccessibilityNeed: (value: boolean) => void;
};

const ToggleAccessibility = ({
  accessibilityNeed,
  setAccessibilityNeed,
}: ToggleAccessibilityProps) => {
  return (
    <TouchableOpacity
      onPress={() => setAccessibilityNeed(!accessibilityNeed)}
      style={styles.toggleButton}
    >
      <Text>
        {" "}
        <MaterialIcons
          name={accessibilityNeed ? "accessible" : "accessible-forward"}
          size={24}
          color="black"
        />
        {accessibilityNeed
          ? "Accessible Path Option ON"
          : "Accessible Path Option OFF"}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  toggleButton: {
    padding: 10,
    backgroundColor: "#e0e0e0",
    borderRadius: 5,
    alignSelf: "center",
  },
});

export default ToggleAccessibility;
