import React, { useEffect } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const CampusButton = ({ label, isActive, onPress }) => (
  <TouchableOpacity
    style={[styles.campusButton, isActive ? styles.activeButton : styles.inactiveButton]}
    onPress={onPress}
  >
    <Text style={styles.buttonText}>{label}</Text>
  </TouchableOpacity>
);

export const CampusToggle = ({ campus, toggleCampus }) => {

  const campuses = [
    { key: "SGW", label: "SGW" },
    { key: "LOY", label: "Loyola" },
  ];

  return (
    <View style={styles.buttonContainer}>
      {campuses.map(({ key, label }) => (//use of .map() to generate buttons
        <CampusButton
          key={key}
          label={label}
          isActive={campus === key}
          onPress={() => toggleCampus(key)}
        />
      ))}

    </View>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    position: "absolute",
    top: 140,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },
  campusButton: {
    padding: 10,
    borderRadius: 10,
    marginHorizontal: 10,
    width: 100,
    alignItems: "center",
  },
  activeButton: {
    backgroundColor: "#575757",
  },
  inactiveButton: {
    backgroundColor: "#AAAAAA",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
