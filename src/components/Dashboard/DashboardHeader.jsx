import { useContext } from "react";
import { UserConfigContext } from "@/weather-tracker/user-config-context";

function interpretWMO(WMO) {
  switch (WMO) {
    case 0:
      return { interpretation: "Clear sky", icon: "wi-day-sunny" };
    case 1:
      return { interpretation: "Partly cloudy", icon: "wi-cloudy" };
    case 2:
      return { interpretation: "Partly cloudy", icon: "wi-cloudy" };
    case 3:
      return { interpretation: "Partly cloudy", icon: "wi-cloudy" };
    case 45:
      return { interpretation: "Foggy", icon: "wi-fog" };
    case 48:
      return { interpretation: "Foggy", icon: "wi-fog" };
    case 51:
      return { interpretation: "Light drizzle", icon: "wi-sprinkle" };
    case 53:
      return { interpretation: "Moderate drizzle", icon: "wi-sleet" };
    case 55:
      return { interpretation: "Heavy drizzle", icon: "wi-sleet" };
    case 56:
      return { interpretation: "Light freezing drizzle", icon: "wi-snow-wind" };
    case 57:
      return {
        interpretation: "Moderate freezing drizzle",
        icon: "wi-snow-wind",
      };
    case 61:
      return { interpretation: "Light rain", icon: "wi-rain" };
    case 63:
      return { interpretation: "Moderate rain", icon: "wi-rain" };
    case 65:
      return { interpretation: "Heavy rain", icon: "wi-rain" };
    case 66:
      return { interpretation: "Light freezing rain", icon: "wi-snow-wind" };
    case 67:
      return { interpretation: "Moderate freezing rain", icon: "wi-snow-wind" };
    case 71:
      return { interpretation: "Light snow fall", icon: "wi-snow" };
    case 73:
      return { interpretation: "Moderate snow fall", icon: "wi-snow" };
    case 75:
      return { interpretation: "Heavy snow fall", icon: "wi-snow" };
    case 77:
      return { interpretation: "Snow grains", icon: "wi-snow" };
    case 80:
      return { interpretation: "Light rain showers", icon: "wi-showers" };
    case 81:
      return { interpretation: "Moderate rain showers", icon: "wi-showers" };
    case 82:
      return { interpretation: "Heavy rain showers", icon: "wi-showers" };
    case 85:
      return { interpretation: "Light snow showers", icon: "wi-snow-wind" };
    case 86:
      return { interpretation: "Heavy snow showers", icon: "wi-snow-wind" };
    case 95:
      return {
        interpretation: "Moderate thunderstorm",
        icon: "wi-storm-showers",
      };
    case 96:
      return {
        interpretation: "Thunderstorm with moderate hail",
        icon: "wi-thunderstorm",
      };
    case 99:
      return {
        interpretation: "Thunderstorm with heavy hail",
        icon: "wi-thunderstorm",
      };
    default:
      return { interpretation: "", icon: "" };
  }
}

export default function DashboardHeader({ currentData, isFetching }) {
  const { userCityName } = useContext(UserConfigContext);

  if (isFetching || !currentData) {
    return <div>Placeholder while loading</div>;
  }
  return (
    <div className="flex min-h-64 flex-row p-6 pt-0 md:pl-11 md:pt-4">
      <div className="flex flex-1 flex-col justify-around md:justify-between">
        <h1 className="text-2xl font-bold md:text-4xl">
          {userCityName.toUpperCase()}
          <p className="text-sm font-normal italic md:text-base">
            heat index: {currentData.apparent_temperature}&deg;C
          </p>
        </h1>
        <p className="text-6xl md:text-8xl">
          {currentData.temperature_2m}&deg;C&nbsp;
        </p>
      </div>

      <div className="flex flex-1 flex-col items-end justify-center md:items-center">
        <div className="pr-4 text-center md:pr-0">
          <i
            className={`wi ${interpretWMO(currentData.weather_code).icon} mb-2 text-7xl md:text-9xl`}
          ></i>
          <h2 className="text-base md:text-lg">
            {interpretWMO(currentData.weather_code).interpretation}
          </h2>
        </div>
      </div>
    </div>
  );
}
