import { useReducer, createContext, useState } from "react";
import { CryptoReducer } from "./reducer/CryptoReducer";
const initialState = {
  cryptoData: [],
  itemsPerPage: 10,
  currentPage: 1,
  modal: null,
};

// creating crypto context
export const CryptoContext = createContext(initialState);

// crypto context provider
export const CryptoContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(CryptoReducer, initialState);
  const value = {
    cryptoData: state.cryptoData,
    itemsPerPage: parseInt(state.itemsPerPage),
    currentPage: parseInt(state.currentPage),
    modal: state.modal,
    dispatch,
  };
  return (
    <CryptoContext.Provider value={value}>{children}</CryptoContext.Provider>
  );
};
