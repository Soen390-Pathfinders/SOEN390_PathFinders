import React, { useState, useEffect } from "react";
import { View, TouchableOpacity, StyleSheet, Text } from "react-native";
import useTheme from "../hooks/useTheme";
import { getStyles } from "../styles";
import CampusPilotHeader from "../components/ui/CampusPilotHeader";
import { CampusToggle } from "../components/ui/CampusToggle";
import OutdoorPOI_info from "../components/ui/OutdoorPOI_info";
import useFetchGooglePlacesInfo from "../hooks/useFetchGooglePlaceInfo";
import { GOOGLE_MAPS_APIKEY } from "../constants";
import { Ionicons } from "@expo/vector-icons";
import FilterPOI from "../components/ui/FilterPOI";
import MapView, { Marker, PROVIDER_DEFAULT } from "react-native-maps";
import RadiusSlider from "../components/ui/RadiusButton";
import useUserLocation from "../hooks/useUserLocation";
import MapViewDirections from "react-native-maps-directions";

export default function OutdoorPointsOfInterests() {
  const { theme } = useTheme();
  const globalStyles = getStyles(theme);

  const [destination, setDestination] = useState(null);
  const [campus, setCampus] = useState("SGW");
  const [activeFilter, setActiveFilter] = useState([]);
  const [ratingRange, setRatingRange] = useState<[number, number] | null>(null);
  const [searchRadius, setSearchRadius] = useState(500);
  const [outdoorPlaceID, setoutdoorPlaceID] = useState<string | null>(null);
  const [isInfoBoxVisible, setInfoBoxVisibility] = useState(false);
  const [duration, setDuration] = useState(null);
  const { userLocation } = useUserLocation();

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

  const handleDirectionPress = (placeId) => {
    if (!placeId) {
      console.warn("Invalid destination");
      return;
    }
    setDestination(placeId);
    setInfoBoxVisibility(false);
  };

  const resetDestination = () => {
    setDestination(null);
    setDuration(null);
  };

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
              onDirectionPress={handleDirectionPress}
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

          {userLocation && destination && (
            <MapViewDirections
              origin={userLocation}
              destination={`place_id:${destination}`}
              apikey={GOOGLE_MAPS_APIKEY}
              mode={"WALKING"}
              strokeWidth={7}
              strokeColor="blue"
              onReady={(result) => {
                setDuration(result.duration);
              }}
              onError={(errorMessage) => {
                console.log("Directions error: ", errorMessage);
              }}
            />
          )}
        </MapView>

        <FilterPOI onFilterPress={handleFilterPress} />

        {destination && (
          <View style={styles.bottomOverlay}>
            <TouchableOpacity
              style={styles.resetButton}
              onPress={resetDestination}
            >
              <Text style={{ color: "white" }}>Reset Destination</Text>
            </TouchableOpacity>
            {duration && (
              <Text style={styles.durationText}>
                ETA: {Math.round(duration)} mins
              </Text>
            )}
          </View>
        )}
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
  bottomOverlay: {
    position: "absolute",
    bottom: 20,
    left: 20,
    zIndex: 5,
    flexDirection: "column",
    gap: 10,
  },
  resetButton: {
    backgroundColor: "#0072A8",
    padding: 10,
    borderRadius: 10,
  },
  durationText: {
    marginTop: 0.1,
    marginBottom: 45,
    backgroundColor: "#0072A8",
    padding: 8,
    borderRadius: 10,
    color: "white",
  },
});
 