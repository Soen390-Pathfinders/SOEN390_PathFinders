import React from "react";
import { useState, useEffect } from "react";
import { View, Text, StyleSheet, Button } from "react-native";
import useTheme from "../hooks/useTheme";
import { getStyles } from "../styles";
import CampusPilotHeader from "../components/ui/CampusPilotHeader";
import { CampusToggle } from "../components/ui/CampusToggle";
import OutdoorPOI_info from "../components/ui/OutdoorPOI_info";
import useFetchGooglePlacesInfo from "../hooks/useFetchGooglePlaceInfo";
import MapView, {
  Marker,
  PROVIDER_DEFAULT,
  PROVIDER_GOOGLE,
} from "react-native-maps";

export default function OutdoorPointsOfInterests() {
  const { theme } = useTheme();
  const globalStyles = getStyles(theme);
  const [campus, setCampus] = useState("SGW"); // Default to SGW

  const toggleCampus = (selectedCampus) => {
    setCampus(selectedCampus);
  };
  //Campus coordinates for the toggle
  const campusCoordinates = {
    LOY: {
      latitude: 45.45823278377158,
      longitude: -73.63915536118513,
      latitudeDelta: 0.01,
      longitudeDelta: 0.01,
      title: "Loyola Campus",
      description: "Concordia University Loyola Campus",
    },
    SGW: {
      latitude: 45.4972030019821,
      longitude: -73.57852620369705,
      latitudeDelta: 0.01,
      longitudeDelta: 0.01,
      title: "SGW Campus",
      description: "Concordia University SGW Campus",
    },
  };

  const [outdoorplaceID, setoutdoorPlaceID] = useState(null); //TODO : make this placEID dynamic when received from the search
  // This get the place information whenever the place is changed
  useEffect(() => {
    // Skip the initial render
    if (outdoorplaceID !== "") {
      console.log("place changed to:", outdoorplaceID);
      // Perform any side effects when text changes
    }
  }, [outdoorplaceID]); // Add inputText as a dependency

  //Use the useFetchGooglePlace hook to get google place information from placEID
  // Use our hook with the placeId parameter

  const { place, placeInfo, error } = useFetchGooglePlacesInfo({
    placeID: outdoorplaceID, // Pass the placeId directly to the hook
  });
  console.log(placeInfo);

  return (
    <View style={globalStyles.container}>
      <CampusPilotHeader />
      <CampusToggle campus={campus} toggleCampus={toggleCampus} />

      <View style={globalStyles.mapContainer}>
        <Button onPress={(placeID = "ChIJV6iQyGsayUwR6gbBRRU9FIg")} />
        <View style={styles.infoBoxOverMap}>
          <OutdoorPOI_info />
        </View>

        <MapView
          showsUserLocation={true}
          provider={PROVIDER_DEFAULT}
          style={{ flex: 1 }}
          initialRegion={campusCoordinates[campus]}
          region={campusCoordinates[campus]}
        ></MapView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  infoBoxOverMap: {
    position: "absolute", // Make sure the box is on top of the map
    top: 100,
    left: 20,
    zIndex: 1,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
});
