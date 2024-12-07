import { useState } from "react";
import DailyDropDown from "./DailyDropDown";
import DailyChart from "./DailyChart";

export default function DailyFlood({
  dailyFloodData,
  isFetching,
  interpretDate,
}) {
  const [selectedForecastLength, setSelectedForecastLength] = useState("7");

  if (isFetching || !dailyFloodData) {
    return <div></div>; //Placeholder while loading
  }

  const monthFloodData = dailyFloodData.time.map((time, index) => ({
    time,
    discharge: dailyFloodData.river_discharge[index],
    maxDischarge: dailyFloodData.river_discharge_max[index],
  }));

  function handleSelectForecastLength(newLength) {
    setSelectedForecastLength(newLength);
  }

  return (
    <div className="flex min-h-full flex-col justify-between rounded-lg bg-white p-2">
      <div className="flex h-10 w-full justify-between">
        <span className="text-lg font-bold">River discharge m³/s</span>
        <DailyDropDown onSelectForecastLength={handleSelectForecastLength} />
      </div>
      <div className="h-64 md:h-72">
        <DailyChart
          chartData={monthFloodData}
          forecastLength={selectedForecastLength}
          interpretDate={interpretDate}
        />
      </div>
    </div>
  );
}
