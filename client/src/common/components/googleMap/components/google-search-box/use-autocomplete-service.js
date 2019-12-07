import { useCallback, useRef, useState } from "react";
import debounce from "lodash/debounce";

const TYPES = ["establishment"];
const DEFAULT_PREDICTIONS = [];

export default function useAutocompleteService(google, debounceDuration = 300) {
  const serviceRef = useRef(new google.maps.places.AutocompleteService());

  const [isLoading, setIsLoading] = useState(false);
  const [predictions, setPredictions] = useState(DEFAULT_PREDICTIONS);

  const fetchPredictions = useCallback(
    debounce(input => {
      if (input !== "") {
        setIsLoading(true);
        serviceRef.current.getPlacePredictions(
          { input, types: TYPES },
          (predictions, status) => {
            setIsLoading(false);
            setPredictions(predictions);
          }
        );
      } else {
        setPredictions(DEFAULT_PREDICTIONS);
      }
    }, debounceDuration),
    [debounceDuration, google]
  );

  return { fetchPredictions, isLoading, predictions };
}
