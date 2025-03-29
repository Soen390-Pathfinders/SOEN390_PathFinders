import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
} from "react-native";
import React, { useState } from "react";
import useTheme from "../hooks/useTheme";
import { getStyles } from "../styles";
import { MaterialIcons } from "@expo/vector-icons";
import { PathAPI } from "@/api/api";
import { useNavigation } from "expo-router";
import { DrawerNavigationProp } from "@react-navigation/drawer";
import { DrawerParamList } from "../_layout";

export default function NavigateYourSpace() {
  const navigation = useNavigation<DrawerNavigationProp<DrawerParamList>>();
  const { theme } = useTheme();
  const globalStyles = getStyles(theme);
  const [startLocation, setStartLocation] = useState("");
  const [destination, setDestination] = useState("");
  const handleGetDirection = () => {
    PathAPI.shortestPathToRoom(startLocation, destination).then((response) => {
      navigation.navigate("(screens)/IndoorMap", {
        path: response,
        nodeInfo: null,
        roomOrPath: "path",
      });
    });
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

        {/* Destination input */}
        <View style={styles.inputContainer}>
          <MaterialIcons
            name="location-on"
            size={24}
            color="rgba(145, 35, 55, 0.99)"
          />
          <TextInput
            style={styles.input}
            placeholder="Destination (e.g., H-945)"
            value={destination}
            onChangeText={setDestination}
            placeholderTextColor="#999"
          />
        </View>
        <View>
          {/* Get directions button */}
          <TouchableOpacity style={styles.button} onPress={handleGetDirection}>
            <Text style={styles.buttonText}>Get directions</Text>
          </TouchableOpacity>
        </View>

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
});
