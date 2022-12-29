import React, { useContext, useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import "./App.css";

// pages
import Home from "./pages/Home.jsx";
import CryptoCurrencies from "./pages/CryptoCurrencies.jsx";
import CryptoExchanges from "./pages/CryptoExchanges.jsx";
import PageNotFound from "./pages/PageNotFound.jsx";

// context
import { SET_INSTRUMENT_TYPE } from "./context/action.types";
import { CryptoContext } from "./context/CryptoContext";
const App = () => {
  // context
  const { instrumentType, dispatch } = useContext(CryptoContext);

  // getting url address
  const { pathname } = useLocation();

  // setting up instrument type based on the url
  useEffect(() => {
    if (!pathname.includes(instrumentType)) {
      pathname === "/cryptocurrencies" || pathname === "/"
        ? dispatch({
            type: SET_INSTRUMENT_TYPE,
            payload: { instrumentType: "cryptocurrencies" },
          })
        : pathname === "/cryptoexchanges"
        ? dispatch({
            type: SET_INSTRUMENT_TYPE,
            payload: { instrumentType: "cryptoexchanges" },
          })
        : "";
    }
  }, [pathname]);

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
