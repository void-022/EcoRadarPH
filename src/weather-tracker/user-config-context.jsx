import { createContext, useState, useEffect } from "react";

export const UserConfigContext = createContext({
  userCityName: "Manila",
  userLat: 14.6,
  userLon: 120.98,
  theme: "system",
  setUserLocation: () => {},
  setAppTheme: () => {},
});

function getStoredConfig() {
  return (
    JSON.parse(localStorage.getItem("userConfig")) || {
      userCityName: "Manila",
      userLat: 14.6,
      userLon: 120.98,
      theme: "system",
    }
  );
}

export default function UserConfigContextProvider({ children }) {
  const storedConfig = getStoredConfig();

  const [configState, setConfigState] = useState({
    userCityName: storedConfig.userCityName,
    userLat: storedConfig.userLat,
    userLon: storedConfig.userLon,
    theme: storedConfig.theme,
  });

  function handleUpdateUserLocation(city) {
    let { name, lat, lon } = city;
    lat = Math.round(lat * 100) / 100;
    lon = Math.round(lon * 100) / 100;

    setConfigState((prevConfigState) => {
      const updatedConfigState = {
        ...prevConfigState,
        userCityName: name,
        userLat: lat,
        userLon: lon,
      };
      localStorage.setItem("userConfig", JSON.stringify(updatedConfigState));
      return updatedConfigState;
    });
  }

  function handleUpdateAppTheme(theme) {
    setConfigState((prevConfigState) => {
      const updatedConfigState = {
        ...prevConfigState,
        theme: theme,
      };
      localStorage.setItem("userConfig", JSON.stringify(updatedConfigState));
      return updatedConfigState;
    });
  }

  const ctxValue = {
    userCityName: configState.userCityName,
    userLat: configState.userLat,
    userLon: configState.userLon,
    theme: configState.theme,
    setUserLocation: handleUpdateUserLocation,
    setAppTheme: handleUpdateAppTheme,
  };

  return (
    <UserConfigContext.Provider value={ctxValue}>
      {children}
    </UserConfigContext.Provider>
  );
}
