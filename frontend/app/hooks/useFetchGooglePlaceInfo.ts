import { useState, useCallback } from 'react';
import { GOOGLE_MAPS_APIKEY } from "@/app/constants";

/**
 * Custom hook for interacting with Google Places API
 * @param {string} The google placeID we want information about
 */
const useFetchGooglePlacesInfo = ({ placeID }) => {
  
  //set the place
 const[place, setPlace] = useState(null);
  //set the placeInformattion
  const[placeInfo, setPlaceInfo] = useState(null);
  
  // Error handling
  const [error, setError] = useState(null);
  
  // Clear any previous errors before operations
  const clearError = useCallback(() => setError(null), []);
  // Clear any place before operations
  const clearPlace = useCallback(() => setPlace(null), []);

  
  /**
   * Fetch information about the point of interest  the placeID
   * @param {string} placeId Google Places API place_id
   * @returns {Promise<Object>} Place details object
   */
  const fetchPlaceDetails = useCallback(async (placeId) => {
    if (!placeId) {
      setError('No place ID provided');
      return null;
    }
    
    clearError();

    
    // Define which fields to request from the API
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
      'reviews',
      'types',
      'address_components',
      'geometry',
    ].filter(Boolean).join(',');
    
    try {
      // In a production app, this request should go through a backend proxy
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&fields=${fields}&key=${GOOGLE_MAPS_APIKEY}`
      );
      
      const data = await response.json();
      
      if (data.error_message) {
        throw new Error(data.error_message);
      }
      
      if (data.result) {
        setPlaceInfo(data.result);
        return data.result;
      }
      
      return null;
    } catch (err) {
      setError(`Failed to fetch place details: ${err.message}`);
      return null;
    } 
  }, [clearError]);

  


  /**
   * Reset all state in the hook
   */
  const reset = useCallback(() => {
    setPlace(null);
    clearError();
  }, [clearError]);

  // Return the hook's interface
  return {
    // State
    error,
    place,
    placeInfo,
    
    // Methods
    fetchPlaceDetails,
    clearError,
    clearPlace
  };
};

export default useFetchGooglePlacesInfo;