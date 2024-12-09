import { createRoot } from "react-dom/client";
import CitiesContextProvider from "./weather-tracker/cities-context";
import UserConfigContextProvider from "./weather-tracker/user-config-context";
import "./index.css";
import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
  <UserConfigContextProvider>
    <CitiesContextProvider>
      <App />
    </CitiesContextProvider>
  </UserConfigContextProvider>,
);
