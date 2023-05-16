import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { QueryClientProvider } from "react-query";
import { QueryClient } from "react-query";
import "./index.css";
import { AlertProvider } from "./context/alert/AlertContext";
const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <AlertProvider>
        <App />
      </AlertProvider>
    </QueryClientProvider>
  </React.StrictMode>
);

