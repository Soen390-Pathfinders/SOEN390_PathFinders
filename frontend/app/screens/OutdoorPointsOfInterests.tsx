import React, { useState, useEffect } from "react";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import useTheme from "../hooks/useTheme";
import { getStyles } from "../styles";
import CampusPilotHeader from "../components/ui/CampusPilotHeader";
import { CampusToggle } from "../components/ui/CampusToggle";
import OutdoorPOI_info from "../components/ui/OutdoorPOI_info";
import useFetchGooglePlacesInfo from "../hooks/useFetchGooglePlaceInfo";
import { Ionicons } from "@expo/vector-icons";
import FilterPOI from "../components/ui/FilterPOI";
import MapView, { Marker, PROVIDER_DEFAULT } from "react-native-maps";
import RadiusSlider from "../components/ui/RadiusButton";

export default function OutdoorPointsOfInterests() {
  const { theme } = useTheme();
  const globalStyles = getStyles(theme);

  const [campus, setCampus] = useState("SGW");
  const [activeFilter, setActiveFilter] = useState([]);
  const [ratingRange, setRatingRange] = useState<[number, number] | null>(null);
  const [searchRadius, setSearchRadius] = useState(1000);
  const [outdoorPlaceID, setoutdoorPlaceID] = useState<string | null>(null);
  const [isInfoBoxVisible, setInfoBoxVisibility] = useState(false);

  const campusCoordinates = {
    LOY: {
      latitude: 45.4582,
      longitude: -73.6391,
      latitudeDelta: 0.01,
      longitudeDelta: 0.01,
    },
    SGW: {
      latitude: 45.4972,
      longitude: -73.5785,
      latitudeDelta: 0.01,
      longitudeDelta: 0.01,
    },
  };

  const {
    place,
    placeInfo,
    fetchPlaceInfo,
    filteredPlaces,
    fetchPlacesByCategories,
  } = useFetchGooglePlacesInfo({ placeID: outdoorPlaceID, searchRadius });

  // Show info box when details are fetched
  useEffect(() => {
    if (placeInfo) setInfoBoxVisibility(true);
  }, [placeInfo]);

  // Initial fetch
  useEffect(() => {
    fetchPlacesByCategories([], campusCoordinates[campus]);
  }, []);

  // Re-fetch when campus or radius changes with no filters
  useEffect(() => {
    if (activeFilter.length === 0) {
      fetchPlacesByCategories([], campusCoordinates[campus]);
    }
  }, [campus, searchRadius]);

  const handleFilterPress = (filters, ratingRange) => {
    setActiveFilter(filters);
    setRatingRange(ratingRange);
    fetchPlacesByCategories(filters, campusCoordinates[campus]);
  };

  const handleMarkerPress = (placeId) => {
    setoutdoorPlaceID(placeId);
    fetchPlaceInfo(placeId);
  };

  const handleRadiusChange = (radius: number) => {
    setSearchRadius(radius);
    fetchPlacesByCategories(activeFilter, campusCoordinates[campus]);
  };

  const closeInfoBox = () => setInfoBoxVisibility(false);

  // CRASH PROOF MARKER FILTER
  const safeMarkers = (
    filteredPlaces || []
  )
    .filter((place) => {
      const loc = place?.geometry?.location;
      const rating = place?.rating ?? 0;

      const hasCoords =
        loc &&
        typeof loc.lat === "number" &&
        typeof loc.lng === "number";

      const matchesRating =
        !ratingRange || (rating >= ratingRange[0] && rating <= ratingRange[1]);

      return hasCoords && matchesRating;
    })
    // Remove duplicates (by place_id)
    .filter(
      (place, index, self) =>
        index === self.findIndex((p) => p.place_id === place.place_id)
    );

  return (
    <View style={globalStyles.container}>
      <CampusPilotHeader />
      <CampusToggle campus={campus} toggleCampus={setCampus} />

      <View style={globalStyles.mapContainer}>
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

        <RadiusSlider onRadiusChange={handleRadiusChange} />

        <MapView
          showsUserLocation
          provider={PROVIDER_DEFAULT}
          style={{ flex: 1 }}
          initialRegion={campusCoordinates[campus]}
          region={campusCoordinates[campus]}
        >
          {safeMarkers.map((place) => (
            <Marker
              key={place.place_id}
              coordinate={{
                latitude: place.geometry.location.lat,
                longitude: place.geometry.location.lng,
              }}
              title={place.name}
              description={place.filter}
              onPress={() => handleMarkerPress(place.place_id)}
            />
          ))}
        </MapView>

        <FilterPOI onFilterPress={handleFilterPress} />
      </View>
    </View>
  );
}
//sstyle for the info box
const styles = StyleSheet.create({
  infoBoxOverMap: {
    position: "absolute",
    top: 100,
    left: 20,
    zIndex: 1,
    elevation: 3,
  },
  infoBoxCloseButton: {
    position: "absolute",
    top: 15,
    left: 250,
    zIndex: 2,
    margin: 10,
    padding: 5,
    backgroundColor: "rgba(145, 35, 55, 0.99)",
    borderRadius: 50,
  },
});  
