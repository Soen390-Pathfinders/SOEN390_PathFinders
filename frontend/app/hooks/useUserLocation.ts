/* User location logic*/
import { useEffect } from "react";
import * as Location from "expo-location";
import { useLocation } from "../components/context/userLocationContext";


const useUserLocation = () => {
  const { updateUserLocation } = useLocation(); //Get the current user location

  useEffect(() => {
    let isMounted = true;

    const getUserLocation = async () => {
      let { status } = await Location.requestForegroundPermissionsAsync(); //Access foreground permission to get location access

      if (status == "granted") {
        console.log("Permission to access location was granted");
      } else {
        console.log("Permission to access location was denied");
        return;
      }

      //fetch the current user location
      
      if (isMounted) {const userlocation = (0,0);
       /* const userlocation = await Location.getCurrentPositionAsync({}); //Get the current user location*/
        console.log(userlocation);
        const userlatitude = userlocation.coords.latitude;
        const userlongitude = userlocation.coords.longitude;

        if (isMounted) {
          updateUserLocation(userlatitude, userlongitude); //Update the user location
        }
      }
    };

    getUserLocation(); // Call function

    return () => {
      isMounted = false;
    };
  }, [updateUserLocation]);

  return null; // No need to return anything
};

export default useUserLocation;