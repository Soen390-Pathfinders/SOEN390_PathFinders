//Campus Map Screen
import { StyleSheet, Text, View, TextInput, Image } from "react-native";

import OutdoorMap from "../components/maps/OutdoorMap";
import { StatusBar } from "expo-status-bar";
import AppLogo from "../components/ui/AppLogo";
import { ThemeProvider } from "../components/context/ThemeContext";
import ThemeToggle from "../components/ui/ThemeToggle";
import useTheme from "../hooks/useTheme";
import { getStyles } from "../styles";

export default function CampusMap() {
  const { theme, toggleTheme } = useTheme(); // Use the custom hook
  const styles = getStyles(theme); // Get styles based on theme

  return (
    <View style={styles.container}>
      {/* Adding the status bar on top of the screen */}
      <View>
        <StatusBar style="dark" />
      </View>
      <View style={styles.iconRow}>
        <View style={styles.iconRowView}>
          <AppLogo />
        </View>
        <View>
          <Text style={(styles.iconRowView, styles.logo)}>Campus Pilot</Text>
        </View>
        {/*Dark/light theme toggle*/}
        <ThemeToggle />
      </View>

      {/*SearchBar*/}
      <View style={styles.searchBar}>
        <TextInput placeholder={"Search"} placeholderTextColor={"#666"} />
      </View>
      {/*Campus Map*/}
      <View style={styles.mapContainer}>
        <OutdoorMap />
      </View>
    </View>
  );
}
{
  /*Styles for the views*/
}
