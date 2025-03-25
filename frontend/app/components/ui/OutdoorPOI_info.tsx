import {
  View,
  Text,
  StyleSheet,
  Alert,
  TouchableOpacity,
  LayoutChangeEvent,
} from "react-native";
import { useState } from "react";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from "react-native-reanimated";
import Icon from "react-native-vector-icons/MaterialIcons";

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

  //For the height of the collapsioble
  const [height, setHeight] = useState(0);
  const animatedHeight = useSharedValue(0);
  const [expanded, setExpanded] = useState(false);
  const onLayout = (event: LayoutChangeEvent) => {
    const onLayoutHeight = event.nativeEvent.layout.height;

    if (onLayoutHeight > 0 && height !== onLayoutHeight) {
      setHeight(onLayoutHeight);
    }
  };

  const collapsableStyle = useAnimatedStyle(() => {
    animatedHeight.value = expanded ? withTiming(height) : withTiming(0);

    return {
      height: animatedHeight.value,
    };
  }, [expanded, height]);

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
      <View style={styles.infoButton_container}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => console.log("direction pressed")}
        >
          <Icon name="directions" size={24} color="#FFFFFF" />
          <Text style={styles.buttonText}>Directions</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={() => setExpanded(!expanded)}
        >
          <Icon name="schedule" size={24} color="#FFFFFF" />
          <Text style={styles.buttonText}>Schedule</Text>
        </TouchableOpacity>
      </View>
      {/*Collapsible hours */}
      <Animated.View style={[collapsableStyle, { overflow: "hidden" }]}>
        <View style={{ position: "absolute" }} onLayout={onLayout}>
          <Text>Open Hours: </Text>
          {weekday_text && weekday_text.length > 0 ? (
            weekday_text.map((day, index) => <Text key={index}>{day}</Text>)
          ) : (
            <Text>Operating hours not available</Text>
          )}
        </View>
      </Animated.View>
    </View>
  );
}
const styles = StyleSheet.create({
  infoBoxContainer: {
    marginTop: 20,
    marginBottom: 20,
    // width: 300,
    // height: 400,
    backgroundColor: "white",
    borderRadius: 10,
    padding: 15,
  },
  infoButton_container: {
    marginTop: 20,
    marginBottom: 20,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
  },
  button: {
    backgroundColor: "#912338",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 8,
    gap: 8,
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
  },
  collapsibleHours: {},
});
