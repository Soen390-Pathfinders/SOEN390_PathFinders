import { View, Text, StyleSheet } from "react-native";
import useTheme from "../hooks/useTheme";
import { getStyles } from "../styles";
import CampusPilotHeader from "../components/ui/CampusPilotHeader";
import ConcordiaShuttleTimes from "../components/ui/ConcordiaShuttleTimes";
import MapView, { Marker, PROVIDER_DEFAULT } from "react-native-maps";

export default function ConcordiaShuttle() {
  const { theme } = useTheme();
  const globalStyles = getStyles(theme);

  const campusLocations = {
    loyola: {
      latitude: 45.45823278377158,
      longitude: -73.63915536118513,
      title: "Loyola Campus",
      description: "Concordia University Loyola Campus",
    },
    sgw: {
      latitude: 45.4972030019821,
      longitude: -73.57852620369705,
      title: "SGW Campus",
      description: "Concordia University SGW Campus",
    },
  };

  return (
    <View style={globalStyles.container}>
      <CampusPilotHeader />
      <ConcordiaShuttleTimes />
      <View style={globalStyles.mapContainer}>
        <MapView
          showsUserLocation={true}
          provider={PROVIDER_DEFAULT}
          style={{ flex: 1 }}
          initialRegion={{
            latitude: 45.477716,
            longitude: -73.608841,
            latitudeDelta: 0.1,
            longitudeDelta: 0.1,
          }}
        >
          {/* Loyola Marker */}
          <Marker
            coordinate={campusLocations.loyola}
            title={campusLocations.loyola.title}
            description={campusLocations.loyola.description}
          >
            <View style={styles.markerContainer}>
              <View style={styles.marker}>
                <Text style={styles.markerText}>LOY</Text>
              </View>
              <View style={styles.arrow} />
            </View>
          </Marker>

          {/* SGW Marker */}
          <Marker
            coordinate={campusLocations.sgw}
            title={campusLocations.sgw.title}
            description={campusLocations.sgw.description}
          >
            <View style={styles.markerContainer}>
              <View style={styles.marker}>
                <Text style={styles.markerText}>SGW</Text>
              </View>
              <View style={styles.arrow} />
            </View>
          </Marker>
        </MapView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  markerContainer: {
    alignItems: "center",
  },
  marker: {
    backgroundColor: "rgba(145, 35, 55, 0.99)",
    borderRadius: 4,
    padding: 2,
    paddingHorizontal: 4,
    borderWidth: 1,
    borderColor: "#FFFFFF",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  markerText: {
    color: "#FFFFFF",
    fontWeight: "bold",
    fontSize: 12,
  },
  arrow: {
    width: 0,
    height: 0,
    backgroundColor: "transparent",
    borderStyle: "solid",
    borderLeftWidth: 6,
    borderRightWidth: 6,
    borderTopWidth: 8,
    borderLeftColor: "transparent",
    borderRightColor: "transparent",
    borderTopColor: "rgba(145, 35, 55, 0.99)",
    transform: [{ translateY: -1 }],
  },
});
