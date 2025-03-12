import React from "react";
import MapView, { Marker, PROVIDER_DEFAULT } from "react-native-maps";
import MapViewDirections from "react-native-maps-directions";
import { StyleSheet, View } from "react-native";
import { GOOGLE_MAPS_APIKEY } from "../../constants";
import PolygonRender from "./PolygonRender";
import { concordiaBuildings } from "./concordiaBuildings";
import { useLocation } from "../context/userLocationContext";

// Campus coordinates for SGW and LOY campuses
const CampusCoordinates = {
  SGW: {
    latitude: 45.49745011600138,
    longitude: -73.57894297258392,
    latitudeDelta: 0.0322,
    longitudeDelta: 0.0221,
  },
  LOY: {
    latitude: 45.4582,
    longitude: -73.6405,
    latitudeDelta: 0.0322,
    longitudeDelta: 0.0221,
  },
};

export default function OutdoorMap({
  origin,
  destination,
  travelMode,
  onDurationChange,
  campus,
  setBuildingLocation,
}) {
  const { userLocation } = useLocation();

  // Helper function to render markers for Concordia buildings
  const renderBuildingMarkers = () =>
    concordiaBuildings.map((marker) => (
      <Marker
        key={marker.id}
        coordinate={{ latitude: marker.latitude, longitude: marker.longitude }}
        title={marker.title}
        description={marker.description}
      />
    ));

  // Render Map Directions when origin and destination exist
  const renderDirections = () =>
    origin &&
    destination && (
      <MapViewDirections
        origin={origin}
        destination={destination}
        apikey={GOOGLE_MAPS_APIKEY}
        mode={travelMode}
        strokeWidth={7}
        strokeColor="blue"
        onReady={(result) => onDurationChange(result.duration)}
      />
    );

  return (
    <View style={styles.container}>
      <MapView
        provider={PROVIDER_DEFAULT}
        style={styles.map}
        showsUserLocation={true}
        initialRegion={CampusCoordinates[campus]}
        region={CampusCoordinates[campus]}
      >
        <PolygonRender setBuildingLocation={setBuildingLocation} />
        {renderBuildingMarkers()}
        {renderDirections()}
      </MapView>
    </View>
  );
}

// Styles
const styles = StyleSheet.create({
  container: { flex: 1 },
  map: {
    position: "absolute",
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
});
