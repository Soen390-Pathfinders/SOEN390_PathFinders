import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
  FlatList,
} from "react-native";
import React, { useState } from "react";
import useTheme from "../hooks/useTheme";
import { getStyles } from "../styles";
import { MaterialIcons } from "@expo/vector-icons";
import { PathAPI } from "@/api/api";
import { useNavigation } from "expo-router";
import { DrawerNavigationProp } from "@react-navigation/drawer";
import { DrawerParamList } from "../_layout";
import { amenityTypes, amenityDisplayNames } from "../data/amenityData";
import ToggleAccessibility from "../components/ui/AccessibilityPathToggle";

export default function NavigateYourSpace() {
  const navigation = useNavigation<DrawerNavigationProp<DrawerParamList>>();
  const { theme } = useTheme();
  const globalStyles = getStyles(theme);
  const [startLocation, setStartLocation] = useState("");
  const [destination, setDestination] = useState("");
  const [showAmenitySuggestions, setShowAmenitySuggestions] = useState(false);
  const [filteredAmenities, setFilteredAmenities] = useState([]);
  const [accessibilityNeed, setAccessibilityNeed] = useState<boolean>(false);

  const isAmenity = (input) => {
    const normalizedInput = input.trim().toLowerCase();

    // Check if input matches a raw amenity type code
    if (
      amenityTypes.some((amenity) => amenity.toLowerCase() === normalizedInput)
    ) {
      return true;
    }

    // Check if input matches any display name
    const matchesDisplayName = Object.entries(amenityDisplayNames).some(
      ([code, displayName]) => displayName.toLowerCase() === normalizedInput
    );

    return matchesDisplayName;
  };

  const filterAmenities = (text) => {
    setDestination(text);

    if (text.length > 1) {
      const filtered = amenityTypes.filter((amenity) =>
        amenityDisplayNames[amenity].toLowerCase().includes(text.toLowerCase())
      );
      setFilteredAmenities(filtered);
      setShowAmenitySuggestions(filtered.length > 0);
    } else {
      setShowAmenitySuggestions(false);
    }
  };

  const selectAmenity = (amenity) => {
    setDestination(amenityDisplayNames[amenity]);
    setShowAmenitySuggestions(false);
  };

  const handleGetDirection = () => {
    console.log(accessibilityNeed);
    if (!startLocation) {
      alert("Please enter a start location");
      return;
    }

    if (!destination) {
      alert("Please enter a destination");
      return;
    }

    if (isAmenity(destination)) {
      // Find the correct amenity code regardless of input format
      let amenityCode = destination.trim().toUpperCase();

      // If the input is a display name, convert it to the code
      const matchingAmenityEntry = Object.entries(amenityDisplayNames).find(
        ([code, displayName]) =>
          displayName.toLowerCase() === destination.trim().toLowerCase()
      );

      if (matchingAmenityEntry) {
        amenityCode = matchingAmenityEntry[0]; // Use the code (WATER_FOUNTAIN), not the display name
      }

      PathAPI.shortestPathToAmenity(
        startLocation,
        amenityCode,
        accessibilityNeed
      )
        .then((response) => {
          navigation.navigate("(screens)/IndoorMap", {
            path: response,
            nodeInfo: null,
            roomOrPath: "path",
          });
        })
        .catch((error) => {
          alert(`Error finding path to ${destination}: ${error.message}`);
        });
    } else {
      PathAPI.shortestPathToRoom(startLocation, destination, accessibilityNeed)
        .then((response) => {
          navigation.navigate("(screens)/IndoorMap", {
            path: response,
            nodeInfo: null,
            roomOrPath: "path",
          });
        })
        .catch((error) => {
          console.error("Full error object:", error);
          alert(`Error finding path to ${destination}: ${error.message}`);
        });
    }
  };

  return (
    <View style={globalStyles.container}>
      <View style={styles.contentContainer}>
        <Text style={styles.title}>Navigate Your Space</Text>

        {/* Start location input */}
        <View style={styles.inputContainer}>
          <MaterialIcons
            name="my-location"
            size={24}
            color="rgba(145, 35, 55, 0.99)"
          />
          <TextInput
            style={styles.input}
            placeholder="Start location (e.g., H-920)"
            value={startLocation}
            onChangeText={setStartLocation}
            placeholderTextColor="#999"
          />
        </View>

        {/* Destination input with suggestions */}
        <View style={styles.destinationContainer}>
          <View style={styles.inputContainer}>
            <MaterialIcons
              name="location-on"
              size={24}
              color="rgba(145, 35, 55, 0.99)"
            />
            <TextInput
              style={styles.input}
              placeholder="Destination (room or amenity)"
              value={destination}
              onChangeText={filterAmenities}
              placeholderTextColor="#999"
            />
          </View>

          {/* Amenity suggestions */}
          {showAmenitySuggestions && (
            <View style={styles.suggestionsContainer}>
              <FlatList
                data={filteredAmenities}
                keyExtractor={(item) => item}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    style={styles.suggestionItem}
                    onPress={() => selectAmenity(item)}
                  >
                    <Text style={styles.suggestionText}>
                      {amenityDisplayNames[item]}
                    </Text>
                  </TouchableOpacity>
                )}
                style={styles.suggestionsList}
              />
            </View>
          )}
        </View>
        {/* Accessibility toggle */}
        <ToggleAccessibility
          accessibilityNeed={accessibilityNeed}
          setAccessibilityNeed={setAccessibilityNeed}
        />
        {/* Get directions button */}
        <TouchableOpacity style={styles.button} onPress={handleGetDirection}>
          <Text style={styles.buttonText}>Get directions</Text>
        </TouchableOpacity>

        {/* Image at the center of the screen*/}
        <View style={styles.visual}>
          <Image
            source={require("../../assets/images/navigation.png")}
            style={{ width: "100%", height: "100%" }}
          />
        </View>
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
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
    borderRadius: 10,
    paddingHorizontal: 15,
    marginBottom: 15,
    width: "100%",
    height: 50,
    borderWidth: 1,
    borderColor: "#ddd",
  },
  input: {
    flex: 1,
    height: 50,
    fontSize: 16,
    marginLeft: 10,
    color: "#333",
  },
  button: {
    backgroundColor: "rgba(145, 35, 55, 0.99)",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    width: "100%",
    alignItems: "center",
    marginTop: 15,
    marginBottom: 30,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  visual: {
    width: 250,
    height: 180,
    backgroundColor: "#f0f0f0",
    borderRadius: 10,
    marginTop: 20,
  },
  destinationContainer: {
    width: "100%",
    position: "relative",
    zIndex: 10,
  },
  suggestionsContainer: {
    position: "absolute",
    top: 52,
    left: 0,
    right: 0,
    backgroundColor: "white",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#ddd",
    maxHeight: 150,
    zIndex: 20,
  },
  suggestionsList: {
    width: "100%",
  },
  suggestionItem: {
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  suggestionText: {
    fontSize: 14,
    color: "#333",
  },
});
