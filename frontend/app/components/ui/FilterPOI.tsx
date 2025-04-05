import React, { useState } from "react";
import { MaterialIcons } from "@expo/vector-icons";
import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  Modal,
} from "react-native";

const FilterPOI = ({ onFilterPress }) => {
  const filters = [
    "Coffee",
    "Restaurants",
    "Parks",
    "Bakeries",
    "Pharmacies",
    "Bars",
    "Ice Cream",
    "Dessert Shops",
    "Juice Bars",
  ];

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedFilters, setSelectedFilters] = useState([]);
  const [selectedRatingRange, setSelectedRatingRange] = useState(null); // [min, max] or null

  const toggleFilter = (filter) => {
    if (selectedFilters.includes(filter)) {
      setSelectedFilters(selectedFilters.filter((f) => f !== filter));
    } else {
      setSelectedFilters([...selectedFilters, filter]);
    }
  };

  const handleApplyFilters = () => {
    onFilterPress(selectedFilters, selectedRatingRange);
    setIsModalVisible(false);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        accessibilityRole="button"
        style={styles.filterButton}
        testID="hamburger_menu_button"
        onPress={() => setIsModalVisible(true)}
      >
        <MaterialIcons name="filter-list" size={28} color="white" />
      </TouchableOpacity>

      <Modal
        visible={isModalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setIsModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Select Categories</Text>
            {filters.map((filter) => (
              <TouchableOpacity
                key={filter}
                style={[
                  styles.filterOption,
                  selectedFilters.includes(filter) && styles.selectedFilterOption,
                ]}
                onPress={() => toggleFilter(filter)}
              >
                <Text
                  style={[
                    styles.filterOptionText,
                    selectedFilters.includes(filter) &&
                      styles.selectedFilterOptionText,
                  ]}
                >
                  {filter}
                </Text>
              </TouchableOpacity>
            ))}

            <Text style={[styles.modalTitle, { marginTop: 20 }]}>Rating Range</Text>
            <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 10 }}>
              {[
                { label: "All", value: null },
                { label: "2–3", value: [2, 3] },
                { label: "3–4", value: [3, 4] },
                { label: "4+", value: [4, 5] },
              ].map((range) => (
                <TouchableOpacity
                  key={range.label}
                  style={[
                    styles.filterOption,
                    JSON.stringify(selectedRatingRange) ===
                      JSON.stringify(range.value) && styles.selectedFilterOption,
                  ]}
                  onPress={() => setSelectedRatingRange(range.value)}
                >
                  <Text
                    style={[
                      styles.filterOptionText,
                      JSON.stringify(selectedRatingRange) ===
                        JSON.stringify(range.value) && styles.selectedFilterOptionText,
                    ]}
                  >
                    {range.label}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>

            <TouchableOpacity
              style={styles.applyButton}
              onPress={handleApplyFilters}
            >
              <Text style={styles.applyButtonText}>Apply</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setIsModalVisible(false)}
            >
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "flex-start",
    padding: 10,
  },
  filterButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 30,
    backgroundColor: "#0072A8",
  },
  filterButtonText: {
    color: "#000",
    fontSize: 14,
    fontWeight: "500",
  },
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    width: "80%",
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 20,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
  },
  filterOption: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 20,
    backgroundColor: "#f0f0f0",
    marginBottom: 10,
    marginRight: 10,
  },
  selectedFilterOption: {
    backgroundColor: "#0072A8",
  },
  filterOptionText: {
    color: "#000",
    fontSize: 14,
    fontWeight: "500",
  },
  selectedFilterOptionText: {
    color: "#fff",
  },
  applyButton: {
    marginTop: 20,
    paddingVertical: 10,
    borderRadius: 20,
    backgroundColor: "#007bff",
    alignItems: "center",
  },
  applyButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  closeButton: {
    marginTop: 10,
    paddingVertical: 10,
    borderRadius: 20,
    backgroundColor: "#e0e0e0",
    alignItems: "center",
  },
  closeButtonText: {
    color: "#000",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default FilterPOI;
