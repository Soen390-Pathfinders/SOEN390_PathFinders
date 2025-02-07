//Root layout and
//  top navigation drawer(For the hamburger menu)
import React, { useState, useEffect } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Drawer } from "expo-router/drawer";
import { Image, StyleSheet } from "react-native";
import CustomDrawerContent from "./components/CustomDrawerContent";
import CampusMap from "./OutdoorNav/CampusMap";
import { ThemeProvider } from "./components/context/ThemeContext";
import { getStyles } from "./styles";
import LoadingScreen from "./screens/LoadingScreen";

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
        <Drawer
          screenOptions={{
            drawerLabelStyle: {
              marginLeft: -10,
              padding: 10,
            },
          }}
          drawerContent={CustomDrawerContent}
        >
          <Drawer.Screen
            name="OutdoorNav/CampusMap"
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
            name="index" /*Must be changed to another screen*/
            options={{
              drawerLabel: "Outdoor Directions",
              title: "Outdoor Navigations",
              drawerIcon: () => (
                <Image
                  style={styles.navLogo}
                  source={require("../assets/images/sign-post.png")}
                />
              ),
            }}
          />
          {/*Add the next menu items here when the screen is created
        <Drawer.Screen
          name="nameOfScreen"
          options={{
            drawerLabel: "Directions to next class",
            title: "DirectionClass ",
            drawerIcon: () => (
              <Image
                style={styles.navLogo}
                source={require("../assets/images/class.png")}
              />
            ),
          }}
        />
        Drawer.Screen
          name="nameOfScreen"
          options={{
            drawerLabel: "Indoor Directions",
            title: "Indoor Directions",
            drawerIcon: () => (
              <Image
                style={styles.navLogo}
                source={require("../assets/images/direction.png")}
              />
            ),
          }}
        />
         Drawer.Screen
          name="nameOfScreen"
          options={{
            drawerLabel: "Point of interest",
            title: "Point of interest",
            drawerIcon: () => (
              <Image
                style={styles.navLogo}
                source={require("../assets/images/point-of-interest.png")}
              />
            ),
          }}
        />
         Drawer.Screen
          name="nameOfScreen"
          options={{
            drawerLabel: "Smart Planner",
            title: "Smart planner",
            drawerIcon: () => (
              <Image
                style={styles.navLogo}
                source={require("../assets/images/planner.png")}
              />
            ),
          }}
        />
        */}
        </Drawer>
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
