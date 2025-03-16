import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import { DrawerNavigationProp } from "@react-navigation/drawer";
import useTheme from "../hooks/useTheme";
import { getStyles } from "../styles";

// Define the navigation type
type RootDrawerParamList = {
  "(screens)/FindRoom": undefined;
  "(screens)/NavigateYourSpace": undefined;
};

type NavigationProp = DrawerNavigationProp<RootDrawerParamList>;

export default function IndoorDirections() {
  const navigation = useNavigation<NavigationProp>();
  const { theme } = useTheme();
  const globalStyles = getStyles(theme);

  const navigateToFindRoom = () => {
    navigation.navigate("(screens)/FindRoom");
  };

  const navigateToNavigateYourSpace = () => {
    navigation.navigate("(screens)/NavigateYourSpace");
  };

  return (
    <View style={globalStyles.container}>
      <View style={styles.contentContainer}>
        <Text style={styles.title}>Find Your Way</Text>

        {/* Placeholder for map */}
        <View style={styles.mapPlaceholder}>
          <Image
            source={require("../../assets/images/directions.png")}
            style={{ width: "100%", height: "100%" }}
          />
        </View>

        {/* Navigation buttons */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={navigateToFindRoom}>
            <Text style={styles.buttonText}>Find a room</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.button}
            onPress={navigateToNavigateYourSpace}
          >
            <Text style={styles.buttonText}>Get directions</Text>
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
    justifyContent: "center",
    padding: 20,
    width: "100%",
    marginTop: -60,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#333",
  },
  mapPlaceholder: {
    width: 250,
    height: 180,
    backgroundColor: "#f0f0f0",
    borderRadius: 10,
    marginBottom: 30,
  },
  buttonContainer: {
    width: "100%",
    alignItems: "center",
    gap: 15,
  },
  button: {
    backgroundColor: "rgba(145, 35, 55, 0.99)",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    width: "80%",
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});
