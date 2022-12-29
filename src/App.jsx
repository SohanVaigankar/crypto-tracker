import React, { useContext } from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";

// pages
import Home from "./pages/Home.jsx";
import CryptoCurrencies from "./pages/CryptoCurrencies.jsx";
import CryptoExchanges from "./pages/CryptoExchanges.jsx";
import PageNotFound from "./pages/PageNotFound.jsx";

const App = () => {
  // context

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route exact path="/cryptocurrencies" element={<CryptoCurrencies />} />
      <Route exact path="/cryptoexchanges" element={<CryptoExchanges />} />
      <Route exact path="*" element={<PageNotFound />} />
    </Routes>
  );
};

export default App;
