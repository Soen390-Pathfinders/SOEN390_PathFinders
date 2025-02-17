/* User location logic*/
import { useEffect } from "react";
import * as Location from "expo-location";
import { useLocation } from "../components/context/userLocationContext";

const useUserLocation = () => {
  const { updateUserLocation, userLocation } = useLocation(); // Retrieve the user location from context

  useEffect(() => {
    let isMounted = true;

    const getUserLocation = async () => {
      let { status } = await Location.requestForegroundPermissionsAsync(); //Access foreground permission to allow device's location access

      if (status == "granted") {
        console.log("Permission to access location was granted");
      } else {
        console.log("Permission to access location was denied");
        return;
      }

      if (isMounted) {
        const userlocation = await Location.getCurrentPositionAsync({}); //Get the current user location
        console.log(userlocation);
        const userlatitude = userlocation.coords.latitude;
        const userlongitude = userlocation.coords.longitude;

        updateUserLocation(userlatitude, userlongitude); //Update the user location
      }
    };

    getUserLocation(); // Call function on mount and get the user location from the device
    // Set up interval to fetch location every 5 seconds
    const intervalId = setInterval(() => {
      getUserLocation();
    }, 2000); // update the user location every 2 seconds


    return () => {
      isMounted = false;
      clearInterval(intervalId); // Clear the interval when component unmounts
      
    };
  }, []); // Empty dependency array to ensure it runs only once

  const setLocation = async () => {
    const userlocation = await Location.getCurrentPositionAsync({}); //Get the current user location
    console.log(userlocation);
    const userlatitude = userlocation.coords.latitude;
    const userlongitude = userlocation.coords.longitude;

    updateUserLocation(userlatitude, userlongitude); //Update the user location
  };

  return { setLocation, userLocation }; // Return the user location along with setLocation function

  
};


export default useUserLocation;