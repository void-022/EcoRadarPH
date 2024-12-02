import { useContext } from "react";
import {
  Settings,
  Github,
  Info,
  MapPinned,
  ExternalLink,
  // Check,
  // ChevronsUpDown,
} from "lucide-react";

import { Button } from "../ui/button";
import { Input } from "../ui/input";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetFooter,
  SheetClose,
} from "@/components/ui/sheet";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";

import CitiesCombobox from "./CitiesCombobox";
import LocationButton from "./LocationButton";

import { UserConfigContext } from "@/weather-tracker/user-config-context";

export function AppSidebar() {
  const { theme, setAppTheme } = useContext(UserConfigContext);

  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>EcoRadarPH</SidebarGroupLabel>
          <SidebarMenu>
            <SidebarMenuItem>
              <Sheet>
                <SheetTrigger className="w-full">
                  <SidebarMenuButton>
                    <p className="flex items-center">
                      <Settings className="inline h-[1.2em]" />
                      Settings
                    </p>
                  </SidebarMenuButton>
                </SheetTrigger>
                <SheetContent side="top">
                  <SheetHeader>
                    <SheetTitle>User Settings</SheetTitle>
                    <SheetDescription>
                      Make changes to your configuration here.
                    </SheetDescription>
                  </SheetHeader>
                  <div className="mb-3 mt-3 flex flex-wrap items-center gap-y-3">
                    <div className="min-w-full flex-1">
                      <div className="flex items-center gap-x-2">
                        <CitiesCombobox className="flex-1" />
                        <span>OR</span>
                        {/* <Button>
                          <MapPinned />
                          Use Current Location
                        </Button> */}
                        <LocationButton />
                      </div>
                    </div>
                    <div className="w-full flex-1">
                      <div className="flex items-center gap-x-2">
                        <span>Theme Mode</span>
                        <Select
                          value={theme}
                          onValueChange={(newTheme) => setAppTheme(newTheme)}
                        >
                          <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="Theme" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="light">Light</SelectItem>
                            <SelectItem value="dark">Dark</SelectItem>
                            <SelectItem value="system">System</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </div>
                  {/* <SheetFooter>
                    <SheetClose asChild>
                      <Button>Save changes</Button>
                    </SheetClose>
                  </SheetFooter> */}
                </SheetContent>
              </Sheet>
            </SidebarMenuItem>

            <SidebarMenuItem>
              <SidebarMenuButton>
                <a
                  href="https://github.com/void-022"
                  className="flex items-center" // Flex container with spacing
                  target
                >
                  <Github className="h-[1.2em]" />
                  <span>Github</span>
                  <ExternalLink className="ml-1 h-[0.8em]" />
                </a>
              </SidebarMenuButton>
            </SidebarMenuItem>

            <SidebarMenuItem>
              <SidebarMenuButton>
                <a
                  href="#"
                  className="flex items-center" // Flex container with spacing
                  target
                >
                  <Info className="h-[1.2em]" />
                  <span>Information</span>
                  <ExternalLink className="ml-1 h-[0.8em]" />
                </a>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
          {/* </SidebarGroupContent> */}
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
