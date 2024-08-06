import React from "react";
import ReactDOM from "react-dom/client";
import "virtual:uno.css";
import "@unocss/reset/tailwind.css";
import App from "./App";
import axios from "axios";
axios.defaults.withCredentials = true;

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
