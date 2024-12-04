import { useContext } from "react";
import { CitiesContext } from "./weather-tracker/cities-context";
import Splashscreen from "./components/Splashscreen";
import Dashboard from "./components/Dashboard/Dashboard";

export default function App() {
  const { isLoadingCities, error } = useContext(CitiesContext);
  return (
    <>
      {(isLoadingCities || error) && <Splashscreen error={error} />}
      {!isLoadingCities && !error && <Dashboard />}
    </>
  );
}
