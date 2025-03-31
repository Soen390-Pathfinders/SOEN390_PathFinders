import { View, StyleSheet } from "react-native";
import CampusPilotHeader from "../components/ui/CampusPilotHeader";
import useTheme from "../hooks/useTheme";
import { getStyles } from "../styles";
import Floorplan from "../components/ui/Floorplan";
import FloorplanRoom from "../components/ui/FloorplanRoom";
import { useEffect, useState } from "react";


// Define the type for path
type PathData = {
  path?: any[];
  distance?: number;
  _timestamp?: number;
  [key: string]: any;
};

export default function IndoorMap({ route }) {
 const {
    path,
    nodeInfo: routeNodeInfo,
    roomOrPath: routeRoomOrPath,
  } = route?.params || {};
  const [nodeInfo, setNodeInfo] = useState(routeNodeInfo);
  const [pathInfo, setPathInfo] = useState<PathData>();
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

    if (route.params) {
      // Set node info with a unique key to force re-render
      setPathInfo({
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
            path={path} 
            key={pathInfo ? String(pathInfo._timestamp) : 'default'} 
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
