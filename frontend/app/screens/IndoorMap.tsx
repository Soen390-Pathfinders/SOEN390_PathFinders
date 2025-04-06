import { View, StyleSheet } from "react-native";
import CampusPilotHeader from "../components/ui/CampusPilotHeader";
import useTheme from "../hooks/useTheme";
import { getStyles } from "../styles";
import Floorplan from "../components/ui/Floorplan";
import FloorplanRoom from "../components/ui/FloorplanRoom";
import { useEffect, useState } from "react";

// Define the type for nodeInfo
type PathData = {
  path?: any[];
  distance?: number;
  _timestamp?: number;
  [key: string]: any;
};

export default function IndoorMap({ route }) {
  const [nodeInfo, setNodeInfo] = useState<PathData>();
  const [roomOrPath, setRoomOrPath] = useState();
  const { theme } = useTheme();
  const globalStyles = getStyles(theme);
  
  useEffect(() => {
    console.log(route.params)
    if (route.params) {
      // Set node info with a unique key to force re-render
      setNodeInfo({
        ...route.params,
        _timestamp: new Date().getTime() // Add timestamp to ensure React detects the change
      });
    }
  }, [route.params]);

  return (
    <View style={globalStyles.container}>
      <View style={styles.header}>
        <CampusPilotHeader />
      </View>

      <View style={styles.myImagecontainer}>
        {roomOrPath === "room" ? (
          <FloorplanRoom nodeInfo={nodeInfo} />
        ) : (
          <Floorplan 
            path={nodeInfo} 
            key={nodeInfo ? String(nodeInfo._timestamp) : 'default'} 
          />
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
