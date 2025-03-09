import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

export const CampusToggle = ({ campus, toggleCampus }) => {
  
    return (
    <View style={styles.buttonContainer}>
      <TouchableOpacity
        style={[
          styles.campusButton,
          campus === "SGW" ? styles.activeButton : styles.inactiveButton,
        ]}
        onPress={() => toggleCampus("SGW")}
      >
        <Text style={styles.buttonText}>SGW</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[
          styles.campusButton,
          campus === "LOY" ? styles.activeButton : styles.inactiveButton,
        ]}
        onPress={() => toggleCampus("LOY")}
      >
        <Text style={styles.buttonText}>Loyola</Text>
      </TouchableOpacity>
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