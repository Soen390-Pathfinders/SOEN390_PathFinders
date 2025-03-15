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
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { DrawerNavigationProp } from "@react-navigation/drawer";
import { RoomAPI } from "@/api/api";
// Define the navigation type for Typescript
type RootDrawerParamList = {
  "(screens)/IndoorMap": {
    roomOrPath: string;
  };
};
type NavigationProp = DrawerNavigationProp<RootDrawerParamList>;

export default function FindRoom() {
  const navigation = useNavigation<NavigationProp>();
  const { theme } = useTheme();
  const globalStyles = getStyles(theme);
  const [searchQuery, setSearchQuery] = useState("");

  {
    /* Function to change the screen and return the backend information on the node*/
  }
  const findTheRoom = async (roomCode) => {
    //Get the node information
    console.log("Finding the room:", roomCode);
    try {
      const roomNode = await RoomAPI.get(roomCode);
      console.log(roomNode);

      //Navigate to the net Screen , pass the argument that will chose the screen to show and which node to focus on
      navigation.navigate("(screens)/IndoorMap", {
        roomOrPath: "room",
      });
    } catch (error) {
      console.error("Failed to fetch room information:", error);
    }
    navigation.navigate("(screens)/IndoorMap", {
      roomOrPath: "room",
    });
  };

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
        {/* Icon to make things interesting TODO: Fix the styling*/}
        <View style={styles.visual}>
          <Image
            source={require("../../assets/images/pin.png")}
            style={styles.visualIcon}
          />
        </View>
        {/* Find a room button */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              console.log("Search Query:", searchQuery);
              findTheRoom(searchQuery);
            }}
          >
            <Text style={styles.buttonText}>Find the room</Text>
          </TouchableOpacity>
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
  visual: {
    width: 250,
    height: 180,
    backgroundColor: "#f0f0f0",
    borderRadius: 10,
    marginTop: 20,
  },
  visualIcon: {
    width: "50%",
    height: "50%",
    color: "rgba(145, 35, 55, 0.99)",
    alignContent: "center",
    justifyContent: "center",
    borderRadius: 10,
  },
  button: {
    backgroundColor: "rgba(145, 35, 55, 0.99)",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    width: "100%",
    alignItems: "center",
    marginTop: 45,
    marginBottom: 30,
  },
  buttonContainer: {
    width: "100%",
    alignItems: "center",
    gap: 15,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});
