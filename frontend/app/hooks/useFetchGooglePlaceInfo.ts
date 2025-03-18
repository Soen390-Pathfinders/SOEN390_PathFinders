import { useState, useCallback, useEffect } from 'react';
import { GOOGLE_MAPS_APIKEY } from "@/app/constants";

/**
 * Custom hook for interacting with Google Places API
 * @param {string} The google placeID we want information about
 */
const useFetchGooglePlacesInfo = ({ placeID }) => {
  
  //set the place
 const[place, setPlace] =  useState(placeID);
  //set the placeInformation
  const[placeInfo, setPlaceInfo] = useState(null);
  // Error handling
  const [error, setError] =  useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

 // Update place whenever placeID changes in the hook call
 useEffect(() => {
    console.log("placeID changed to:", placeID);
    setPlace(placeID);
  }, [placeID]);

//Use the function is a custom place or the one from the hook's state
const fetchPlaceInfo = useCallback(async (placeToFetch) => {
    //fall back to the state if there were no argument
    const placeIdToUse = placeToFetch || place;


    console.log("Starting to fetch details for:", placeIdToUse);
    setIsLoading(true);
    setError(null);    
    // The fields to be fetched from google place API
    const fields = [
        'name',
        'rating',
        'formatted_phone_number',
        'international_phone_number',
        'formatted_address',
        'website',
        'url',
        'opening_hours',
        'price_level',
      //  'reviews',
        'types',
        'address_components',
        'geometry',
      ].join(',');

      try {
        console.log("Making API call for place:", placeIdToUse);
        const response = await fetch(
          `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeIdToUse}&fields=${fields}&key=${GOOGLE_MAPS_APIKEY}`
        );
        
        const data = await response.json();
        console.log("API response received:", data);
        
        if (data.error_message) {
          throw new Error(data.error_message);
        }
        
        if (data.result) {
          setPlaceInfo(data.result);
          return data.result;
        } else {
          setError("No results found");
          return null;
        }
      } catch (err) {
        console.error("Error in fetch:", err);
        setError(`Failed to fetch place details: ${err.message}`);
        return null;
      } finally {
        setIsLoading(false);
      }
    }, [place]);
  
// Call fetchPlaceInfo whenever place changes
useEffect(() => {
    if (place) {
      fetchPlaceInfo(place);
    }
  }, [place, fetchPlaceInfo]);

   //cleanup and utility functions
   const clearError = useCallback(() => setError(null), []);
   const clearPlace = useCallback(() => {
     setPlace(null);
     setPlaceInfo(null);
     setError(null);
   }, []);

   return {
    //state
    place,
    placeInfo,
    error,
    isLoading,
    //functions
    fetchPlaceInfo,
    clearError,
    clearPlace
  };
};
export default useFetchGooglePlacesInfo;