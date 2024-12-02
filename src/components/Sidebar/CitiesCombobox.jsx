import { useState, useContext } from "react";
import { CitiesContext } from "@/weather-tracker/cities-context";
import { UserConfigContext } from "@/weather-tracker/user-config-context";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

export default function CitiesCombobox() {
  const { cities } = useContext(CitiesContext);
  const { userCityName, setUserLocation } = useContext(UserConfigContext);
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(userCityName);

  const handleCitySelect = (city) => {
    setValue(city.name);
    setUserLocation(city);
    setOpen(false);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[300px] justify-between" //input city width
        >
          {userCityName
            ? cities.find((city) => city.name === userCityName)?.name
            : "Select city..."}
          <ChevronsUpDown className="opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[300px] p-0">
        {/*dropdown width*/}
        <Command>
          <CommandInput placeholder="Search city..." className="h-9" />
          <CommandList>
            <CommandEmpty>No city found.</CommandEmpty>
            <CommandGroup>
              {cities.map((city) => (
                <CommandItem
                  key={city.id}
                  value={city.name}
                  onSelect={() => handleCitySelect(city)}
                >
                  {city.name}
                  <Check
                    className={cn(
                      "ml-auto",
                      value === city.name ? "opacity-100" : "opacity-0",
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
