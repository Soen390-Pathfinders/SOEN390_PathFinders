import React from "react";
import { useState, useEffect, useMemo } from "react";
import { View, Text, StyleSheet, Button, TouchableOpacity } from "react-native";
import useTheme from "../hooks/useTheme";
import { getStyles } from "../styles";
import CampusPilotHeader from "../components/ui/CampusPilotHeader";
import { CampusToggle } from "../components/ui/CampusToggle";
import OutdoorPOI_info from "../components/ui/OutdoorPOI_info";
import useFetchGooglePlacesInfo from "../hooks/useFetchGooglePlaceInfo";
import { GOOGLE_MAPS_APIKEY } from "../constants";
import { Ionicons } from "@expo/vector-icons";
import FilterPOI from "../components/ui/FilterPOI";
import MapView, {
  Marker,
  PROVIDER_DEFAULT,
  PROVIDER_GOOGLE,
} from "react-native-maps";
import MapViewDirections from "react-native-maps-directions";
import RadiusSlider from "../components/ui/RadiusButton";
import useUserLocation from "../hooks/useUserLocation";

export default function OutdoorPointsOfInterests() {
  const mapRef = React.useRef(null);
  const { theme } = useTheme();
  const globalStyles = getStyles(theme);
  const [campus, setCampus] = useState("SGW"); // Default to SGW
  const [activeFilter, setActiveFilter] = useState(null);
  const [searchRadius, setSearchRadius] = useState(1000); // Default to 1km
  const { userLocation, setLocation } = useUserLocation(); // to set the poi around the puser
  const [distance, setDistance] = useState(null);
  const [destination, setDestination] = useState(null);

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
  const {
    place,
    placeInfo,
    error,
    fetchPlaceInfo,
    filteredPlaces,
    fetchPlacesByCategories,
  } = useFetchGooglePlacesInfo({ placeID: outdoorPlaceID, searchRadius });
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
  const handleFilterPress = (filters) => {
    setActiveFilter(filters);
    // Call the new function from our hook to fetch places by category
    fetchPlacesByCategories(filters, userLocation); // set to user location
    // fetchPlacesByCategories(filters, campusCoordinates[campus]);
  };
  const handleMarkerPress = (placeId) => {
    setoutdoorPlaceID(placeId);
    //API call will be made automatically from the hook
  };

  const handleRadiusChange = (radius: number) => {
    setSearchRadius(radius);
    if (activeFilter) {
      //  fetchPlacesByCategories(activeFilter, campusCoordinates[campus]);
      fetchPlacesByCategories(activeFilter, userLocation);
    }
  };

  const handleDirectionPress = (place) => {
    console.log("Setting the direciton to go to", place);
    closeInfoBox();
    setDestination(place);
  };
  const resetDestination = () => {
    setDestination(null);
  };

  return (
    <View style={globalStyles.container}>
      <CampusPilotHeader />
      <CampusToggle campus={campus} toggleCampus={toggleCampus} />

      <View style={globalStyles.mapContainer}>
        {isInfoBoxVisible && (
          <View style={styles.infoBoxOverMap}>
            <View style={styles.infoBoxCloseButton}>
              <TouchableOpacity onPress={closeInfoBox}>
                <Ionicons name="close" size={24} color="white" />
              </TouchableOpacity>
            </View>
            <OutdoorPOI_info
              info={placeInfo}
              onDirectionPress={handleDirectionPress}
              placeId={place}
            />
          </View>
        )}
        <RadiusSlider
          onRadiusChange={handleRadiusChange} // Real-time updates
        />

        <MapView
          ref={mapRef}
          showsUserLocation={true}
          provider={PROVIDER_DEFAULT}
          style={{ flex: 1 }}
          initialRegion={campusCoordinates[campus]}
          region={campusCoordinates[campus]}
        >
          {filteredPlaces.map((place, index) => (
            <Marker
              key={place.place_id || index}
              coordinate={{
                latitude: place.geometry.location.lat,
                longitude: place.geometry.location.lng,
              }}
              title={place.name}
              description={place.filter}
              onPress={() => handleMarkerPress(place.place_id)}
            />
          ))}

          {userLocation && destination && (
            <MapViewDirections
              origin={userLocation}
              destination={`place_id:${destination}`}
              apikey={GOOGLE_MAPS_APIKEY}
              mode={"WALKING"}
              strokeWidth={7}
              strokeColor="blue"
              onError={(errorMessage) => {
                console.log("Directions error: ", errorMessage);
              }}
            />
          )}
        </MapView>
        <View style={styles.buttonsOverMap}>
          <FilterPOI onFilterPress={handleFilterPress} />
          {destination && (
            <View style={styles.resetDestinationButton}>
              <TouchableOpacity onPress={resetDestination}>
                <Text style={{ color: "#FFFFFF" }}>Reset Destination</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
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
    right: 10,
    zIndex: 2,
    margin: 10,
    padding: 5,
    backgroundColor: "rgba(145, 35, 55, 0.99)",
    borderRadius: 50,
  },
  buttonsOverMap: {
    position: "absolute", // Make sure the button is on top of the map
    bottom: 20,
    left: 20,
    zIndex: 2,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    margin: 10,
    padding: 5,
    borderRadius: 50,
  },
  resetDestinationButton: {
    backgroundColor: "#0072a8",
    padding: 10,
    color: "white",
    borderRadius: 10,
  },
});
