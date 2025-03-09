//Root layout and
//  top navigation drawer(For the hamburger menu)
import "react-native-get-random-values";
import React, { useState, useEffect } from "react";
import { Image, StyleSheet } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
/*Imports for drawer navigation*/
import { createDrawerNavigator } from "@react-navigation/drawer";
import CustomDrawerContent from "./drawer/CustomDrawerContent";
const Drawer = createDrawerNavigator();
import CampusMap from "./screens/CampusMap";
import OutdoorDirections from "./screens/OutdoorDirections";
import ConcordiaShuttle from "./screens/ConcordiaShuttle";
/*Loading screen and theme provider*/
import LoadingScreen from "./screens/LoadingScreen";
import { ThemeProvider } from "./components/context/ThemeContext"; // for dark/light view
/*Imports to handle user location*/
import { LocationProvider } from "./components/context/userLocationContext"; //for the current user's location
import useUserLocation from "./hooks/useUserLocation";
import loginScreem from "./screens/loginScreem";
import NextClassInfo from "./screens/NextClassInfo";
import IndoorDirections from "./screens/IndoorDirections";
import IndoorMap from "./screens/IndoorMap";
import FindRoom from "./screens/FindRoom";
import NavigateYourSpace from "./screens/NavigateYourSpace";

export default function RootLayout() {
  /* const styles = getStyles(theme); // Get styles based on theme*/ //TODO: Change the theme color for the drawer
  const [isLoading, setIsLoading] = useState(true);

  /*Loading screen logic*/ //TODO : Can this logic be moved to custom hook ?
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
      {/* Current user Location context provider and fetching the user Location */}
      <FetchUserLocation />
      <ThemeProvider>
        {/* Dark/Light Theme context provider */}
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
              name="(screens)/IndoorMap"
              component={IndoorMap}
              options={{
                drawerLabel: "Dev Indoor Map",
                title: "IndoorMap",
                drawerIcon: () => (
                  <Image
                    style={styles.navLogo}
                    source={require("../assets/images/map.png")}
                  />
                ),
              }}
            />
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
            <Drawer.Screen
              name="(screens)/IndoorDirections"
              component={IndoorDirections}
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
            <Drawer.Screen
              name="(screens)/FindRoom"
              component={FindRoom}
              options={{
                drawerItemStyle: { height: 0 }, // This hides it from the drawer
                title: "Find Room",
              }}
            />

            <Drawer.Screen
              name="(screens)/NavigateYourSpace"
              component={NavigateYourSpace}
              options={{
                drawerItemStyle: { height: 0 }, // This hides it from the drawer
                title: "Navigate Your Space",
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
