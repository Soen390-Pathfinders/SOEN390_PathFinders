//Campus Map Screen
import { View } from "react-native";
import OutdoorMap from "../components/maps/OutdoorMap";
import useTheme from "../hooks/useTheme";
import { useState } from "react";
import { getStyles } from "../styles";
import CampusPilotHeader from "../components/ui/CampusPilotHeader";
import { CampusToggle } from "../components/ui/CampusToggle";

export default function CampusMap() {
  const { theme, toggleTheme } = useTheme(); // Use the custom hook
  const styles = getStyles(theme); // Get styles based on theme

  const [campus, setCampus] = useState("SGW"); // Default to SGW

  const toggleCampus = (selectedCampus) => {
    setCampus(selectedCampus);
  };
  return (
    <View style={styles.container}>
      {/* Header with logo , title and Dakr/Light theme toggle */}
      <CampusPilotHeader />
      <CampusToggle campus={campus} toggleCampus={toggleCampus} />
      {/*SearchBar
      <View style={styles.searchBar}>
        <TextInput placeholder={"Search"} placeholderTextColor={"#666"} />
      </View>*/}

      {/*Campus Map*/}
      <View style={styles.mapContainer}>
        <OutdoorMap campus={campus} />
      </View>
    </View>
  );
}
