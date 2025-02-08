//Renders the google map through react-native-maps api
import MapView, { Marker, Polygon } from "react-native-maps";
import { PROVIDER_GOOGLE } from "react-native-maps";
import { StyleSheet, Text, View, TextInput } from "react-native";
import MapViewDirections from 'react-native-maps-directions';
import { GOOGLE_MAPS_APIKEY } from "../../constants"

export default function OutdoorMap() {

  let origin = {latitude: 45.521805, longitude: -73.555084};
  let destination = {latitude: 45.528805, longitude: -73.555084};

  //Declare the array of markers
  const concordiaBuildings = [
    {
      id: 1,
      latitude: 45.521805,
      longitude: -73.555084,
      title: "Hall Building",
      description: "H Building Concordia University",
    },
    // Add more markers here
  ];

  return (
    <View style={{ flex: 1 }}>
      <MapView
        provider={PROVIDER_GOOGLE}
        /* apiKey=" API KEY HERE"*/ //GOOGLE API KEY GOES HERE
        style={styles.map}
        showsUserLocation={true}
        initialRegion={{
          latitude: 45.521805,
          longitude: -73.555084,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      >
        {/*Add polygon to highlight buildings //TODO: fetch the coordinate from backend*/}

        <Polygon
          coordinates={[
            { latitude: 45.521805, longitude: -73.555084 },
            { latitude: 45.531805, longitude: -73.575084 },
            { latitude: 45.551805, longitude: -73.585084 },
          ]}
          fillColor="#27f"
          strokeColor="#27f"
          strokeWidth={2}
          tappable={true}
          onPress={() => console.log("Pressed")}
        />

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
