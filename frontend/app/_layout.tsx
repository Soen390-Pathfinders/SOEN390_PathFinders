import "react-native-get-random-values";
import React, { useState, useEffect } from "react";
import { Image, StyleSheet } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";

/* Imports for drawer navigation */
import { createDrawerNavigator } from "@react-navigation/drawer";
import CustomDrawerContent from "./drawer/CustomDrawerContent";
const Drawer = createDrawerNavigator();
import CampusMap from "./screens/CampusMap";
import OutdoorDirections from "./screens/OutdoorDirections";
import ConcordiaShuttle from "./screens/ConcordiaShuttle";

/* Loading screen and theme provider */
import LoadingScreen from "./screens/LoadingScreen";
import { ThemeProvider } from "./components/context/ThemeContext";

/* Imports to handle user location */
import { LocationProvider } from "./components/context/userLocationContext";
import useUserLocation from "./hooks/useUserLocation";
import loginScreem from "./screens/loginScreem";
import NextClassInfo from "./screens/NextClassInfo";

/* 🔹 Firebase Analytics */
import analytics from "@react-native-firebase/analytics";
import { useNavigation } from "@react-navigation/native";

export default function RootLayout() {
  const [isLoading, setIsLoading] = useState(true);
  const navigation = useNavigation(); // Needed for tracking screen changes

  /* ✅ Track app opened event */
  useEffect(() => {
    analytics().logEvent("app_opened"); 
  }, []);

  /* ✅ Track screen views */
  useEffect(() => {
    const unsubscribe = navigation.addListener("state", async () => {
      const currentRoute = navigation.getCurrentRoute();
      if (currentRoute) {
        await analytics().logEvent("screen_view", {
          screen_name: currentRoute.name,
        });
      }
    });

    return unsubscribe;
  }, [navigation]);

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
      {/* Current user Location context provider */}
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
                title: "Concordia Shuttle",
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
