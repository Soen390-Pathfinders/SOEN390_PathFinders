import { useState, useCallback, useEffect } from "react";
import { GOOGLE_MAPS_APIKEY } from "@/app/constants";

const useFetchGooglePlacesInfo = ({ placeID, searchRadius }) => {
  const [place, setPlace] = useState(placeID);
  const [placeInfo, setPlaceInfo] = useState(null);
  const [error, setError] = useState<string | null>(null);
  const [filteredPlaces, setFilteredPlaces] = useState([]);

  useEffect(() => {
    setPlace(placeID);
  }, [placeID]);

  const fetchPlaceInfo = useCallback(
    async (placeToFetch) => {
      const placeIdToUse = placeToFetch || place;
      setError(null);

      const fields = [
        "name",
        "rating",
        "formatted_phone_number",
        "international_phone_number",
        "formatted_address",
        "website",
        "url",
        "opening_hours",
        "price_level",
        "types",
        "address_components",
        "geometry",
      ].join(",");

      try {
        const response = await fetch(
          `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeIdToUse}&fields=${fields}&key=${GOOGLE_MAPS_APIKEY}`
        );
        const data = await response.json();

        if (data.error_message) throw new Error(data.error_message);

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
    },
    [place]
  );

  useEffect(() => {
    if (place) fetchPlaceInfo(place);
  }, [place, fetchPlaceInfo]);

  const clearError = useCallback(() => setError(null), []);

  const clearPlace = useCallback(() => {
    setPlace(null);
    setPlaceInfo(null);
    setError(null);
  }, []);

  const typeMap = {
    Coffee: { type: "cafe", keyword: "coffee" },
    Restaurants: { type: "restaurant", keyword: "" },
    Parks: { type: "park", keyword: "" },
    Bakeries: { type: "bakery", keyword: "bakery" },
    Pharmacies: { type: "pharmacy", keyword: "" },
    Bars: { type: "bar", keyword: "" },
    "Ice Cream": { type: "restaurant", keyword: "ice cream" },
    "Dessert Shops": { type: "restaurant", keyword: "dessert" },
    "Juice Bars": { type: "restaurant", keyword: "juice bar" },
  };

  const fetchPlacesByCategories = useCallback(
    async (filters, location) => {
      const defaultFilters = [
        "Restaurants",
        "Coffee",
        "Bars",
        "Bakeries",
        "Parks",
        "Pharmacies",
        "Ice Cream",
        "Dessert Shops",
        "Juice Bars",
      ];

      const filtersToUse = filters?.length ? filters : defaultFilters;
      const allPlaces = [];

      try {
        for (const filter of filtersToUse) {
          const config = typeMap[filter] || { type: "restaurant", keyword: "" };
          const keywordParam = config.keyword
            ? `&keyword=${encodeURIComponent(config.keyword)}`
            : "";

          const url = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${location.latitude},${location.longitude}&radius=${searchRadius}&type=${config.type}${keywordParam}&key=${GOOGLE_MAPS_APIKEY}`;

          const response = await fetch(url);
          const data = await response.json();

          if (data?.results?.length > 0) {
            const tagged = data.results.map((p) => ({
              ...p,
              filter,
            }));
            allPlaces.push(...tagged);
          }
        }

        setFilteredPlaces(allPlaces);
        return allPlaces;
      } catch (err) {
        console.error("Error fetching places:", err);
        setError(`Failed to fetch places: ${err.message}`);
        setFilteredPlaces([]);
        return [];
      }
    },
    [searchRadius]
  );

  return {
    place,
    placeInfo,
    error,
    fetchPlaceInfo,
    clearError,
    clearPlace,
    filteredPlaces,
    fetchPlacesByCategories,
  };
};

export default useFetchGooglePlacesInfo;
