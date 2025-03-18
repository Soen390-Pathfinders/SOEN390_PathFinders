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

  //Do not reference the placeID with this. The state of the placeID reference is inside the useFetchGooglePlacEInfo hook
  const [outdoorPlaceID, setoutdoorPlaceID] = useState<string | null>(null);

  // Use the hook
  const { place, placeInfo, error, isLoading, fetchPlaceInfo } =
    useFetchGooglePlacesInfo({
      placeID: outdoorPlaceID,
    });

  // print the place info when it changes
  useEffect(() => {
    if (placeInfo) {
      console.log("OutdoorPoint of interest received placeInfo:", placeInfo);
    }
  }, [placeInfo]);
  // print the place info when it changes
  useEffect(() => {
    console.log("placeId :", place);
  }, [place]);

  return (
    <View style={globalStyles.container}>
      <CampusPilotHeader />
      <CampusToggle campus={campus} toggleCampus={toggleCampus} />

      <View style={globalStyles.mapContainer}>
        <Button
          title="Manually fecth the place"
          onPress={() => {
            //  fetchPlaceDetails(place);//
            fetchPlaceInfo("ChIJV6iQyGsayUwR6gbBRRU9FIg"); //
          }}
        />
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
