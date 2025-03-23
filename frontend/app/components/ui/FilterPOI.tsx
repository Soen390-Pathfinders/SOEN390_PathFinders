import React, { useState } from "react";
import { MaterialIcons } from "@expo/vector-icons";
import { View, TouchableOpacity, Text, StyleSheet, Modal } from "react-native";

const FilterPOI = ({ onFilterPress }) => {
  const filters = ["Coffee", "Restaurants", "Parks", "Bakeries", "Pharmacies","Bars","Ice Cream","Dessert Shops","Juice Bars"];
  const [isModalVisible, setModalVisible] = useState(false);
  const [selectedFilters, setSelectedFilters] = useState([]);

  // Toggle filter selection
  const toggleFilter = (filter) => {
    if (selectedFilters.includes(filter)) {
      setSelectedFilters(selectedFilters.filter((f) => f !== filter));
    } else {
      setSelectedFilters([...selectedFilters, filter]);
    }
  };

  // Apply filters and close modal
  const handleApplyFilters = () => {
    onFilterPress(selectedFilters);
    setModalVisible(false);
  };

  return (
    <View style={styles.container}>
      {/* Main Filter Button */}
      <TouchableOpacity
        style={styles.filterButton}
        onPress={() => setModalVisible(true)}
      >
        <MaterialIcons name="filter-list" size={28} color="white" />
      </TouchableOpacity>

      {/* Filter Modal */}
      <Modal
        visible={isModalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Select Filters</Text>

            {/* Filter Options */}
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
                    selectedFilters.includes(filter) && styles.selectedFilterOptionText,
                  ]}
                >
                  {filter}
                </Text>
              </TouchableOpacity>
            ))}

            {/* Apply Button */}
            <TouchableOpacity
              style={styles.applyButton}
              onPress={handleApplyFilters}
            >
              <Text style={styles.applyButtonText}>Apply</Text>
            </TouchableOpacity>

            {/* Close Button */}
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setModalVisible(false)}
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
    marginBottom: 20,
    textAlign: "center",
  },
  filterOption: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 20,
    backgroundColor: "#f0f0f0",
    marginBottom: 10,
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