//Campus Map Screen
import { StyleSheet, Text, View, TextInput, Image } from "react-native";
import OutdoorMap from "../components/maps/OutdoorMap";
import AppLogo from "../components/ui/AppLogo";
import { ThemeProvider } from "../components/context/ThemeContext";
import ThemeToggle from "../components/ui/ThemeToggle";
import useTheme from "../hooks/useTheme";
import { getStyles } from "../styles";
import CampusPilotHeader from "../components/ui/CampusPilotHeader";

export default function CampusMap() {
  const { theme, toggleTheme } = useTheme(); // Use the custom hook
  const styles = getStyles(theme); // Get styles based on theme

  return (
    <View style={styles.container}>
      {/* Header with logo , title and Dakr/Light theme toggle */}
      <CampusPilotHeader />

      {/*SearchBar
      <View style={styles.searchBar}>
        <TextInput placeholder={"Search"} placeholderTextColor={"#666"} />
      </View>*/}

      {/*Campus Map*/}
      <View style={styles.mapContainer}>
        <OutdoorMap />
      </View>
    </View>
  );
}
