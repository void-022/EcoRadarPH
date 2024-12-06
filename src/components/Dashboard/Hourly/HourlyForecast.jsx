import { useState } from "react";
import HourlyDropDown from "./HourlyDropDown";
import HourlyChart from "./HourlyChart";

export default function HourlyForecast({
  hourlyData,
  isFetching,
  interpretDate,
}) {
  const [selectedParameter, setSelectedParameter] = useState({
    category: "hourlyWeather",
    parameter: "temperature_2m",
    label: "Temperature",
  });
  if (isFetching || !hourlyData) {
    return <div></div>; //Placeholder while loading
  }
  const hourlyWeather = hourlyData.weather.time.map((time, index) => ({
    time,
    temperature_2m: hourlyData.weather.temperature_2m[index],
    relative_humidity_2m: hourlyData.weather.relative_humidity_2m[index],
    apparent_temperature: hourlyData.weather.apparent_temperature[index],
    precipitation_probability:
      hourlyData.weather.precipitation_probability[index],
  }));
  const hourlyAirQuality = hourlyData.airQuality.time.map((time, index) => ({
    time,
    pm10: hourlyData.airQuality.pm10[index],
    pm2_5: hourlyData.airQuality.pm2_5[index],
    nitrogen_dioxide: hourlyData.airQuality.nitrogen_dioxide[index],
    ozone: hourlyData.airQuality.ozone[index],
    us_aqi: hourlyData.airQuality.us_aqi[index],
  }));

  function handleSelectParameter(newParameter) {
    newParameter = JSON.parse(newParameter);
    setSelectedParameter({
      category: newParameter.category,
      parameter: newParameter.parameter,
      label: newParameter.label,
    });
  }

  const chartData =
    selectedParameter.category === "hourlyWeather"
      ? hourlyWeather.map((hourlyData) => ({
          time: hourlyData.time,
          [selectedParameter.label]: hourlyData[selectedParameter.parameter],
        }))
      : hourlyAirQuality.map((hourlyData) => ({
          time: hourlyData.time,
          [selectedParameter.label]: hourlyData[selectedParameter.parameter],
        }));

  return (
    <div className="flex h-full max-h-full flex-col justify-between rounded-lg bg-white p-2">
      <div className="flex h-10 w-full justify-between">
        <span className="text-lg font-bold">
          Hourly {selectedParameter.label}
        </span>
        <HourlyDropDown onSelectParameter={handleSelectParameter} />
      </div>
      <div className="h-72 md:h-56">
        <HourlyChart
          chartData={chartData}
          chartLabel={selectedParameter.label}
          interpretDate={interpretDate}
        />
      </div>
    </div>
  );
}
