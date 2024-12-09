import { useContext } from "react";
import { Button } from "../ui/button";
import { useToast } from "@/hooks/use-toast";
import { MapPinned } from "lucide-react";
import { CitiesContext } from "@/weather-tracker/cities-context";
import { UserConfigContext } from "@/weather-tracker/user-config-context";

function roundToTwoDecimals(num) {
  return Math.round(num * 100) / 100;
}

export default function LocationButton({ ...props }) {
  const { setUserLocation } = useContext(UserConfigContext);
  const { cities } = useContext(CitiesContext);
  const { toast } = useToast();

  function handleFetchUserLoc() {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        //round position and check if existing in cities context
        let currentCityName = "";
        let currentLat = roundToTwoDecimals(
          parseFloat(position.coords.latitude),
        );
        let currentLon = roundToTwoDecimals(
          parseFloat(position.coords.longitude),
        );

        const matchedCity = cities.find(
          (city) =>
            roundToTwoDecimals(parseFloat(city.lat)) === currentLat &&
            roundToTwoDecimals(parseFloat(city.lon)) === currentLon,
        );

        if (matchedCity) {
          setUserLocation(matchedCity);
        } else {
          currentCityName = `${currentLat}, ${currentLon}`;
          setUserLocation({
            name: currentCityName,
            lat: currentLat,
            lon: currentLon,
          });
        }

        toast({
          title: "Location updated successfully.",
          description: `${!matchedCity ? currentCityName : matchedCity.name}`,
        });
      },
      (err) => {
        toast({
          variant: "destructive",
          title: `Error: ${err.message}`,
          description:
            "There was a problem fetching your location. Please try again.",
        });
      },
    );
  }
  return (
    <Button
      className="border-[1px] bg-background hover:bg-accent hover:text-primary dark:border-input dark:hover:text-foreground"
      onClick={handleFetchUserLoc}
      {...props}
    >
      <MapPinned />
      Use Current Location
    </Button>
  );
}
