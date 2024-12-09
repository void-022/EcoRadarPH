import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
} from "@/components/ui/chart";

export default function DailyChart({
  chartData,
  forecastLength,
  interpretDate,
}) {
  let floodData = chartData.slice(0, parseInt(forecastLength));
  floodData = floodData.map((day) => ({
    ...day,
    time: interpretDate(day.time, "monthDate"),
  }));

  const chartConfig = {
    discharge: {
      label: "River discharge",
      color: "hsl(var(--chart-2))",
    },
    maxDischarge: {
      label: "Max river discharge",
      color: "hsl(var(--chart-3))",
    },
  };

  return (
    <ChartContainer
      config={chartConfig}
      className="max-h-full min-h-full w-full"
    >
      <BarChart accessibilityLayer data={floodData}>
        <CartesianGrid vertical={false} />
        <XAxis
          dataKey="time"
          tickLine={false}
          tickMargin={10}
          axisLine={false}
        />
        <ChartTooltip content={<ChartTooltipContent />} />
        <ChartLegend content={<ChartLegendContent />} />
        <Bar
          dataKey="discharge"
          fill={chartConfig.discharge.color}
          radius={5}
        />
        <Bar
          dataKey="maxDischarge"
          fill={chartConfig.maxDischarge.color}
          radius={5}
        />
      </BarChart>
    </ChartContainer>
  );
}
