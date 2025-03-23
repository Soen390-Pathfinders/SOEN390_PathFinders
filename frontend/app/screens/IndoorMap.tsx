import { View, Text, StyleSheet, ImageBackground } from "react-native";
import React from "react";
import CampusPilotHeader from "../components/ui/CampusPilotHeader";
import useTheme from "../hooks/useTheme";
import { getStyles } from "../styles";
import Floorplan from "../components/ui/Floorplan";
import FloorplanRoom from "../components/ui/FloorplanRoom";
import { useEffect, useState } from "react";


export default function IndoorMap({ route }) {
  // const { roomOrPath, nodeInfo } = route.params || {}; // Get nodeInfo from route.params
  const [nodeInfo, setNodeInfo] = useState();
  const [roomOrPath, setRoomOrPath] = useState(); //Not particularly sure what this does but when i remove it it breaks -Mathieu
  const { theme } = useTheme();
  const globalStyles = getStyles(theme);
  useEffect(() => {
    setNodeInfo(route.params)
  }, )

  return (
    <View style={globalStyles.container}>
      <View style={styles.header}>
        <CampusPilotHeader />
      </View>

      <View style={styles.myImagecontainer}>
        {roomOrPath === "room" ? (
          <FloorplanRoom nodeInfo={nodeInfo} />
        ) : (
          <Floorplan path = {nodeInfo}/>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: { height: "20%" },
  myImagecontainer: {
    height: "80%",
    width: "100%",
  },
});
