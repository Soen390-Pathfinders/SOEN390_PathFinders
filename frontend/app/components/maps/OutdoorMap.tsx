import MapView,{ Marker } from 'react-native-maps';
import { PROVIDER_GOOGLE } from 'react-native-maps';
import {StyleSheet, Text, View, TextInput } from "react-native";


export default function OutdoorMap(){
  const api_key = process.env.REACT_APP_MAPS_API_KEY;  // remove this if it ends up not working
    //Declare the array of markers
    const markers = [
        {
          id: 1,
          latitude: 45.521805,
          longitude: -73.555084,
          title: 'Hall Building',
          description: 'H Building Concordia University',
        },
        // Add more markers here
      ];

  return(
      <View style={{flex:1}}>
      <MapView
        provider={PROVIDER_GOOGLE}
        apiKey= api_key //Expo seemes to have problem with his , tbc ///TODO: let the backend supply the api key 
        style={styles.map}
        showsUserLocation={true}
        initialRegion={{
          latitude: 45.521805,
          longitude: -73.555084,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      >
        {/* Render markers */}
        {markers.map((marker) => (
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
       position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0
      },
});
