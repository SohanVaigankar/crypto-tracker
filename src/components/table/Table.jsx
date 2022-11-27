import React, { useEffect, useState, useContext } from "react";
import { tableColumns } from "./tableFormat";
import "./table.css";
// components
import Pagination from "../pagination/Pagination";
import useResolution from "../../hooks/useResolution";
import Loader from "../loader/Loader";

// context
import { LOAD_DATA, OPEN_MODAL } from "../../context/action.types";
import { CryptoContext } from "../../context/CryptoContext";

// custom hook

const Table = () => {
  // context
  const { dispatch, cryptoData, itemsPerPage, currentPage, isLoading } =
    useContext(CryptoContext);

  // pagination
  // indices of page item of the current page
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = parseInt(indexOfLastItem) - parseInt(itemsPerPage);

  const [currentPageItems, setCurrentPageItems] = useState(
    cryptoData.slice(indexOfFirstItem, indexOfLastItem)
  );

  useEffect(() => {
    setCurrentPageItems(cryptoData.slice(indexOfFirstItem, indexOfLastItem));
  }, [itemsPerPage, currentPage, cryptoData]);

  const screenWidth = useResolution();

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
    <div className="w-[95%] md:w-[90%] lg:w-[85%] mx-auto  ">
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
      {!isLoading && currentPageItems != [] && (
        <>
          {currentPageItems.map((instrument, index) => (
            <div
              className="flex justify-between items-center border-b-[1px] border-solid border-utility-bg text-[0.8rem] cursor-pointer p-4  gap-1"
              onClick={(e) => handleModal(e, instrument)}
              key={index}
            >
              {tableColumns.map((col, tableIndex) =>
                col.renderCell({ instrument, index, screenWidth, tableIndex })
              )}
            </div>
          ))}
          <Pagination
            indexOfLastItem={indexOfLastItem}
            indexOfFirstItem={indexOfFirstItem}
            currentPageItems={currentPageItems}
          />
        </>
      )}
    </div>
  );
};

export default Table;
