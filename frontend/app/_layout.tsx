// Root layout and top navigation drawer (For the hamburger menu)
import "react-native-get-random-values";
import React, { useState, useEffect } from "react";
import { Image, StyleSheet, Platform } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { createDrawerNavigator } from "@react-navigation/drawer";
import CustomDrawerContent from "./drawer/CustomDrawerContent";
import CampusMap from "./screens/CampusMap";
import OutdoorDirections from "./screens/OutdoorDirections";
import ConcordiaShuttle from "./screens/ConcordiaShuttle";
import LoadingScreen from "./screens/LoadingScreen";
import { ThemeProvider } from "./components/context/ThemeContext";
import { LocationProvider } from "./components/context/userLocationContext";
import useUserLocation from "./hooks/useUserLocation";
import loginScreem from "./screens/loginScreem";
import NextClassInfo from "./screens/NextClassInfo";

//  Import LogRocket conditionally based on platform
let LogRocket;
if (Platform.OS === "web") {
  LogRocket = require("logrocket").default;
} else {
  try {
    LogRocket = require("@logrocket/react-native").default;
  } catch (error) {
    console.warn(
      "LogRocket React Native SDK failed to load, using web SDK instead."
    );
    LogRocket = require("logrocket").default;
  }
}

//  Initialize LogRocket
if (LogRocket) {
  LogRocket.init("iojfbz/pathfinders"); // Replace with your actual LogRocket App ID
}

// Function to Identify Users in LogRocket
function identifyUser(user) {
  if (!user) return;

  LogRocket.identify(user.id, {
    name: user.name,
    email: user.email,
    subscriptionType: user.subscriptionType, // Example: custom metadata
  });
}

export default function RootLayout() {
  const [isLoading, setIsLoading] = useState(true);
  const Drawer = createDrawerNavigator();
  // //  Example User Data (Replace with real authentication logic)
  const user = {
    id: "user_12345",
    name: "James Morrison",
    email: "jamesmorrison@example.com",
    subscriptionType: "test", // Custom metadata
  };

  // Identify the user in LogRocket when the app loads
  useEffect(() => {
    identifyUser(user);
  }, []);

  /* Loading screen logic */
  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 4000);
  }, []);

  if (isLoading) {
    return <LoadingScreen onFinish={() => setIsLoading(false)} />;
  }

  return (
    <LocationProvider>
      <FetchUserLocation />
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
            <Drawer.Screen
              name="(screens)/NextClassInfo"
              component={NextClassInfo}
              options={{
                drawerLabel: "NextClassInfo",
                title: "NextClassInfo drawer for dev",
                drawerIcon: () => (
                  <Image
                    style={styles.navLogo}
                    source={require("../assets/images/class.png")}
                  />
                ),
              }}
            />
            <Drawer.Screen
              name="(screens)/loginScreen"
              component={loginScreem}
              options={{
                drawerLabel: "Directions to next class",
                title: "direction to next class",
                drawerIcon: () => (
                  <Image
                    style={styles.navLogo}
                    source={require("../assets/images/class.png")}
                  />
                ),
              }}
            />
            <Drawer.Screen
              name="(screens)/ConcordiaShuttle"
              component={ConcordiaShuttle}
              options={{
                drawerLabel: "Concordia Shuttle",
                title: "concordia Shuttle",
                drawerIcon: () => (
                  <Image
                    style={styles.navLogo}
                    source={require("../assets/images/bus.png")}
                  />
                ),
              }}
            />
          </Drawer.Navigator>
        </GestureHandlerRootView>
      </ThemeProvider>
    </LocationProvider>
  );
}

function FetchUserLocation() {
  useUserLocation();
  return null;
}

const styles = StyleSheet.create({
  navLogo: {
    width: 40,
    height: 40,
  },
});
