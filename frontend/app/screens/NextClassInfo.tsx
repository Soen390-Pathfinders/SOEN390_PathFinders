import React, { Component } from "react";
import { StyleSheet, Text, View } from "react-native";
import { WebView } from "react-native-webview";

export default function NextClassInfo() {
  return (
    <View>
      <Text>Next Class Info</Text>
      <View style={styles.container}>
        {/*Publuc google calendar is embedded*/}
        <WebView
          source={{
            uri: "https://calendar.google.com/calendar/embed?src=96130beb6cf99fae30e71732dd18a80e8269c242efc3b76654c4df57d7b0f49d%40group.calendar.google.com&ctz=America%2FToronto",
          }}
          style={styles.webview}
        />
      </View>
      <Text>Directions to next class</Text>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    marginTop: 30,
    backgroundColor: "#e7e7e7",
    height: 600,
    //flex: 1,
  },
  webview: {
    flex: 1,
  },
});
