import { useReducer, createContext, useState, useEffect } from "react";
import { CryptoReducer } from "./reducer/CryptoReducer";
import { LOAD_DATA, TOGGLE_LOADING } from "./action.types";
const initialState = {
  cryptoData: [],
  baseCurrency: "USD",
  itemsPerPage: 10,
  modal: null,
  isLoading: false,
  favouriteList: [],
  instrumentType: "cryptocurrencies",
};

// creating crypto context
export const CryptoContext = createContext(initialState);

// crypto context provider
export const CryptoContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(CryptoReducer, initialState);
  // state to store base currency list
  const [baseCurrencyList, setBaseCurrencyList] = useState(["USD", "INR"]);

  // fetching base currency list
  useEffect(() => {
    const fetchBaseCurrencyList = async () => {
      try {
        const apiURL = `https://api.coingecko.com/api/v3/simple/supported_vs_currencies`;
        const res = await fetch(apiURL);
        const data = await res.json();
        if (data) {
          setBaseCurrencyList(data.map((currency) => currency.toUpperCase()).sort());
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchBaseCurrencyList();
  }, []);

  // fetching  crypto data
  useEffect(() => {
    const fetchData = async () => {
      try {
        dispatch({ type: TOGGLE_LOADING });
        const apiURL = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${state.baseCurrency.toLowerCase()}&amp;order=market_cap_desc&amp;per_page=100&amp;page=1&amp;sparkline=false&amp;price_change_percentage=24h%2C7d`;
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
  }, [state.baseCurrency]);

  const value = {
    cryptoData: state.cryptoData,
    baseCurrency: state.baseCurrency,
    baseCurrencyList: baseCurrencyList,
    itemsPerPage: parseInt(state.itemsPerPage),
    modal: state.modal,
    isLoading: state.isLoading,
    favouriteList: state.favouriteList,
    instrumentType: state.instrumentType,
    dispatch,
  };
  return (
    <CryptoContext.Provider value={value}>{children}</CryptoContext.Provider>
  );
};
