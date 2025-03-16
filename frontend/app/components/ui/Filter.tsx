import React, { useState } from "react";
import { View, Modal, TouchableOpacity, Text, StyleSheet, ScrollView } from "react-native";
import { Checkbox } from "react-native-paper";
import { MaterialIcons } from "@expo/vector-icons";

export const FilterButton = () => {
    const [visible, setVisible] = useState(false);
    const [selectedFilters, setSelectedFilters] = useState<string[]>([]);

    const filters = [
        "Exclusive Bathrooms",
        "All Inclusive Bathrooms",
        "Escalators",
        "Elevators",
        "Stairs",
        "Water fountain",
        "Vending machine",
        "Cafe",
        "Bar",
        "Study area",
        "Charging station",
        "Elevator",
        "Stairs",
        "Printer",
        "Wifi",
        "Locker",
        "Lounge",
        "Cafeteria",
        "Library",
        "Atm",
        "Bicycle rack",
        "Handicap accessible",
        "Parking spot",
        "Post box",
        "Security desk",
        "Trash can",
        "Recycling bin",
        "Coffee machine",
        "Shower",
        "First aid kit",
        "Power outlets",
        "Rest area",
        "Lost and found"
    ];

    const toggleSelection = (item: string) => {
        setSelectedFilters((prevFilters) =>
            prevFilters.includes(item)
                ? prevFilters.filter((filter) => filter !== item)
                : [...prevFilters, item]
        );
    };

    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.fab} onPress={() => setVisible(true)}>
                <MaterialIcons name="filter-list" size={28} color="white" />
            </TouchableOpacity>

            <Modal transparent visible={visible} animationType="fade">
                <TouchableOpacity style={styles.overlay} onPress={() => setVisible(false)} />
                <View style={styles.modalContainer}>
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
                        onPress={() => setVisible(false)}
                    >
                        <Text style={styles.applyButtonText}>Apply</Text>
                    </TouchableOpacity>
                </View>
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 0.5,
        justifyContent: "center",
        alignItems: "center",
    },    
    fab: {
        position: "absolute",
        bottom: 20,
        left: 300,
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
        position: "absolute",
        width: "100%",
        height: "100%",
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
