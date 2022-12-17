import React, { useState, useContext } from "react";
// icons
import starIcon from "../../assets/icons/star_icon.svg";
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
      <div className="middle-section bg-secondary-bg px-5 py-10 md:py-5  flex flex-col gap-10 ">
        <div className="table-title text-left text-2xl font-[700] w-[95%] md:w-[90%] lg:w-[85%] mx-auto">
          Top 100 Cryptocurrencies by Market Cap
        </div>
        <div className="hidden md:flex utility text-[0.8rem] items-center justify-between w-[95%] md:w-[90%] lg:w-[85%] mx-auto">
          <ul
            onClick={handleInstrumentChange}
            value={instrumentType}
            className="instruments flex gap-5 "
          >
            <li
              value="favourites"
              className="bg-utility-bg cursor-pointer py-[0.4rem] px-2 rounded-[8px] flex justify-center items-center gap-1 hover:bg-[#0000000f]"
            >
              <img value="favourites" src={starIcon} alt="favourite" />
              <span value="favourites">Favourites</span>
            </li>
            <li
              value="cryptocurrencies"
              className="bg-utility-bg cursor-pointer py-[0.4rem] px-2 rounded-[8px] text-[#3861FB] hover:bg-[#0000000f]"
            >
              CryptoCurrencies
            </li>
            <li
              value="defi"
              className="bg-utility-bg cursor-pointer py-[0.4rem] px-2 rounded-[8px] hover:bg-[#0000000f]"
            >
              DeFi
            </li>
            <li
              value="nft"
              className="bg-utility-bg cursor-pointer py-[0.4rem] px-2 rounded-[8px] hover:bg-[#0000000f]"
            >
              NFTs & Collectibles
            </li>
          </ul>
          <div className="table-size flex gap-2 items-center relative top-2">
            <span className="text-[#5b667c] text-[0.8rem]">show rows</span>
            <div
              onClick={handleRowsToggle}
              className="bg-utility-bg cursor-pointer px-3 py-2  rounded-[8px] text-center font-[600] flex items-center justify-between gap-3 relative transition-transform"
            >
              <span>{itemsPerPage}</span>
              <img
                src={rowsToggle ? upArrowIcon : downArrowIcon}
                className="h-3 w-3"
              />
              {rowsToggle && (
                <ul
                  onClick={handleSetRows}
                  className="absolute top-[100%] left-0 w-full  bg-utility-bg cursor-pointer  rounded transition-all"
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
    </div>
  );
};

export default Header;
