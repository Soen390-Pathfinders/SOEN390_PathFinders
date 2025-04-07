import { useRef, useState, useEffect } from "react";
import { View, StyleSheet } from "react-native";
import Svg, { Circle } from "react-native-svg";
import { Image } from "expo-image";
import { Zoomable } from "@likashefqet/react-native-image-zoom";
import { MaterialIcons } from '@expo/vector-icons';
import { FloorAPI } from "../../../api/api";// Import your API service


const AMENITY_ICONS = {
  "WATER_FOUNTAIN": "opacity",
  "VENDING_MACHINE": "storefront",
  "CAFE": "free-breakfast",  
  "BAR": "local-bar",        
  "STUDY_AREA": "school",
  "CHARGING_STATION": "ev-station",  
  "ELEVATOR": "elevator",
  "STAIRS": "stairs",
  "PRINTER": "print",
  "WIFI": "wifi",
  "LOCKER": "lock",
  "LOUNGE": "weekend",
  "CAFETERIA": "restaurant",  
  "LIBRARY": "library-books", 
  "BICYCLE_RACK": "directions-bike",  
  "HANDICAP_ACCESSIBLE": "accessible",
  "PARKING_SPOT": "local-parking",  
  "POST_BOX": "mail",
  "SECURITY_DESK": "security",
  "TRASH_CAN": "delete",
  "RECYCLING_BIN": "recycling",
  "COFFEE_MACHINE": "coffee",  
  "SHOWER": "shower",
  "FIRST_AID_KIT": "medical-services",  
  "POWER_OUTLETS": "power",
  "REST_AREA": "beach-access",  
  "LOST_AND_FOUND": "find-in-page",  
  "EXIT": "exit-to-app" 
};
type Amenity = {
  id: number;
  floor: string;
  is_accessible: boolean;
  amenity_names: string[];
  x_coor: number;
  y_coor: number;
};

export default function FloorplanRoom({ nodeInfo, showAmenities }) {
  // Destructure the values of roomNode
  const { capacity, code, floor, id, number, room_types, location_data } =
    nodeInfo || {};
  // Destructure the location data
  const {
    amenity_names,
    description,
    floor: locationFloor,
    is_accessible,
    x_coor,
    y_coor,
  } = location_data || {};

  const initialScale = 1; // initial scale is 1
  const zoomableRef = useRef(null);
  const [scale, setScale] = useState(initialScale);
  const [amenities, setAmenities] = useState<Record<string, Amenity[]>>({});
  const currentFloor = nodeInfo?.location_data?.floor || 'H-4';


  const onZoom = (zoomType) => {
    // console.log("Zoom event triggered:", zoomType);
  };

  const onAnimationEnd = (finished) => {
    // console.log("Animation ended2:", finished);
  };
  // Function to get the appropriate floor plan image based on current floor
  const getFloorplanImage = () => {
    switch (locationFloor) {
      case "H-1":
        return require("../../../assets/floorplans/H1.png");
      case "H-4":
        return require("../../../assets/floorplans/H4.jpg");
      case "H-5":
        return require("../../../assets/floorplans/H5.jpg");
      case "H-6":
        return require("../../../assets/floorplans/H6.jpg");
      case "H-8":
        return require("../../../assets/floorplans/H8.jpg");
      case "H-9":
        return require("../../../assets/floorplans/H9.jpg");
      default:
        return require("../../../assets/floorplans/H5.jpg");
    }
  };

  // Zoom in on the room when component mounts
  useEffect(() => {
    if (zoomableRef.current && nodeInfo?.location_data) {
      const { x_coor, y_coor } = nodeInfo.location_data;

      // Add a delay to zoom on the room after the component has rendered
      setTimeout(() => {
        zoomableRef.current.zoom(2, 2, 5);
      }, 800);
    }
  }, [nodeInfo]);

  useEffect(() => {
    if (showAmenities) {

      FloorAPI.getAmenities(currentFloor)
        .then(response => {

          const data = response?.data || response; // Handle both response.data and direct response

          if (data && typeof data === 'object') {
            setAmenities(data);
          } else {
            setAmenities({});
          }
        })
        .catch(error => {
          console.error("API Error:", error);
          setAmenities({});
        });
    } else {
    }
  }, [showAmenities, currentFloor]);

  // In your amenity processing logic:
  const accessibleAmenities = amenities
    ? Object.entries(amenities).flatMap(
      ([amenityType, items], typeIndex) =>
        (items || []).filter(item => item?.is_accessible)
          .map((item, itemIndex) => ({
            ...item,
            amenityType,
            uniqueKey: `${item.id}-${amenityType}-${itemIndex}`
          }))
    )
    : [];


  // Add this to check rendering
  useEffect(() => {
      console.log("Amenities state updated:", {
      amenitiesCount: Object.keys(amenities).length,
      showAmenities
    });
  }, [amenities, showAmenities]);

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
            {nodeInfo?.location_data && (
              <Circle
                cx={x_coor}
                cy={y_coor}
                //cx="12"
                //cy="72"
                r="7"
                stroke="black"
                strokeWidth="0.2"
                fill="rgba(145, 35, 55, 0.4)"
                testID="roomCircle"
              />
            )}
          </Svg>
        </View>
        <View style={styles.floorplanContainer}>
          <Image
            style={styles.image}
            source={getFloorplanImage()}
            contentFit="contain" // entire image is contained
            transition={1000}
            resizeMode="cover" // Ensures the image covers the container
            testID="roomMap"
          ></Image>
          {/* Amenities overlay */}
          {showAmenities && (
            <View style={styles.amenitiesContainer}>
              {accessibleAmenities.map((item) => (
                <MaterialIcons
                  key={item.uniqueKey}  // Use our composite key here
                  name={AMENITY_ICONS[item.amenityType]}
                  size={24}
                  color="blue"
                  style={[
                    styles.amenityIcon,
                    {
                      left: item.x_coor,
                      top: item.y_coor,
                      // Optional: add transform if you need zoom scaling
                      transform: [{ scale: 1 / scale }]
                    }
                  ]}
                />
              ))}
            </View>
          )}
        </View>
      </Zoomable>
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
  amenitiesContainer: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    zIndex: 2,
    pointerEvents: 'none',
  },
  amenityIcon: {
    position: 'absolute',
    pointerEvents: 'auto',
  },
});
