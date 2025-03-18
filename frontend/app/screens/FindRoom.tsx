import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import useTheme from "../../hooks/useTheme";
import { getStyles } from "../styles";
import { Ionicons } from "@expo/vector-icons";

export default function FindRoom() {
  const { theme } = useTheme();
  const globalStyles = getStyles(theme);
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <View style={globalStyles.container}>
      <View style={styles.contentContainer}>
        <Text style={styles.title}>Find a Room</Text>

        {/* Search bar */}
        <View style={styles.searchContainer}>
          <Ionicons
            name="search"
            size={24}
            color="#666"
            style={styles.searchIcon}
          />
          <TextInput
            style={styles.searchInput}
            placeholder="Enter room number (e.g., H-920)"
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholderTextColor="#999"
          />
          {searchQuery.length > 0 && (
            <TouchableOpacity onPress={() => setSearchQuery("")}>
              <Ionicons name="close-circle" size={24} color="#666" />
            </TouchableOpacity>
          )}
        </View>

        {/* Placeholder for map */}
        <View style={styles.mapPlaceholder} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    alignItems: "center",
    width: "100%",
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 30,
    color: "#333",
    textAlign: "center",
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
    borderRadius: 10,
    paddingHorizontal: 15,
    marginBottom: 20,
    width: "100%",
    height: 50,
    borderWidth: 1,
    borderColor: "#ddd",
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    height: 50,
    fontSize: 16,
    color: "#333",
  },
  mapPlaceholder: {
    width: 250,
    height: 180,
    backgroundColor: "#f0f0f0",
    borderRadius: 10,
    marginTop: 20,
  },
});
