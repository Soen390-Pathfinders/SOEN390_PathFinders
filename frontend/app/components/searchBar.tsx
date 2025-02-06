//searchBar component -- Not yet completed and added to a any page.
import { View, Text, TextInput, StyleSheet } from "react-native";
import React from "react";

export default function searchBar() {
  return (
    <View style={styles.searchBar}>
      <TextInput placeholder={"Search"} placeholderTextColor={"#666"} />
    </View>
  );
}
const styles = StyleSheet.create({
  searchBar: {
    /* position: 'absolute', top: 10, width: '100%' */
    borderRadius: 30,
    margin: 10,
    width: "95%",
    color: "#000",
    borderColor: "#666",
    backgroundColor: "#EFF2F4",
    borderWidth: 0,
    flex: 1,
    paddingHorizontal: 10,
    fontSize: 18,
  },
});
