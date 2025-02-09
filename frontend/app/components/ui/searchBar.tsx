//searchBar component -- Not yet completed and added to a any page.
import { View, Text, TextInput, StyleSheet } from "react-native";
import React from "react";
import useTheme from "@/app/hooks/useTheme";
import { getStyles } from "@/app/styles";

export default function SearchBar() {
  const { theme } = useTheme(); // Use the custom hook
  const styles = getStyles(theme); // Get styles based on theme
  return (
    <View style={styles.searchBar}>
      <TextInput placeholder={"Search"} placeholderTextColor={"#666"} />
    </View>
  );
}
