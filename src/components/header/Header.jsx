import React, { useState, useContext } from "react";
// icons
import starIcon from "../../assets/icons/star_icon.svg";
import starFullIcon from "../../assets/icons/star_full.svg";

// context
import {
  SET_ITEMS_PER_PAGE,
  SET_INSTRUMENT_TYPE,
  SHOW_FAVOURITE_TOGGLE,
} from "../../context/action.types";
import { CryptoContext } from "../../context/CryptoContext";

// components
import DropdownMenu from "../dropdown-menu/DropdownMenu";

const Header = ({ title }) => {
  // context
  const { itemsPerPage, showFavourites, instrumentType, dispatch } =
    useContext(CryptoContext);

  const dropdownValues = [10, 20, 25];

  // fn to set items per page
  const handleSetRows = async (result) => {
    if (parseInt(result) !== itemsPerPage) {
      await dispatch({
        type: SET_ITEMS_PER_PAGE,
        payload: { itemsPerPage: parseInt(result) },
      });
    }
  };

  // fn to handle instrument change
  const handleShowFavouriteToggle = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.target.attributes["value"].value !== String(showFavourites)) {
      // console.log(e.target.attributes["value"].value);
      await dispatch({
        type: SHOW_FAVOURITE_TOGGLE,
        payload: {
          showFavourites:
            e.target.attributes["value"].value === "true" ? true : false,
        },
      });
    }
  };

  return (
    <div>
      <div className="middle-section bg-secondary-bg px-5 py-10 md:pt-5 pb-5 flex flex-col gap-5 ">
        <div className="table-title text-left text-2xl font-[700] w-[95%] md:w-[90%] lg:w-[85%] mx-auto">
          {title}
        </div>
        <div className="flex utility text-[0.8rem] items-center justify-between w-[95%] md:w-[90%] lg:w-[85%] mx-auto">
          <ul
            onClick={handleShowFavouriteToggle}
            value={showFavourites}
            className="instruments flex gap-5 "
          >
            <li
              value="favourites"
              className={`bg-utility-bg cursor-pointer py-[0.4rem] px-2 rounded-[8px] flex justify-center items-center gap-1 hover:bg-[#0000000f] ${
                showFavourites === true && "text-[#3861FB]"
              }`}
            >
              <img
                value={true}
                src={showFavourites === true ? starFullIcon : starIcon}
                className="h-5"
                alt="favourite"
              />
              <span value={true}>Favourites</span>
            </li>
            <li
              value={false}
              className={`bg-utility-bg cursor-pointer py-[0.4rem] px-2 rounded-[8px]  hover:bg-[#0000000f] ${
                showFavourites === false && "text-[#3861FB]"
              }`}
            >
              {instrumentType === "cryptocurrencies" ? "Crypto Currencies" : "Crypto Exchanges"}
            </li>
          </ul>
        </div>
        <div className="table-size flex justify-end w-[95%] md:w-[90%] mt-2 sm:-mt-1 md:-mt-4 lg:w-[85%] mx-auto gap-2 items-center   ">
          <span className="text-[#5b667c] text-[0.8rem]">show rows</span>
          <DropdownMenu
            valueList={dropdownValues}
            handleSetMenuFun={handleSetRows}
            currentValue={itemsPerPage}
            menuClasses={`bg-utility-bg cursor-pointer px-3 py-1  rounded-[8px] text-center text-[0.8rem] font-[600] flex items-center justify-between gap-3 relative transition-transform`}
            menuContainerClasses={`absolute top-[100%] left-0 w-full  bg-utility-bg cursor-pointer  rounded transition-all z-40 overflow-hidden`}
            menuItemClasses={`border-t-[1px] border-[#0000000c] px-3 py-1 hover:bg-[#00000008]`}
          />
        </div>
      </div>
    </div>
  );
};

export default Header;
