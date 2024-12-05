import { useContext } from "react";
import { UserConfigContext } from "@/weather-tracker/user-config-context";

export default function DashboardHeader({
  currentData,
  isFetching,
  interpretWMO,
}) {
  const { userCityName } = useContext(UserConfigContext);

  if (isFetching || !currentData) {
    return <div></div>; //Placeholder while loading
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
            className={`wi ${interpretWMO(currentData.weather_code).icon} mb-4 text-7xl md:text-9xl`}
          ></i>
          <h2 className="text-base md:text-lg">
            {interpretWMO(currentData.weather_code).interpretation}
          </h2>
        </div>
      </div>
    </div>
  );
}
