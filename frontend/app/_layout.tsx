//Root layout and
//  top navigation drawer(For the hamburger menu)
import 'react-native-get-random-values';
import React, { useState, useEffect } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { NavigationContainer } from "@react-navigation/native";
import CustomDrawerContent from "./drawer/CustomDrawerContent";
import { Image, StyleSheet } from "react-native";
const Drawer = createDrawerNavigator();
import LoadingScreen from "./screens/LoadingScreen";
import { ThemeProvider } from "./components/context/ThemeContext";
import CampusMap from "./screens/CampusMap";
import OutdoorDirections from "./screens/OutdoorDirections";

export default function RootLayout() {
  /* const styles = getStyles(theme); // Get styles based on theme*/ //TODO: Change the theme color for the drawer
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 4000);
  }, []);

  if (isLoading) {
    return <LoadingScreen onFinish={() => setIsLoading(false)} />;
  }

  return (
    <ThemeProvider>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <Drawer.Navigator
          screenOptions={{
            drawerLabelStyle: {
              marginLeft: -10,
              padding: 10,
            },
          }}
          drawerContent={CustomDrawerContent}
        >
          <Drawer.Screen
            name="(screens)/CampusMap"
            component={CampusMap}
            options={{
              drawerLabel: "Campus Map",
              title: "Campus Map",
              drawerIcon: () => (
                <Image
                  style={styles.navLogo}
                  source={require("../assets/images/map.png")}
                />
              ),
            }}
          />
          <Drawer.Screen
            name="index" 
            component={OutdoorDirections}
            options={{
              drawerLabel: "Outdoor Directions",
              title: "Outdoor Directions",
              drawerIcon: () => (
                <Image
                  style={styles.navLogo}
                  source={require("../assets/images/sign-post.png")}
                />
              ),
            }}
          />
        </Drawer.Navigator>
      </GestureHandlerRootView>
    </ThemeProvider>
  );
}
const styles = StyleSheet.create({
  navLogo: {
    width: 40,
    height: 40,
  },
});
