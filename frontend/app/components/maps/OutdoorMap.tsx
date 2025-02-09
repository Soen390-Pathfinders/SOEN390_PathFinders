//Renders the google map through react-native-maps api
import MapView, { Marker, Polygon } from "react-native-maps";
import { PROVIDER_GOOGLE } from "react-native-maps";
import { StyleSheet, Text, View, TextInput } from "react-native";
import MapViewDirections from "react-native-maps-directions";
import { GOOGLE_MAPS_APIKEY } from "../../constants";
import outlines from "./building_outlines";

export default function OutdoorMap() {
  let origin = { latitude: 45.521805, longitude: -73.555084 };
  let destination = { latitude: 45.528805, longitude: -73.555084 };

  //Declare the array of markers
  const concordiaBuildings = [
    {
      id: 1,
      latitude: 45.49745011600138,
      longitude: -73.57894297258392,
      title: "Hall Building",
      description: "H Building Concordia University",
    },
    // Add more markers here
  ];

  return (
    <View style={{ flex: 1 }}>
      <MapView
        provider={PROVIDER_GOOGLE}
        /*apikey={GOOGLE_MAPS_APIKEY}*/
        style={styles.map}
        showsUserLocation={true}
        initialRegion={{
          latitude: 45.49745011600138,
          longitude: -73.57894297258392,
          latitudeDelta: 0.0322,
          longitudeDelta: 0.0221,
        }}
      >
        {/*Add polygon to highlight buildings */}

        {/* Render multiple polygons */}
        {outlines.map((outline) => (
          <Polygon
          key={outline.id}
          coordinates={outline.coordinates}
          fillColor={outline.campus === "SGW" 
            ? "rgba(145, 35, 55, 0.57)"  // Red for SGW
            : "rgba(0, 0, 255, 0.57)"}   // Blue for LOY
          strokeColor={outline.campus === "SGW"
            ? "rgba(145, 35, 55, 0.99)"  
            : "rgba(0, 0, 255, 0.99)"}   
          strokeWidth={2}
          />
        ))}
        {/* Render markers */}
        {concordiaBuildings.map((marker) => (
          <Marker
            key={marker.id}
            coordinate={{
              latitude: marker.latitude,
              longitude: marker.longitude,
            }}
            title={marker.title}
            description={marker.description}
          />
        ))}

        {/* Render MapViewDirections only if both origin and destination are set */}
        {origin && destination && (
          <MapViewDirections
            origin={origin}
            destination={destination}
            apikey={GOOGLE_MAPS_APIKEY}
            mode="WALKING"
            strokeWidth={7}
            strokeColor="blue"
          />
        )}
      </MapView>
    </View>
  );
}
const styles = StyleSheet.create({
  map: {
    position: "absolute",
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
});
