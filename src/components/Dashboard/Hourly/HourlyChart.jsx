import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"; // Adjust the path if necessary

// const chartConfig = {
//   desktop: {
//     label: "Desktop",
//     color: "#2563eb",
//   },
//   mobile: {
//     label: "Mobile",
//     color: "#60a5fa",
//   },
// };

export default function HourlyChart({ chartData, chartLabel, interpretDate }) {
  let twentyFourHourData = chartData.slice(0, 24);
  twentyFourHourData = twentyFourHourData.map((day) => ({
    ...day,
    time: interpretDate(day.time, "time"),
  }));

  const chartConfig = {
    label: chartLabel,
    color: "#60a5fa",
  };

  console.log(chartLabel);
  console.log(twentyFourHourData);

  return (
    <ChartContainer
      config={chartConfig}
      className="max-h-full min-h-full w-full"
    >
      <BarChart accessibilityLayer data={twentyFourHourData}>
        <CartesianGrid vertical={false} />
        <XAxis
          dataKey="time"
          tickLine={false}
          tickMargin={10}
          axisLine={false}
        />
        <ChartTooltip content={<ChartTooltipContent />} />
        <Bar dataKey={chartLabel} fill={chartConfig.color} radius={5} />
      </BarChart>
    </ChartContainer>
  );
}
