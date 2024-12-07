import AirQualityCard from "./AirQualityCard";

function calculateDailyMean(data) {
  // Group data by date
  const groupedData = data.reduce((acc, entry) => {
    if (!acc[entry.date]) {
      acc[entry.date] = [];
    }
    acc[entry.date].push(entry); // Push the entire entry
    return acc;
  }, {});

  // Calculate the mean for each key for each date
  return Object.entries(groupedData).map(([date, entries]) => {
    const keys = ["aqi", "pm10", "pm25", "no2", "o3"];
    const meanValues = keys.reduce((acc, key) => {
      const sum = entries.reduce(
        (total, entry) => total + (entry[key] || 0),
        0,
      );
      acc[key] = Math.round(sum / entries.length); // Round mean values
      return acc;
    }, {});
    return { date, ...meanValues }; // Return date and mean values
  });
}

export default function DailyAir({ dailyAirData, isFetching, interpretDate }) {
  if (isFetching || !dailyAirData) {
    return <div></div>; // Placeholder while loading
  }

  let dailyAirQuality = dailyAirData.time.map((time, index) => ({
    date: interpretDate(time, "fullMonthDate"),
    aqi: dailyAirData.us_aqi[index],
    pm10: dailyAirData.pm10[index],
    pm25: dailyAirData.pm2_5[index],
    no2: dailyAirData.nitrogen_dioxide[index],
    o3: dailyAirData.ozone[index],
  }));

  dailyAirQuality = calculateDailyMean(dailyAirQuality);
  console.log(dailyAirQuality);

  return (
    <div className="flex h-full max-h-full flex-col justify-between rounded-lg bg-slate-700 p-4">
      <div className="mx-auto w-full">
        <h1 className="mb-3 text-xl font-bold">Air Quality Forecast</h1>
        <div className="max-h-[480px] overflow-y-auto">
          {dailyAirQuality.map((day) => (
            <AirQualityCard key={day.date} {...day} />
          ))}
        </div>
      </div>
    </div>
  );
}
