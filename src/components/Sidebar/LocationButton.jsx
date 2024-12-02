import { useState } from "react";
import { Button } from "../ui/button";
import { MapPinned } from "lucide-react";

export default function LocationButton({ children }) {
  const [isFetchingLoc, setIsFetchingLoc] = useState(false);
  return (
    <Button>
      <MapPinned />
      Use Current Location
      {children}
    </Button>
  );
}
