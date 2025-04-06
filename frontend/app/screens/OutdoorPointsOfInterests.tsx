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
  const [searchRadius, setSearchRadius] = useState(500);
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

  const defaultFilters = [
    "Coffee",
    "Restaurants",
    "Parks",
    "Bakeries",
    "Pharmacies",
    "Bars",
    "Ice Cream",
    "Dessert Shops",
    "Juice Bars",
  ];

  const {
    place,
    placeInfo,
    fetchPlaceInfo,
    filteredPlaces,
    fetchPlacesByCategories,
  } = useFetchGooglePlacesInfo({ placeID: outdoorPlaceID, searchRadius });

  useEffect(() => {
    if (placeInfo) setInfoBoxVisibility(true);
  }, [placeInfo]);

  useEffect(() => {
    setActiveFilter(defaultFilters);
    fetchPlacesByCategories(defaultFilters, campusCoordinates[campus]);
  }, []);

  useEffect(() => {
    if (activeFilter.length > 0) {
      fetchPlacesByCategories(activeFilter, campusCoordinates[campus]);
    }
  }, [searchRadius, campus]);

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
  };

  const closeInfoBox = () => setInfoBoxVisibility(false);

  const safeMarkers =
    filteredPlaces?.filter((place) => {
      const coords = place?.geometry?.location;
      const rating = place?.rating ?? 0;
      const hasCoords = coords?.lat && coords?.lng;

      let matchesRating = true;
      if (ratingRange && Array.isArray(ratingRange)) {
        const [min, max] = ratingRange;
        matchesRating = rating >= min && rating <= max;
      }

      return hasCoords && matchesRating;
    }) || [];

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
            <OutdoorPOI_info
              info={placeInfo}
              onDirectionPress={() => {}}
              placeId={place}
            />
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
          {safeMarkers.map((place, index) => (
            <Marker
              key={`${place.place_id || index}-${index}`}
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
    right: 10,
    zIndex: 2,
    margin: 10,
    padding: 5,
    backgroundColor: "rgba(145, 35, 55, 0.99)",
    borderRadius: 50,
  },
});
