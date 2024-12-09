import { useState, useEffect, useContext } from "react";
import { UserConfigContext } from "@/weather-tracker/user-config-context";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/Sidebar/AppSidebar";
import { Toaster } from "@/components/ui/toaster";
import { useToast } from "@/hooks/use-toast";
import DashboardHeader from "./DashboardHeader";
import DailyWeather from "./DailyWeather";
import HourlyForecast from "./Hourly/HourlyForecast";
import DailyFlood from "./DailyFlood/DailyFlood";
import DailyAir from "./DailyAir/DailyAir";

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

function interpretDate(dateString, format) {
  const date = new Date(dateString);

  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const fullMonths = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const month = months[date.getMonth()];
  const fullMonth = fullMonths[date.getMonth()];
  const day = date.getDate();
  const year = date.getFullYear();
  const hours = date.getHours();
  const minutes = date.getMinutes().toString().padStart(2, "0"); // Add leading zero to minutes if needed

  // Format hours into 12-hour clock and determine AM/PM
  const period = hours >= 12 ? "PM" : "AM";
  const hour12 = hours % 12 || 12; // Convert 0 or 24-hour to 12-hour format

  // Combine into the desired format
  if (format === "monthDate") {
    return `${month} ${day}`;
  }
  if (format === "fullMonthDate") {
    return `${fullMonth} ${day}`;
  }
  if (format === "time") {
    return `${hour12}:${minutes} ${period}`;
  }
  return `${month} ${day}, ${year} ${hour12}:${minutes} ${period}`;
}

export default function Dashboard({ ...props }) {
  const { userCityName, userLat, userLon, theme } =
    useContext(UserConfigContext);
  const [apiData, setApiData] = useState({ weather: "", air: "", flood: "" });
  const [isFetching, setIsFetching] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    async function fetchData() {
      if (!userLat || !userLon) return;
      setIsFetching(true);
      const weatherAPI = `https://api.open-meteo.com/v1/forecast?latitude=${userLat}&longitude=${userLon}&current=temperature_2m,apparent_temperature,weather_code&hourly=temperature_2m,relative_humidity_2m,apparent_temperature,precipitation_probability&daily=weather_code,temperature_2m_max,temperature_2m_min,apparent_temperature_max,apparent_temperature_min,precipitation_probability_max&timezone=auto`;
      const airAPI = `https://air-quality-api.open-meteo.com/v1/air-quality?latitude=${userLat}&longitude=${userLon}&hourly=pm10,pm2_5,nitrogen_dioxide,ozone,us_aqi&timezone=auto`;
      const floodAPI = `https://flood-api.open-meteo.com/v1/flood?latitude=${userLat}&longitude=${userLon}&daily=river_discharge,river_discharge_max&forecast_days=31`;

      try {
        const [weatherResponse, airResponse, floodResponse] = await Promise.all(
          [fetch(weatherAPI), fetch(airAPI), fetch(floodAPI)],
        );
        if (!weatherResponse.ok || !airResponse.ok || !floodResponse.ok) {
          throw new Error("Failed to fetch data.");
        }
        const [weatherData, airData, floodData] = await Promise.all([
          weatherResponse.json(),
          airResponse.json(),
          floodResponse.json(),
        ]);
        setApiData({ weather: weatherData, air: airData, flood: floodData });

        setIsFetching(false);
      } catch (err) {
        toast({
          variant: "destructive",
          title: `Uh oh! Error: ${err.message}`,
          description: "There was a problem with your request.",
          action: (
            <ToastAction
              altText="Reload page"
              onClick={() => window.location.reload()}
            >
              Reload page
            </ToastAction>
          ),
        });
        console.log(err);
      }
    }
    fetchData();
  }, [userLat, userLon]);

  return (
    <SidebarProvider>
      <AppSidebar />
      <main
        {...props}
        className="flex w-screen flex-col gap-1 bg-background md:flex-row"
      >
        <div className="gap-1md:w-2/3 flex min-h-screen w-full flex-col">
          <header className="h-1/4 md:h-2/6">
            <SidebarTrigger className="dark:text-accent dark:hover:bg-[#102b41]" />
            <DashboardHeader
              currentData={apiData.weather.current}
              isFetching={isFetching}
              interpretWMO={interpretWMO}
            />
          </header>
          <section className="h-1/3 p-1 md:h-2/6">
            <DailyWeather
              dailyData={apiData.weather.daily}
              isFetching={isFetching}
              interpretWMO={interpretWMO}
              interpretDate={interpretDate}
            />
          </section>
          <section className="h-2/4 p-1 md:h-1/3">
            <HourlyForecast
              hourlyData={{
                weather: apiData.weather.hourly,
                airQuality: apiData.air.hourly,
              }}
              isFetching={isFetching}
              interpretDate={interpretDate}
            />
          </section>
        </div>

        <aside className="flex min-h-96 w-full flex-col gap-1 border-solid md:w-1/3 md:flex-1">
          <section className="h-full p-1 md:h-3/5">
            <DailyAir
              dailyAirData={apiData.air.hourly}
              isFetching={isFetching}
              interpretDate={interpretDate}
            />
          </section>
          <section className="h-full p-1 md:h-2/5">
            <DailyFlood
              dailyFloodData={apiData.flood.daily}
              isFetching={isFetching}
              interpretDate={interpretDate}
            />
          </section>
        </aside>
      </main>
      <Toaster />
    </SidebarProvider>
  );
}
