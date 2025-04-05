import { useState, useCallback, useEffect } from 'react';
import { GOOGLE_MAPS_APIKEY } from "@/app/constants";

/**
 * Custom hook for interacting with Google Places API
 * @param {string} The google placeID we want information about
 */
const useFetchGooglePlacesInfo = ({ placeID, searchRadius}) => {
  
  //set the place
 const[place, setPlace] =  useState(placeID);
  //set the placeInformation
  const[placeInfo, setPlaceInfo] = useState(null);
  // Error handling
  const [error, setError] =  useState<string | null>(null);
  const [filteredPlaces, setFilteredPlaces] = useState([]);

 // Update place whenever placeID changes in the hook call
 useEffect(() => {
    setPlace(placeID);
  }, [placeID]);

//Use the function is a custom place or the one from the hook's state
const fetchPlaceInfo = useCallback(async (placeToFetch) => {
    //fall back to the state if there were no argument
    const placeIdToUse = placeToFetch || place;
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
      } 
    }, [place]);
  
// Call fetchPlaceInfo whenever place changes
useEffect(() => {
    if (place) {
      fetchPlaceInfo(place);
    }
  }, [place, fetchPlaceInfo]);

    //reset the error
    const clearError = useCallback(() => setError(null), []);

   //reset everything
   const clearPlace = useCallback(() => {
     setPlace(null);
     setPlaceInfo(null);
     setError(null);
   }, []);

  //Convert filter names to Google Places API types
   const getGooglePlacesType = (filter) => {
     const typeMap = {
       "Coffee": "cafe",
       "Restaurants": "restaurant",
       "Parks": "park",
       "Bakeries": "bakery",
       "Pharmacies": "pharmacy",
       "Bars": "bar",
       "Ice Cream": "ice_cream_parlor",
       "Dessert Shops": "dessert_shop",
       "Juice Bars": "juice_bar"
     };
     return typeMap[filter] || filter.toLowerCase().replace(" ", "_");
   };

   // Fetch places based on selected filters
   const fetchPlacesByCategories = useCallback(async (filters, location) => {
     if (!filters || filters.length === 0) {
       setFilteredPlaces([]);
       return [];
     }

     try {
       const places = [];
       const seenPlaceIds = new Set();  // holds all the places that have been added to the map
       // Process each filter sequentially
       for (const filter of filters) {
         const type = getGooglePlacesType(filter);

         const response = await fetch(
           `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${location.latitude},${location.longitude}&radius=${searchRadius}&type=${type}&key=${GOOGLE_MAPS_APIKEY}`
         );

         const data = await response.json();

         if (data.results) {
           // Add each place to our array with a filter property
           data.results.forEach(place => {

            if (!seenPlaceIds.has(place.place_id)) {
              seenPlaceIds.add(place.place_id); //adds the POI to the set that will be checke dot rpevent duplicates
             places.push({
               ...place,
               filter: filter // Store which filter found this place
             });
            }
           });
         }
       }

       // Update state with all the places we found
       setFilteredPlaces(places);
       return places;
     } catch (err) {
       console.error("Error fetching filtered places:", err);
       setError(`Failed to fetch filtered places: ${err.message}`);
       return [];
     }
   }, [searchRadius]);

   return {
     // Existing state and functions
     place,
     placeInfo,
     error,
     fetchPlaceInfo,
     clearError,
     clearPlace,
     // New state and functions for filtering
     filteredPlaces,
     fetchPlacesByCategories
   };
 };
export default useFetchGooglePlacesInfo;