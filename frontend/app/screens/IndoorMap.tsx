import { View, StyleSheet } from "react-native";
import CampusPilotHeader from "../components/ui/CampusPilotHeader";
import useTheme from "../hooks/useTheme";
import { getStyles } from "../styles";
import Floorplan from "../components/ui/Floorplan";
import FloorplanRoom from "../components/ui/FloorplanRoom";
import { useEffect, useState } from "react";
import ToggleAccessibility from '../components/ui/ToggleAccessibility';

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
  const [showAmenities, setShowAmenities] = useState(false);

  useEffect(() => {
    if (route?.params) {
      // Update nodeInfo and roomOrPath if they exist
      if (route.params.nodeInfo !== undefined) {
        setNodeInfo(route.params.nodeInfo);
      }
      if (route.params.roomOrPath !== undefined) {
        setRoomOrPath(route.params.roomOrPath);
      }

      // Set pathInfo with timestamp to force re-render
      setPathInfo({
        ...route.params,
        _timestamp: new Date().getTime(),
      });
    }
  }, [route?.params]);

  return (
    <View style={globalStyles.container}>
      <View style={styles.header}>
        <CampusPilotHeader />
      </View>
      <View style={styles.header1}>
      <ToggleAccessibility 
          showIcons={showAmenities}
          setShowIcons={setShowAmenities}
        />
      </View>
        
      <View style={styles.myImagecontainer}>
        {roomOrPath === "room" ? (
          <FloorplanRoom nodeInfo={nodeInfo} showAmenities={showAmenities} />
        ) : (
          <Floorplan
            path={path}
            key={pathInfo ? String(pathInfo._timestamp) : "default"}
          />
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: { 
    height: "20%",
    top:50

   },
  header1: { 
    height: "10%",
    top: 30
  },
  myImagecontainer: {
    height: "80%",
    width: "100%",
  },
});
