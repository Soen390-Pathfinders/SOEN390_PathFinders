import { View, Text, StyleSheet, Alert } from "react-native";
import React from "react";

export default function OutdoorPOI_info({ info }) {
  //Deconstrcut the information from google Place API
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

  const { open_now, periods, weekday_text } = opening_hours || {};
  const { location, viewport } = geometry || {};
  const { lat, lng } = location || {};

  return (
    <View style={styles.infoBoxContainer}>
      <Text>Name : {name}</Text>
      <Text>Distance:</Text>
      <Text>userRatings: {rating} </Text>
      <Text>Open Now:{open_now ? "Yes" : "No"} </Text>
      {/* Add alert when place is currently closed */}
      {open_now === false || open_now === "no" ? (
        <Text style={{ color: "red", fontWeight: "bold", marginTop: 10 }}>
          This point of interest is currently closed
        </Text>
      ) : null}
      <Text>Open Hours: </Text>
      <Text>Hours:</Text>
      {weekday_text && weekday_text.length > 0 ? (
        weekday_text.map((day, index) => <Text key={index}>{day}</Text>)
      ) : (
        <Text>Operating hours not available</Text>
      )}
    </View>
  );
}
const styles = StyleSheet.create({
  infoBoxContainer: {
    marginTop: 20,
    width: 300,
    height: 400,
    backgroundColor: "white",
    borderRadius: 10,
    padding: 15,
  },
});
