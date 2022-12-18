import React, { useEffect, useState, useContext } from "react";
import { tableColumns } from "./tableFormat";
// components
import Pagination from "../pagination/Pagination";
import useResolution from "../../hooks/useResolution";
import Loader from "../loader/Loader";

// context
import { OPEN_MODAL } from "../../context/action.types";
import { CryptoContext } from "../../context/CryptoContext";

// custom hook

const Table = () => {
  // context
  const {
    dispatch,
    cryptoData,
    itemsPerPage,
    isLoading,
    favouriteList,
    instrumentType,
  } = useContext(CryptoContext);

  // state to hold table data
  const [data, setData] = useState([]);

  // changing table data according to the instrument type
  useEffect(() => {
    instrumentType === "cryptocurrencies"
      ? setData(cryptoData)
      : setData(favouriteList);
  }, [instrumentType, cryptoData, favouriteList]);

  const [currentPage, setCurrentPage] = useState(1);

  // state to store data of current page items as per pagination
  const [currentPageItems, setCurrentPageItems] = useState([]);

  // set current page to default value when instrumentType is changed
  useEffect(() => {
    setCurrentPage(1);
  }, [instrumentType]);

  // getting window size data from hook
  const screenWidth = useResolution();

  // fn to handle clicks on table row for mobile device screens
  const handleModal = (e, instrument) => {
    e.preventDefault();

    if (screenWidth < 640) {
      dispatch({
        type: OPEN_MODAL,
        payload: { modal: instrument },
      });
    }
  };

  return (
    <div className="w-[99%] sm:w-[95%] md:w-[90%] lg:w-[85%] mx-auto  ">
      <div className="border-t-[1px] border-b-[1px] border-solid border-utility-bg flex justify-between items-center px-5 py-3 gap-1">
        {tableColumns.map((col, index) => (
          <div
            key={index}
            className={`font-[600] text-[0.75rem] ${col.classes}`}
          >
            {col.headerName}
          </div>
        ))}
      </div>

      {isLoading && <Loader />}
      {!isLoading && data.length > 0 ? (
        <>
          {currentPageItems.map((instrument, index) => (
            <div
              className="flex justify-between items-center border-b-[1px] border-solid border-utility-bg text-[0.8rem] cursor-pointer p-4  gap-1 relative"
              onClick={(e) => handleModal(e, instrument)}
              key={index}
            >
              {tableColumns.map((col, tableIndex) =>
                col.renderCell({
                  instrument,
                  index,
                  screenWidth,
                  tableIndex,
                  favouriteList,
                  dispatch,
                })
              )}
            </div>
          ))}

          <Pagination
            data={data}
            itemsPerPage={itemsPerPage}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            setCurrentPageItems={setCurrentPageItems}
          />
        </>
      ) : (
        <h1 className="text-center py-20">{`${instrumentType} list is empty :(`}</h1>
      )}
    </div>
  );
};

export default Table;
