import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { CryptoContextProvider } from "./context/CryptoContext";
import { BrowserRouter as Router } from "react-router-dom";

ReactDOM.createRoot(document.getElementById("root")).render(
  <CryptoContextProvider>
    <Router>
      <App />
    </Router>
  </CryptoContextProvider>
);
