import React from "react";
import { useState, useEffect } from "react";
import { View, Text, StyleSheet, Button, TouchableOpacity } from "react-native";
import useTheme from "../hooks/useTheme";
import { getStyles } from "../styles";
import CampusPilotHeader from "../components/ui/CampusPilotHeader";
import { CampusToggle } from "../components/ui/CampusToggle";
import OutdoorPOI_info from "../components/ui/OutdoorPOI_info";
import useFetchGooglePlacesInfo from "../hooks/useFetchGooglePlaceInfo";
import { Ionicons } from "@expo/vector-icons";
import FilterPOI from "../components/ui/FilterPOI";
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
  const [isInfoBoxVisible, setInfoBoxVisibility] = useState(false);

  // Use the hook
  const { place, placeInfo, error, fetchPlaceInfo } = useFetchGooglePlacesInfo({
    placeID: outdoorPlaceID,
  });
  // Show component when place changes
  useEffect(() => {
    if (placeInfo) {
      setInfoBoxVisibility(true);
    }
  }, [placeInfo]);

  // Function to close/hide the component
  const closeInfoBox = () => {
    setInfoBoxVisibility(false);
  };

  return (
    <View style={globalStyles.container}>
      <CampusPilotHeader />
      <CampusToggle campus={campus} toggleCampus={toggleCampus} />

      <View style={globalStyles.mapContainer}>
        <Button
          title="Manually fecth the place"
          onPress={() => {
            //  fetchPlaceDetails(place);//
            fetchPlaceInfo("ChIJKw8YUWoayUwRcBXZvsJ8Zww"); //
          }}
        />
        {isInfoBoxVisible && (
          <View style={styles.infoBoxOverMap}>
            <View style={styles.infoBoxCloseButton}>
              <TouchableOpacity onPress={closeInfoBox}>
                <Ionicons name="close" size={24} color="white" />
              </TouchableOpacity>
            </View>
            <OutdoorPOI_info info={placeInfo} />
          </View>
        )}

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
  infoBoxCloseButton: {
    position: "absolute", // Make sure the box is on top of the map
    top: 15,
    left: 250,
    zIndex: 2,
    margin: 10,
    padding: 5,
    backgroundColor: "rgba(145, 35, 55, 0.99)",
    borderRadius: 50,
  },
});
