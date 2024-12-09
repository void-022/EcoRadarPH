import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function HourlyDropDown({ onSelectParameter }) {
  return (
    <Select onValueChange={onSelectParameter}>
      <SelectTrigger className="w-[200px] md:w-[280px]">
        <SelectValue placeholder="Select a parameter" />
      </SelectTrigger>
      <SelectContent className="text-foreground">
        <SelectGroup>
          <SelectLabel>Weather</SelectLabel>
          <SelectItem
            value={JSON.stringify({
              category: "hourlyWeather",
              parameter: "temperature_2m",
              label: "Temperature ",
            })}
          >
            Temperature &deg;C
          </SelectItem>
          <SelectItem
            value={JSON.stringify({
              category: "hourlyWeather",
              parameter: "apparent_temperature",
              label: "Heat Index",
            })}
          >
            Heat Index &deg;C
          </SelectItem>
          <SelectItem
            value={JSON.stringify({
              category: "hourlyWeather",
              parameter: "relative_humidity_2m",
              label: "Humidity",
            })}
          >
            Humidity %
          </SelectItem>
          <SelectItem
            value={JSON.stringify({
              category: "hourlyWeather",
              parameter: "precipitation_probability",
              label: "Precipitation",
            })}
          >
            Precipitation Probability %
          </SelectItem>
        </SelectGroup>

        <SelectGroup>
          <SelectLabel>Air Quality</SelectLabel>
          <SelectItem
            value={JSON.stringify({
              category: "hourlyAirQuality",
              parameter: "pm10",
              label: "Particulate Matter (PM10)",
            })}
          >
            Particulate Matter (PM<sub>10</sub>)
          </SelectItem>
          <SelectItem
            value={JSON.stringify({
              category: "hourlyAirQuality",
              parameter: "pm2_5",
              label: "Particulate Matter (PM2.5)",
            })}
          >
            Particulate Matter (PM<sub>2.5</sub>)
          </SelectItem>
          <SelectItem
            value={JSON.stringify({
              category: "hourlyAirQuality",
              parameter: "nitrogen_dioxide",
              label: "Nitrogen Dioxide",
            })}
          >
            Nitrogen Dioxide (NO<sub>2</sub>) μg/m³
          </SelectItem>
          <SelectItem
            value={JSON.stringify({
              category: "hourlyAirQuality",
              parameter: "ozone",
              label: "Ozone",
            })}
          >
            Ozone (O<sub>3</sub>) μg/m³
          </SelectItem>
          <SelectItem
            value={JSON.stringify({
              category: "hourlyAirQuality",
              parameter: "us_aqi",
              label: "Air Quality Index",
            })}
          >
            Air Quality Index
          </SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
