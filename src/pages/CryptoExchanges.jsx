import React, { useContext, useState, useEffect } from "react";
// components
import Navbar from "../components/navbar/Navbar";
import Carousel from "../components/carousel/Carousel";
import Header from "../components/header/Header";
import Table from "../components/table/Table";
import Modal from "../components/modal/Modal";

// context
import { CryptoContext } from "../context/CryptoContext";

import { exchangesColumns } from "../components/table//tableFormat";

const CryptoExchanges = () => {
  // context
  const {
    dispatch,
    cryptoData,
    exchangeData,
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

  // console.log(exchangeData)

  // changing table data according to the instrument type
  useEffect(() => {
    showFavourites === false
      ? setData(exchangeData)
      : setData(favouriteList.cryptoexchanges);
  }, [instrumentType, exchangeData, favouriteList, showFavourites]);

  const title =
    showFavourites === false
      ? "Top Crypto Exchanges by Trust Score Rank"
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
        tableColumns={exchangesColumns}
        // dispatch={dispatch}
      />
      {/* {modal && <Modal />} */}
    </div>
  );
};

export default CryptoExchanges;
