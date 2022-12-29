import React, { useContext, useState, useEffect } from "react";
// components
import Navbar from "../components/navbar/Navbar";
import Carousel from "../components/carousel/Carousel";
import Header from "../components/header/Header";
import Table from "../components/table/Table";
import Modal from "../components/modal/Modal";

// context
import { CryptoContext } from "../context/CryptoContext";

import { currencyColumns } from "../components/table/tableFormat";

const CryptoCurrencies = () => {
  // context
  const {
    dispatch,
    cryptoData,
    itemsPerPage,
    isLoading,
    favouriteList,
    baseCurrency,
    showFavourites,
    instrumentType,
    modal,
  } = useContext(CryptoContext);

  // state to hold table data
  const [data, setData] = useState([]);

  // changing table data according to the instrument type
  useEffect(() => {
    showFavourites === false ? setData(cryptoData) : setData(favouriteList.cryptocurrencies);
  }, [instrumentType, cryptoData, favouriteList, showFavourites]);

  const title =
  showFavourites === false
      ? "Top 100 Cryptocurrencies by Market Cap"
      : "My Favourites";
      
  return (
    <div className=" z-0">
      <Navbar />
      <Carousel />
      <Header title={title} />
      <Table
        data={data}
        favouriteList={favouriteList}
        instrumentType={instrumentType}
        showFavourites={showFavourites}
        tableColumns={currencyColumns}
        // dispatch={dispatch}
      />
      {modal && <Modal />}
    </div>
  );
};

export default CryptoCurrencies;
