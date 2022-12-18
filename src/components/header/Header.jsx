import React, { useState, useContext } from "react";
// icons
import starIcon from "../../assets/icons/star_icon.svg";
import starFullIcon from "../../assets/icons/star_full.svg";
import downArrowIcon from "../../assets/icons/down_arrow.svg";
import upArrowIcon from "../../assets/icons/up_arrow.svg";

// context
import {
  SET_ITEMS_PER_PAGE,
  SET_INSTRUMENT_TYPE,
} from "../../context/action.types";
import { CryptoContext } from "../../context/CryptoContext";

const Header = () => {
  // context
  const { itemsPerPage, instrumentType, dispatch } = useContext(CryptoContext);

  // state to keep track of open and close state of show rows
  const [rowsToggle, setRowsToggle] = useState(false);

  const title =
    instrumentType === "cryptocurrencies"
      ? "Top 100 Cryptocurrencies by Market Cap"
      : "My Favourites";

  // fn to toggle select menu of items per page
  const handleRowsToggle = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setRowsToggle(!rowsToggle);
  };

  // fn to set items per page
  const handleSetRows = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    setRowsToggle(!rowsToggle);
    if (parseInt(e.target.attributes["value"].value) !== itemsPerPage) {
      await dispatch({
        type: SET_ITEMS_PER_PAGE,
        payload: { itemsPerPage: parseInt(e.target.attributes["value"].value) },
      });
    }
  };

  // fn to handle instrument change
  const handleInstrumentChange = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    console.log(e.target.attributes["value"].value);
    if (e.target.attributes["value"].value !== instrumentType)
      await dispatch({
        type: SET_INSTRUMENT_TYPE,
        payload: { instrumentType: e.target.attributes["value"].value },
      });
  };

  return (
    <div>
      <div className="middle-section bg-secondary-bg px-5 py-10 md:pt-5 pb-5 flex flex-col gap-5 ">
        <div className="table-title text-left text-2xl font-[700] w-[95%] md:w-[90%] lg:w-[85%] mx-auto">
          {title}
        </div>
        <div className="flex utility text-[0.8rem] items-center justify-between w-[95%] md:w-[90%] lg:w-[85%] mx-auto">
          <ul
            onClick={handleInstrumentChange}
            value={instrumentType}
            className="instruments flex gap-5 "
          >
            <li
              value="favourites"
              className={`bg-utility-bg cursor-pointer py-[0.4rem] px-2 rounded-[8px] flex justify-center items-center gap-1 hover:bg-[#0000000f] ${
                instrumentType === "favourites" && "text-[#3861FB]"
              }`}
            >
              <img
                value="favourites"
                src={instrumentType === "favourites" ? starFullIcon : starIcon}
                className="h-5"
                alt="favourite"
              />
              <span value="favourites">Favourites</span>
            </li>
            <li
              value="cryptocurrencies"
              className={`bg-utility-bg cursor-pointer py-[0.4rem] px-2 rounded-[8px]  hover:bg-[#0000000f] ${
                instrumentType === "cryptocurrencies" && "text-[#3861FB]"
              }`}
            >
              CryptoCurrencies
            </li>
          </ul>
        </div>
        <div className="table-size flex justify-end w-[95%] md:w-[90%] mt-2 sm:-mt-1 md:-mt-4 lg:w-[85%] mx-auto gap-2 items-center   ">
          <span className="text-[#5b667c] text-[0.8rem]">show rows</span>
          <div
            onClick={handleRowsToggle}
            onMouseLeave={(e) => {
              e.stopPropagation();
              setTimeout(() => {
                setRowsToggle(false);
              }, 250);
            }}
            className="bg-utility-bg cursor-pointer px-3 py-1  rounded-[8px] text-center text-[0.8rem] font-[600] flex items-center justify-between gap-3 relative transition-transform"
          >
            <span>{itemsPerPage}</span>
            <img
              src={rowsToggle ? upArrowIcon : downArrowIcon}
              className="h-3 w-3"
            />
            {rowsToggle && (
              <ul
                onClick={handleSetRows}
                className="absolute top-[100%] left-0 w-full  bg-utility-bg cursor-pointer  rounded transition-all z-40"
              >
                <li
                  value={10}
                  className="border-t-[1px] border-[#0000000c] px-3 py-1 hover:bg-[#00000008]"
                >
                  10
                </li>
                <li
                  value={20}
                  className="border-t-[1px] border-[#0000000c] px-3 py-1 hover:bg-[#00000008]"
                >
                  20
                </li>
                <li
                  value={25}
                  className="border-t-[1px] border-[#0000000c] px-3 py-1 hover:bg-[#00000008]"
                >
                  25
                </li>
              </ul>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
