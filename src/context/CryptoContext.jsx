import { useReducer, createContext, useState, useEffect } from "react";
import { CryptoReducer } from "./reducer/CryptoReducer";
import {
  LOAD_CURRENCY_DATA,
  LOAD_EXCHANGE_DATA,
  TOGGLE_LOADING,
} from "./action.types";

// get data methods
import {
  fetchBaseCurrencyList,
  fetchBTCExchangeRates,
  convertBtcToCurrency,
} from "../services/getData";

const initialState = {
  cryptoData: [],
  exchangeData: [],
  baseCurrency: "USD",
  itemsPerPage: 10,
  modal: null,
  isLoading: false,
  showFavourites: false,
  favouriteList: [],
  instrumentType: "cryptocurrencies",
  // btcExchangeRates: [],
};

// creating crypto context
export const CryptoContext = createContext(initialState);

// crypto context provider
export const CryptoContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(CryptoReducer, initialState);

  // state to keep track of exchange rates
  const [exchangeRates, setExchangeRates] = useState([]);
  // state to store base currency list
  const [baseCurrencyList, setBaseCurrencyList] = useState(["USD", "INR"]);

  //  api base url
  const baseURL = `https://api.coingecko.com/api/v3/`;

  // fetching base currency list
  useEffect(() => {
    fetchBaseCurrencyList(setBaseCurrencyList);
    fetchBTCExchangeRates(setExchangeRates);
  }, []);

  // fetching  crypto data
  useEffect(() => {
    const fetchData = async (instrumentType) => {
      try {
        dispatch({ type: TOGGLE_LOADING });

        const cryptoURL = `${baseURL}coins/markets?vs_currency=${state.baseCurrency.toLowerCase()}&amp;order=market_cap_desc&amp;per_page=100&amp;page=1&amp;sparkline=false&amp;price_change_percentage=24h%2C7d`;
        const exchangeURL = `${baseURL}exchanges`;
        const res = await fetch(
          instrumentType === "cryptocurrencies" ? cryptoURL : exchangeURL
        );
        const data = await res.json();
        if (data) {
          instrumentType === "cryptocurrencies"
            ? dispatch({
                type: LOAD_CURRENCY_DATA,
                payload: { cryptoData: data },
              })
            : dispatch({
                type: LOAD_EXCHANGE_DATA,
                payload: { exchangeData: data },
              });
          dispatch({ type: TOGGLE_LOADING });
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchData(state.instrumentType);
  }, [state.baseCurrency, state.instrumentType]);

  const value = {
    cryptoData: state.cryptoData,
    exchangeData: state.exchangeData,
    baseCurrency: state.baseCurrency,
    baseCurrencyList: baseCurrencyList,
    itemsPerPage: parseInt(state.itemsPerPage),
    modal: state.modal,
    isLoading: state.isLoading,
    showFavourites: state.showFavourites,
    favouriteList: state.favouriteList,
    instrumentType: state.instrumentType,
    btcExchangeRates: exchangeRates,
    dispatch,
  };
  return (
    <CryptoContext.Provider value={value}>{children}</CryptoContext.Provider>
  );
};
