import { View, Text, StyleSheet } from "react-native";
import React from "react";

export default function OutdoorPOI_info({ info }) {
  // console.log("From outdoorPO place info are ", info);

  const {
    name,
    rating,
    formatted_phone_number,
    international_phone_number,
    formatted_address,
    website,
    url,
    opening_hours,
    price_level,
    types,
    address_components,
    geometry,
  } = info || {};
  console.log({ opening_hours });

  const { open_now, periods, weekday_text } = opening_hours || {};
  const { location, viewport } = geometry || {};
  const { lat, lng } = location || {};

  return (
    <View style={styles.infoBoxContainer}>
      <Text>Name : {name}</Text>
      <Text>Distance:</Text>
      <Text>userRatings: {rating} </Text>
      <Text>Open Now:{open_now ? "Yes" : "No"} </Text>
      <Text>Open Hours: </Text>
      <Text>Hours:</Text>
      {weekday_text.map((day, index) => (
        <Text key={index}>{day}</Text>
      ))}
    </View>
  );
}
const styles = StyleSheet.create({
  infoBoxContainer: {
    width: 300,
    height: 400,
    backgroundColor: "white",
    borderRadius: 10,
    padding: 15,
  },
});
