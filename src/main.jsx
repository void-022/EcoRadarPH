import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import CitiesContextProvider from "./weather-tracker/cities-context";
import "./index.css";
import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <CitiesContextProvider>
      <App />
    </CitiesContextProvider>
  </StrictMode>,
);
