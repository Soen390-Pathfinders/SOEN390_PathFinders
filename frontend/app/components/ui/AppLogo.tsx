//App logo component
//Renders the Campus Pilot logo
import { View, Image, StyleSheet } from "react-native";
import useTheme from "../../hooks/useTheme";

export default function AppLogo() {
  const { theme, toggleTheme } = useTheme(); // Use the custom hook
  return (
    <View>
      <Image
        style={styles.logo}
        source={require("../../../assets/images/logo.png")}
        tintColor={theme === "dark" ? "#000" : "#fff"} // Invert the color based on theme
      />
    </View>
  );
}
const styles = StyleSheet.create({
  logo: {
    width: 50,
    height: 50,
  },
});
