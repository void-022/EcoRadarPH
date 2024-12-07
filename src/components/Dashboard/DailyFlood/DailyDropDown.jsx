import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function DailyDropDown({ onSelectForecastLength }) {
  return (
    <Select onValueChange={onSelectForecastLength}>
      <SelectTrigger className="w-[200px] md:w-[280px]">
        <SelectValue placeholder="Select duration" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectItem value="7">7 days</SelectItem>
          <SelectItem value="14">2 weeks</SelectItem>
          <SelectItem value="30">1 month</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
