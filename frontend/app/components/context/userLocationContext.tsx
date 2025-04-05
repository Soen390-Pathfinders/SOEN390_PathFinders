//Context to share the user location across the app for differentcomponents can access it
import React, { createContext, useContext, useState } from "react";

// Define the strcutre of the context
interface LocationContextType {
  userLocation: { latitude: number; longitude: number }; // stores the current user location
  updateUserLocation: (latitude: number, longitude: number) => void; // updates the user current location
}

// Create the context for the user location , the default value is undefined
const LocationContext = createContext<LocationContextType | undefined>(
  undefined
);

//defines LocationProvider , this needs to wrap the whole app, all the children of the  app root will have access to the user location
export const LocationProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [userLocation, setUserLocation] = useState({
    latitude: -73.57907171854552,
    longitude: 45.49749147752672,
  }); // initial location is Hall building  (45.49749147752672, -73.57907171854552)

  // Function to update the location
  const updateUserLocation = (latitude: number, longitude: number) => {
    setUserLocation({ latitude, longitude });
  };

  return (
    <LocationContext.Provider value={{ userLocation, updateUserLocation }}>
      {children}
    </LocationContext.Provider>
  );
};

// hook to use the current user location context
export const useLocation = () => {
  const context = useContext(LocationContext);
  if (!context) {
    throw new Error("useLocation must be used within a LocationProvider");
  }
  return context;
};
export default useLocation;
