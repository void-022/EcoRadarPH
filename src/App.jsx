import { useContext, useEffect } from "react";
import { CitiesContext } from "./weather-tracker/cities-context";
import { UserConfigContext } from "./weather-tracker/user-config-context";
import Splashscreen from "./components/Splashscreen";
import Dashboard from "./components/Dashboard/Dashboard";

function checkTheme(theme) {
  if (theme == "system") {
    const newTheme = window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";
    console.log(newTheme);
    return newTheme;
  } else {
    return theme;
  }
}

export default function App() {
  const { isLoadingCities, error } = useContext(CitiesContext);
  const { theme } = useContext(UserConfigContext);

  useEffect(() => {
    const html = document.documentElement;
    html.classList.remove("dark", "light");
    html.classList.add(checkTheme(theme));
  }, [theme]);

  return (
    <div>
      {(isLoadingCities || error) && <Splashscreen error={error} />}
      {!isLoadingCities && !error && <Dashboard />}
    </div>
  );
}
