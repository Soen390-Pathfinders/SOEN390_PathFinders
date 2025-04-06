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
import { RoomAPI } from "@/api/api";
import useRoomCodeValidation from "../hooks/useRoomCodeValidation";
import { DrawerParamList } from "../_layout";
import { DrawerNavigationProp } from "@react-navigation/drawer";

// Function to validate code room*/
export const helpervalideRoomCode = (validateRoomCode, roomCode) => {
  const validationResult = validateRoomCode(roomCode);
  //return a boolean isValid and a string contaiing the error message
  return validationResult;
};

//fetch the room node information using the API
export const getRoomInfo = async (roomCode) => {
  try {
    const nodeInfo = await RoomAPI.get(roomCode);
    return nodeInfo;
  } catch (error) {
    console.error("Failed to fetch room information:", error);
  }
};

//navigate to the indoor map screen
export const helperNavigateToIndoorMap = (navigation, nodeInfo) => {
  (navigation.navigate as any)("(screens)/IndoorMap", {
    path: null,
    nodeInfo: nodeInfo,
    roomOrPath: "room",
  });
};

export default function FindRoom({ navigation: navFromProps }) {
  const { theme } = useTheme();
  const globalStyles = getStyles(theme);
  const [searchQuery, setSearchQuery] = useState(""); //state of the search query
  //const navigation = useNavigation<DrawerNavigationProp<DrawerParamList>>();
  const { validateRoomCode } = useRoomCodeValidation(); // hook to validate the code
  const navigation = navFromProps || useNavigation();

  {
    /* Function to change the screen and return the backend information on the node*/
  }
  const findTheRoom = async (roomCode) => {
    //validate the room code format
    const validationResult = helpervalideRoomCode(validateRoomCode, roomCode);

    //Alert the user if the room code is invalid
    if (!validationResult.isValid) {
      alert(validationResult.errorMessage);
      return;
    }

    //Get the node information
    const nodeInfo = await getRoomInfo(roomCode);

    //Alert user if room is not found
    if (nodeInfo === undefined) {
      alert("Room not found. Please check the room number and try again.");
      return;
    }
    //navigate to indoor map

    helperNavigateToIndoorMap(navigation, nodeInfo);
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
        {/* Image at the center of the screen*/}
        <View style={styles.visual}>
          <Image
            source={require("../../assets/images/search.png")}
            style={{ width: "100%", height: "100%" }}
          />
        </View>
        {/* Find a room button */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
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
