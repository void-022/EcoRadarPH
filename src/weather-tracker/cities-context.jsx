import { createContext, useState, useEffect } from "react";
export const CitiesContext = createContext({
  isLoadingCities: true,
  error: {},
  cities: [],
});

export default function CitiesContextProvider({ children }) {
  const [isLoadingCities, setIsLoadingCities] = useState(true);
  const [errorState, setErrorState] = useState(null);
  const [citiesState, setCitiesState] = useState([]);

  useEffect(() => {
    async function fetchCities() {
      try {
        const response = await fetch("/CITIES.json");
        // await new Promise((resolve) => setTimeout(resolve, 3000)); //use to simulate loading splashscreen or use network throttling on browser
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const citiesArray = await response.json();
        setCitiesState(citiesArray);
      } catch (error) {
        console.error("Error fetching cities data", error);
        setErrorState(error);
      } finally {
        setIsLoadingCities(false);
      }
    }

    fetchCities();
  }, []);

  const ctxValue = {
    isLoadingCities: isLoadingCities,
    error: errorState,
    cities: citiesState,
  };

  return (
    <CitiesContext.Provider value={ctxValue}>{children}</CitiesContext.Provider>
  );
}
