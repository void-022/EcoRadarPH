import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import CircularProgress from "./CircularProgress";

export default function AirQualityCard({ date, aqi, pm10, pm25, no2, o3 }) {
  const getAQIColor = (aqi) => {
    if (aqi <= 50) return "text-green-500";
    if (aqi <= 100) return "text-yellow-500";
    if (aqi <= 150) return "text-orange-500";
    if (aqi <= 200) return "text-red-500";
    if (aqi <= 300) return "text-purple-500";
    return "text-rose-700";
  };

  return (
    <Card className="mb-2 w-full">
      <CardHeader className="-my-2">
        <CardTitle>{date}</CardTitle>
      </CardHeader>
      <CardContent className="-mb-1 flex flex-wrap items-center justify-between">
        <div className="mb-4 flex flex-col items-center sm:mb-0">
          <span className="mb-1 text-sm font-semibold">Air Quality Index</span>
          <CircularProgress
            value={aqi}
            max={500}
            color={getAQIColor(aqi)}
            strokeWidth={"6"}
          />
        </div>
        <div className="grid grid-cols-2 gap-4 text-center sm:grid-cols-4 sm:gap-5">
          <div>
            <span className="text-sm font-semibold">
              PM<sub>10</sub>
            </span>
            <p className="text-lg">{pm10} µg/m³</p>
          </div>
          <div>
            <span className="text-sm font-semibold">
              PM<sub>2.5</sub>
            </span>
            <p className="text-lg">{pm25} µg/m³</p>
          </div>
          <div>
            <span className="text-sm font-semibold">
              NO<sub>2</sub>
            </span>
            <p className="text-lg">{no2} µg/m³</p>
          </div>
          <div>
            <span className="text-sm font-semibold">
              O<sub>3</sub>
            </span>
            <p className="text-lg">{o3} µg/m³</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
