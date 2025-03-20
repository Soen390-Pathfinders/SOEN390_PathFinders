import React from "react";
import { View, TouchableOpacity, Text, StyleSheet } from "react-native";

const FilterPOI = ({ activeFilter, onFilterPress }) => {
  const filters = ["Bubble Tea", "Coffee", "Restaurants", "Parks"];

  return (
    <View style={styles.filterContainer}>
      {filters.map((filter) => (
        <TouchableOpacity
          key={filter}
          style={[
            styles.button,
            activeFilter === filter && styles.activeButton,
          ]}
          onPress={() => onFilterPress(filter)}
        >
          <Text
            style={[
              styles.text,
              activeFilter === filter && styles.activeText,
            ]}
          >
            {filter}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  filterContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 10,
  },
  button: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    backgroundColor: "#e0e0e0",
    marginHorizontal: 4,
  },
  activeButton: {
    backgroundColor: "#ff8c00",
  },
  text: {
    color: "#000",
    fontSize: 14,
    fontWeight: "500",
  },
  activeText: {
    color: "#fff",
  },
});

export default FilterPOI;