import { useState, useEffect, useContext } from "react";
import { UserConfigContext } from "@/weather-tracker/user-config-context";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/Sidebar/AppSidebar";
import { Toaster } from "@/components/ui/toaster";
import { useToast } from "@/hooks/use-toast";
import DashboardHeader from "./DashboardHeader";

export default function Dashboard({ ...props }) {
  const { userCityName, userLat, userLon } = useContext(UserConfigContext);
  const [apiData, setApiData] = useState({ weather: "", air: "", flood: "" });
  const [isFetching, setIsFetching] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    async function fetchData() {
      if (!userLat || !userLon) return;
      setIsFetching(true);
      const weatherAPI = `https://api.open-meteo.com/v1/forecast?latitude=${userLat}&longitude=${userLon}&current=temperature_2m,apparent_temperature,weather_code&hourly=temperature_2m,relative_humidity_2m,apparent_temperature,precipitation_probability&daily=weather_code,temperature_2m_max,temperature_2m_min,apparent_temperature_max,apparent_temperature_min,precipitation_probability_max&forecast_days=1`;
      const airAPI = `https://air-quality-api.open-meteo.com/v1/air-quality?latitude=${userLat}&longitude=${userLon}&hourly=pm10,pm2_5,nitrogen_dioxide,ozone,us_aqi&forecast_days=3`;
      const floodAPI = `https://flood-api.open-meteo.com/v1/flood?latitude=${userLat}&longitude=${userLon}&daily=river_discharge_mean,river_discharge_max&forecast_days=31`;

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
        console.log(weatherData);
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
      <main {...props} className="flex w-screen flex-col gap-2 md:flex-row">
        <div className="md:flex-2 flex min-h-screen w-full flex-col gap-2 md:w-2/3">
          <header className="h-1/3 bg-neutral-600 md:h-2/6">
            <SidebarTrigger />
            <DashboardHeader
              currentData={apiData.weather.current}
              isFetching={isFetching}
            />
          </header>
          <section className="h-1/3 bg-slate-400 md:h-2/6"></section>
          <section className="h-1/3 bg-neutral-600 md:h-2/6"></section>
        </div>

        <aside className="flex min-h-96 w-full flex-col gap-2 border-solid md:w-1/3 md:flex-1">
          <section className="h-3/5 bg-red-300">hallo</section>
          <section className="h-2/5 bg-slate-400">hallo</section>
        </aside>
      </main>
      <Toaster />
    </SidebarProvider>
  );
}
