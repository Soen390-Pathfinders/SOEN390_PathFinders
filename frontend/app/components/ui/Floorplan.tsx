import React, { useRef, useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import Svg, { Circle, Line } from "react-native-svg";
import { Image } from "expo-image";
import FilterButton from "./Filter";
import Icon from "react-native-vector-icons/MaterialIcons";
import { ImageZoom } from "@likashefqet/react-native-image-zoom";
import { Zoomable } from "@likashefqet/react-native-image-zoom";
import PathTrace from "../ui/pathTrace";
import { FloorAPI } from "../../../api/api";

const iconMap = {
  "Water Fountain": "water_drop",
  "Vending Machine": "storefront",
  "Cafe": "local_cafe",
  "Bar": "local_bar",
  "Study Area": "school",
  "Charging Station": "electric_car",
  "Elevator": "elevator",
  "Stairs": "stairs",
  "Printer": "print",
  "Wifi": "wifi",
  "Locker": "lock",
  "Lounge": "weekend",
  "Cafeteria": "local_dining",
  "Library": "library_books",
  "ATM": "atm",
  "Bicycle Rack": "directions_bike",
  "Handical Accessible": "accessible",
  "Parking Spot": "local_parking",
  "Post Box": "mail",
  "Security Desk": "security",
  "Trash Can": "delete",
  "Recycling Bin": "recycling",
  "Coffee Machine": "local_cafe",
  "Shower": "shower",
  "First Aid Kit": "medication",
  "Power Outlets": "power",
  "Rest Area": "beach_access",
  "Lost and Found": "find_in_page",
  "Exit": "exit_to_app"
};
export default function Floorplan() {
  const zoomableRef = useRef(null); // Define a reference
  const [scale, setScale] = useState(1);
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);
  const [amenities, setAmenities] = useState([]);

  const onZoom = (zoomType) => {
    console.log("Zoom event triggered:", zoomType);
  };

  const onAnimationEnd = (finished) => {
    console.log("Animation ended:", finished);
  };

  //Fetching all the amenities on the floor
  useEffect(() => {
    const loadAmenities = async () => {
      if (selectedFilters.length > 0) {
        try {
          const data = await FloorAPI.getAmenities("H-5");
          const flattenedAmenities = Object.entries(data).flatMap(([type, locations]) =>
            (locations as any[]).map((loc) => ({
              ...loc,
              types: loc.amenity_names, // Use the amenity_names array from the response
            }))
          );

          // Filter amenities to only include those that match the selected filters
          const filteredAmenities = flattenedAmenities.filter((amenity) =>
            amenity.types.some((type) => selectedFilters.includes(type))
          );
          setAmenities(filteredAmenities);
        } catch (error) {
          console.error("Error loading amenities:", error);
        }
      } else {
        setAmenities([]);
      }
    };

    loadAmenities();
  }, [selectedFilters]);

  const [linepath, setlinePath] = useState([]);
  const [loading, setLoading] = useState(true);

  return (
    <View style={styles.container}>
      <Zoomable
        ref={zoomableRef}
        minScale={1}
        maxScale={9}
        // scale={1.5}
        doubleTapScale={3}
        isSingleTapEnabled
        isDoubleTapEnabled
        onDoubleTap={(zoomType) => {
          //console.log("onDoubleTap", zoomType);
          onZoom(zoomType);
        }}
        onProgrammaticZoom={(zoomType) => {
          //console.log("onZoom", zoomType);
          onZoom(zoomType);
        }}
        style={styles.image}
        onResetAnimationEnd={(finished, values) => {
          // console.log("onResetAnimationEnd", finished);
          //console.log("lastScaleValue:", values?.SCALE.lastValue);
          onAnimationEnd(finished);
        }}
      >
        <View style={styles.svgContainer}>
          <Svg height="100%" width="100%" viewBox="0 0 100 100">
            <PathTrace />
          </Svg>
        </View>
        <View style={styles.floorplanContainer}>
          <Image
            style={styles.image}
            source={require("../../../assets/floorplans/H5.jpg")} //5fth floor of Hall buildign was used
            contentFit="contain" // entire image is contained
            transition={1000}
            resizeMode="cover" // Ensures the image covers the container
          ></Image>
          {amenities.map((amenity, index) => (
            <Icon
              key={index}
              name={iconMap[amenity.types[0]]} // Use the first type for the icon
              size={40}
              color="blue"
              style={{ position: "absolute", left: amenity.x_coor, top: amenity.y_coor }}
            />
          ))}
        </View>
      </Zoomable>
      <FilterButton onApplyFilters={setSelectedFilters} />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    flex: 1,
    width: "100%",
  },
  svgContainer: {
    height: "100%",
    width: "100%",
    position: "absolute",
    left: 0,
    top: 0,
    zIndex: 4,
  },
  floorplanContainer: {
    height: "100%",
    width: "100%",
    position: "absolute",
    left: 0,
    top: 0,
    zIndex: 2,
  },
});
