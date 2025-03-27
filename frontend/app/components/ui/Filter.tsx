import React, { useState } from "react";
import { View, Modal, TouchableOpacity, Text, StyleSheet, ScrollView } from "react-native";
import { Checkbox } from "react-native-paper";
import { MaterialIcons } from "@expo/vector-icons";

export const FilterButton = ({ onApplyFilters }) => {
    const [visible, setVisible] = useState(false);
    const [selectedFilters, setSelectedFilters] = useState<string[]>([]);

    const filters = [
        "WATER_FOUNTAIN",
        "VENDING_MACHINE",
        "CAFE",
        "BAR",
        "STUDY_AREA",
        "CHARGING_STATION",
        "ELEVATOR",
        "STAIRS",
        "PRINTER",
        "WIFI",
        "LOCKER",
        "LOUNGE",
        "CAFETERIA",
        "LIBRARY",
        "ATM",
        "BICYCLE_RACK",
        "HANDICAP_ACCESSIBLE",
        "PARKING_SPOT",
        "POST_BOX",
        "SECURITY_DESK",
        "TRASH_CAN",
        "RECYCLING_BIN",
        "COFFEE_MACHINE",
        "SHOWER",
        "FIRST_AID_KIT",
        "POWER_OUTLETS",
        "REST_AREA",
        "LOST_AND_FOUND",
        "EXIT"
    ];

    const toggleSelection = (item: string) => {
        setSelectedFilters((prevFilters) =>
            prevFilters.includes(item)
                ? prevFilters.filter((filter) => filter !== item)
                : [...prevFilters, item]
        );
    };
    
    const handleApply = () => {
        onApplyFilters(selectedFilters);
        setVisible(false);
    };

    return (
        <View style={styles.container}>
            {/* This button should always be visible */}
            <TouchableOpacity style={styles.fab} onPress={() => setVisible(true)}>
                <MaterialIcons name="filter-list" size={28} color="white" />
            </TouchableOpacity>

            <Modal transparent visible={visible} animationType="fade">
                <View style={styles.overlay}>
                    <View style={styles.modalContainer}>
                        <View style={styles.modalHeader}>
                            <Text style={styles.modalTitle}>Select Filters</Text>
                            <TouchableOpacity onPress={() => setVisible(false)}>
                                <MaterialIcons name="close" size={24} color="black" />
                            </TouchableOpacity>
                        </View>
                        
                        <ScrollView style={styles.scrollContainer}>
                            {filters.map((item, index) => (
                                <TouchableOpacity
                                    key={index}
                                    style={styles.option}
                                    onPress={() => toggleSelection(item)}
                                >
                                    <Checkbox
                                        status={selectedFilters.includes(item) ? "checked" : "unchecked"}
                                        onPress={() => toggleSelection(item)}
                                    />
                                    <Text style={styles.optionText}>{item}</Text>
                                </TouchableOpacity>
                            ))}
                        </ScrollView>
                        
                        <TouchableOpacity
                            style={styles.applyButton}
                            onPress={handleApply}
                        >
                            <Text style={styles.applyButtonText}>Apply</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        position: "absolute",
        bottom: 20,
        right: 20,
        zIndex: 10, // Ensure it stays on top
    },    
    fab: {
        backgroundColor: "#0072A8",
        width: 56,
        height: 56,
        borderRadius: 28,
        justifyContent: "center",
        alignItems: "center",
        elevation: 5,
    },
    overlay: {
        flex: 1,
        backgroundColor: "rgba(0,0,0,0.4)",
        justifyContent: "center",
        alignItems: "center",
    },
    modalContainer: {
        position: "absolute",
        bottom: 80,
        right: 20,
        backgroundColor: "white",
        borderRadius: 10,
        paddingVertical: 10,
        paddingHorizontal: 20,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
        elevation: 5,
        maxHeight: 400,
        width: 300,
    },
    modalHeader: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingBottom: 10,
        borderBottomWidth: 1,
        borderBottomColor: "#eee",
    },
    modalTitle: {
        fontSize: 18,
        fontWeight: "bold",
    },
    scrollContainer: {
        maxHeight: 300,
    },
    option: {
        flexDirection: "row",
        alignItems: "center",
        paddingVertical: 8
    },
    optionText: {
        marginLeft: 8,
        fontSize: 16
    },
    applyButton: {
        backgroundColor: "#0072A8",
        paddingVertical: 10,
        borderRadius: 8,
        alignItems: "center",
        marginTop: 10,
    },
    applyButtonText: {
        color: "white",
        fontSize: 16,
        fontWeight: "bold"
    },
});

export default FilterButton;