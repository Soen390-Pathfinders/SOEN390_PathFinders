import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
} from "react-native";
import React, { useMemo, useState } from "react";
import useTheme from "../hooks/useTheme";
import { getStyles } from "../styles";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { RoomAPI } from "@/api/api";
import useRoomCodeValidation from "../hooks/useRoomCodeValidation";
import { DrawerParamList } from "../_layout";
import { DrawerNavigationProp } from "@react-navigation/drawer";

// Types
type FindRoomProps = {
  navigation?: DrawerNavigationProp<DrawerParamList>;
};

//  Helper: validate room code
export const helpervalideRoomCode = (validateRoomCode, roomCode) => {
  return validateRoomCode(roomCode);
};

//  Helper: get room info from API
export const getRoomInfo = async (roomCode) => {
  try {
    return await RoomAPI.get(roomCode);
  } catch (error) {
    console.error("Failed to fetch room information:", error);
  }
};

//  Helper: navigate to IndoorMap screen
export const helperNavigateToIndoorMap = (
  navigation: DrawerNavigationProp<DrawerParamList>,
  nodeInfo: any
) => {
  (navigation.navigate as any)("(screens)/IndoorMap", {
    path: null,
    nodeInfo,
    roomOrPath: "room",
  });
};

export default function FindRoom({ navigation: navFromProps }: FindRoomProps) {
  const fallbackNavigation = useNavigation<DrawerNavigationProp<DrawerParamList>>();

  //  Always call useNavigation at top level — no conditional hooks
  const navigation = useMemo(
    () => navFromProps ?? fallbackNavigation,
    [navFromProps, fallbackNavigation]
  );

  const { theme } = useTheme();
  const globalStyles = getStyles(theme);
  const [searchQuery, setSearchQuery] = useState("");
  const { validateRoomCode } = useRoomCodeValidation();

  const findTheRoom = async (roomCode) => {
    const validationResult = helpervalideRoomCode(validateRoomCode, roomCode);

    if (!validationResult.isValid) {
      alert(validationResult.errorMessage);
      return;
    }

    const nodeInfo = await getRoomInfo(roomCode);
    if (!nodeInfo) {
      alert("Room not found. Please check the room number and try again.");
      return;
    }

    helperNavigateToIndoorMap(navigation, nodeInfo);
  };

  return (
    <View style={globalStyles.container}>
      <View style={styles.contentContainer}>
        <Text style={styles.title}>Find a Room</Text>

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

        <View style={styles.visual}>
          <Image
            source={require("../../assets/images/search.png")}
            style={{ width: "100%", height: "100%" }}
          />
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => findTheRoom(searchQuery)}
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
