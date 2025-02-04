import MapView, { Marker, Polygon } from "react-native-maps";
import { PROVIDER_GOOGLE } from "react-native-maps";
import { StyleSheet, Text, View, TextInput } from "react-native";

export default function OutdoorMap() {
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
        /* apiKey=" API KEY HERE"*/
        style={styles.map}
        showsUserLocation={true}
        initialRegion={{
          latitude: 45.521805,
          longitude: -73.555084,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      >
        {/*Add polygon to highlight buildings */}
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
