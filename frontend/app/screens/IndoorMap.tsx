import { View, StyleSheet } from "react-native";
import CampusPilotHeader from "../components/ui/CampusPilotHeader";
import useTheme from "../hooks/useTheme";
import { getStyles } from "../styles";
import Floorplan from "../components/ui/Floorplan";
import FloorplanRoom from "../components/ui/FloorplanRoom";
import { useEffect, useState } from "react";

export default function IndoorMap({ route }) {
  const {
    path,
    nodeInfo: routeNodeInfo,
    roomOrPath: routeRoomOrPath,
  } = route?.params || {};
  const [nodeInfo, setNodeInfo] = useState(routeNodeInfo);
  const [roomOrPath, setRoomOrPath] = useState(routeRoomOrPath);
  const { theme } = useTheme();
  const globalStyles = getStyles(theme);
  useEffect(() => {
    if (route?.params) {
      if (route.params.nodeInfo !== undefined) {
        setNodeInfo(route.params.nodeInfo);
      }
      if (route.params.roomOrPath !== undefined) {
        setRoomOrPath(route.params.roomOrPath);
      }
    }
  }, [route?.params]);

  return (
    <View style={globalStyles.container}>
      <View style={styles.header}>
        <CampusPilotHeader />
      </View>

      <View style={styles.myImagecontainer}>
        {roomOrPath === "room" ? (
          <FloorplanRoom nodeInfo={nodeInfo} />
        ) : (
          <Floorplan path={path} />
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
