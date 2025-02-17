import { useState, useRef } from "react";
import { useLocation } from "../components/context/userLocationContext";
import { Alert } from "react-native";

const useDirectionLogic = (initialValue = "") => {
  const [startLocation, setStartLocation] = useState(null);
  const [destination, setDestination] = useState(null);
  const [travelMode, setTravelMode] = useState("WALKING");

  // New state variables that update when the user taps GO
  const [submittedStart, setSubmittedStart] = useState(null);
  const [submittedDestination, setSubmittedDestination] = useState(null);

  const { userLocation } = useLocation(); // Get user's current location

  // Refs for GooglePlacesAutocomplete to control input text
  const startLocationRef = useRef();
  const destinationRef = useRef();


  // Update the submitted locations and log the navigation info
  const handleGoPress = () => {
    if (startLocation && destination) {
      setSubmittedStart(startLocation);
      setSubmittedDestination(destination);
      console.log(
        `Navigating from: ${startLocation} to: ${destination} via ${travelMode}`
      );
    } else {
      Alert.alert(
        "Missing Information",
        "Please fill in both the Start Location and Destination.",
        [{ text: "OK", style: "default" }]
      );
    }
  };

  // Function to set current location in the search bar and state
  const setToCurrentLocation = (type) => {
    const locationText = `${userLocation.latitude.toFixed(
      6
    )}, ${userLocation.longitude.toFixed(6)}`;

    if (type === "start") {
      setStartLocation(locationText); // Store as string
      startLocationRef.current?.setAddressText(locationText); // Update search bar
    } else if (type === "destination") {
      setDestination(locationText); // Store as string
      destinationRef.current?.setAddressText(locationText); // Update search bar
    }
  };

  return {
    startLocation,
    setStartLocation,
    destination,
    setDestination,
    travelMode,
    setTravelMode,
    submittedStart,
    submittedDestination,
    handleGoPress,
    setToCurrentLocation,
    startLocationRef,
    destinationRef,
  };
};

export default useDirectionLogic;
