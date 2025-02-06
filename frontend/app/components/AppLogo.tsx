//App logo component
//Renders the Campus Pilot logo
import { View, Text, Image, StyleSheet } from "react-native";
import React from "react";

export default function appLogo() {
  return (
    <View>
      <Image
        style={styles.logo}
        source={require("../../assets/images/logo.png")}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  logo: {
    width: 50,
    height: 50,
  },
});
