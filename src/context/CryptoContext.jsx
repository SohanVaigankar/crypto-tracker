import { useReducer, createContext, useState, useEffect } from "react";
import { CryptoReducer } from "./reducer/CryptoReducer";
import { LOAD_DATA, TOGGLE_LOADING } from "./action.types";
const initialState = {
  cryptoData: [],
  itemsPerPage: 10,
  currentPage: 1,
  modal: null,
  isLoading: false,
};

// creating crypto context
export const CryptoContext = createContext(initialState);

// crypto context provider
export const CryptoContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(CryptoReducer, initialState);

  // fetching  crypto data
  useEffect(() => {
    const fetchData = async () => {
      try {
        dispatch({ type: TOGGLE_LOADING });
        const apiURL = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=inr&amp;order=market_cap_desc&amp;per_page=100&amp;page=1&amp;sparkline=false&amp;price_change_percentage=24h%2C7d`;
        const res = await fetch(apiURL);
        const data = await res.json();
        if (data) {
          dispatch({ type: LOAD_DATA, payload: { cryptoData: data } });
          dispatch({ type: TOGGLE_LOADING });
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  const value = {
    cryptoData: state.cryptoData,
    itemsPerPage: parseInt(state.itemsPerPage),
    currentPage: parseInt(state.currentPage),
    modal: state.modal,
    isLoading: state.isLoading,
    dispatch,
  };
  return (
    <CryptoContext.Provider value={value}>{children}</CryptoContext.Provider>
  );
};
