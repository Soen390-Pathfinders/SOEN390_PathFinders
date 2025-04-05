import {
  View,
  Text,
  StyleSheet,
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
import useUserLocation from "@/app/hooks/useUserLocation";
import getDistance from "geolib/es/getPreciseDistance";

export default function OutdoorPOI_info({ info, onDirectionPress, placeId }) {
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

  const { open_now, weekday_text } = opening_hours || {};
  const { location, viewport } = geometry || {};
  const { lat, lng } = location || {};
  const { userLocation, setLocation } = useUserLocation();
  const {
    userLocation: { latitude, longitude },
  } = useUserLocation();

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
      <Text style={styles.infoTitle}>{name}</Text>

      <View style={styles.infoRow}>
        <Text style={styles.infoLabel}>Distance:</Text>
        <Text style={styles.infoValue}>
          {location && userLocation
            ? getDistance(
                { latitude: location.lat, longitude: location.lng },
                { latitude, longitude }
              ) + " m"
            : "Calculating..."}
        </Text>
      </View>

      <View style={styles.infoRow}>
        <Text style={styles.infoLabel}>Rating:</Text>
        <Text style={styles.infoValue}>
          {rating ? rating + " ★" : "No ratings"}
        </Text>
      </View>

      <View style={styles.infoRow}>
        <Text style={styles.infoLabel}>Status:</Text>
        <Text style={styles.infoValue}>{open_now ? "Open now" : "Closed"}</Text>
      </View>

      {/* Alert when place is currently closed */}
      {open_now === false || open_now === "no" ? (
        <Text style={styles.warningText}>
          This point of interest is currently closed
        </Text>
      ) : null}

      <View style={styles.infoButton_container}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            onDirectionPress(placeId);
          }}
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
        <View
          style={{ position: "absolute", width: "100%" }}
          onLayout={onLayout}
        >
          <View style={styles.hoursContainer}>
            <Text style={styles.hoursTitle}>Open Hours:</Text>
            {weekday_text && weekday_text.length > 0 ? (
              weekday_text.map((day, index) => (
                <Text key={index} style={styles.hoursText}>
                  {day}
                </Text>
              ))
            ) : (
              <Text style={styles.hoursText}>
                Operating hours not available
              </Text>
            )}
          </View>
        </View>
      </Animated.View>
    </View>
  );
}
const styles = StyleSheet.create({
  infoBoxContainer: {
    marginLeft: 70,
    marginVertical: 10,
    backgroundColor: "white",
    borderRadius: 12,
    padding: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 2,
    elevation: 2,
    borderWidth: 1,
    borderColor: "#f0f0f0",
  },
  infoTitle: {
    fontSize: 16,
    fontWeight: "700",
    marginBottom: 6,
    color: "#333333",
  },
  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 4,
  },
  infoLabel: {
    fontWeight: "600",
    marginRight: 5,
    color: "#555555",
    fontSize: 13,
  },
  infoValue: {
    color: "#333333",
    fontSize: 13,
  },
  warningText: {
    color: "#D8000C",
    fontWeight: "600",
    marginTop: 6,
    backgroundColor: "#FFBABA",
    padding: 5,
    borderRadius: 6,
    textAlign: "center",
    fontSize: 12,
  },
  infoButton_container: {
    marginTop: 8,
    marginBottom: 8,
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
    paddingHorizontal: 12,
    borderRadius: 8,
    gap: 6,
    elevation: 1,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 1,
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "600",
  },
  hoursContainer: {
    backgroundColor: "#f7f7f7",
    borderRadius: 6,
    padding: 8,
    marginTop: 3,
  },
  hoursTitle: {
    fontWeight: "600",
    marginBottom: 3,
    color: "#555555",
    fontSize: 13,
  },
  hoursText: {
    marginBottom: 2,
    color: "#555555",
    fontSize: 12,
  },
});
