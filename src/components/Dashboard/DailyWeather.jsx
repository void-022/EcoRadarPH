import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";

export default function DailyWeather({ dailyData, isFetching, interpretWMO }) {
  if (isFetching || !dailyData) {
    return <div></div>; //Placeholder while loading
  }
  const dailyWeather = dailyData.time.map((date, index) => ({
    date,
    weatherCode: dailyData.weather_code[index],
    avgTemp:
      (Math.round(
        (dailyData.temperature_2m_max[index] +
          dailyData.temperature_2m_max[index]) /
          2,
      ) *
        100) /
      100,
    avgApparentTemp:
      Math.round(
        ((dailyData.apparent_temperature_max[index] +
          dailyData.apparent_temperature_min[index]) /
          2) *
          100,
      ) / 100,
    precipitationProb: dailyData.precipitation_probability_max[index],
  }));

  return (
    <div className="flex min-h-full items-center justify-center rounded-lg bg-slate-900 p-1 px-14">
      <Carousel
        opts={{
          align: "start",
        }}
        className="top-0 w-full max-w-full"
      >
        <CarouselContent>
          {dailyWeather.map((day) => (
            <CarouselItem
              key={day.date}
              className="basis-1/2 md:basis-1/3 lg:basis-1/4"
            >
              <Card className="h-full">
                <CardContent className="flex items-center justify-center p-6 text-center">
                  <div className="flex flex-col items-center gap-y-1">
                    <span className="mb-3 text-xl font-semibold">
                      {" "}
                      {day.date}
                    </span>
                    <i
                      className={`wi ${interpretWMO(day.weatherCode).icon} text-4xl`}
                    ></i>
                    <span className="text-sm italic">
                      {interpretWMO(day.weatherCode).interpretation}
                    </span>
                    <span className="font-semibold text-sky-900">
                      {day.precipitationProb}%
                    </span>
                    <span className="text-4xl font-bold">
                      {day.avgTemp}&deg;
                      <span className="text-sm font-normal">
                        {day.avgApparentTemp}&deg;
                      </span>
                    </span>
                  </div>
                </CardContent>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
}
