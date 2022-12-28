import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
// icons
import logoIcon from "../../assets/icons/logo.svg";
import searchIcon from "../../assets/icons/search_icon.svg";
import menuIcon from "../../assets/icons/hamburger_icon.svg";
import closeIcon from "../../assets/icons/close_icon.svg";

// context
import {
  SET_BASE_CURRENCY,
  SET_INSTRUMENT_TYPE,
} from "../../context/action.types";
import { CryptoContext } from "../../context/CryptoContext";

// components
import DropdownMenu from "../dropdown-menu/DropdownMenu";

const Navbar = () => {
  // context
  const { baseCurrency, baseCurrencyList, dispatch } =
    useContext(CryptoContext);

  // state to toggle navbar menu
  const [menuToggle, setMenuToggle] = useState(false);

  const handleMenuToggle = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setMenuToggle(!menuToggle);
  };

  // fn to set items per page
  const handleSetCurrency = async (result) => {
    if (String(result) !== baseCurrency) {
      await dispatch({
        type: SET_BASE_CURRENCY,
        payload: { baseCurrency: String(result) },
      });
    }
  };
  return (
    <nav className="flex justify-end sm:justify-between gap-5 sm:gap-0 flex-row-reverse sm:flex-row items-center px-5 py-3 w-[95%] md:w-[90%] lg:w-[85%] mx-auto relative">
      <div className="flex justify-between items-center gap-[0.4rem] cursor-pointer">
        <img src={logoIcon} alt="crypto tracker" className="logo-icon h-6" />
        <h1 className="text-lg font-[600]">Crypto Tracker</h1>
      </div>
      <div className="flex justify-between items-center gap-10">
        <img
          src={searchIcon}
          alt="search"
          className="cursor-pointer hidden sm:flex"
        />
        <img
          onClick={handleMenuToggle}
          onMouseLeave={(e) => {
            e.stopPropagation();
            setTimeout(() => {
              setMenuToggle(false);
            }, 250);
          }}
          src={menuToggle ? closeIcon : menuIcon}
          alt="menu"
          className="cursor-pointer w-5 h-5"
        />
      </div>
      {menuToggle && (
        <ul
          onMouseEnter={(e) => {
            e.stopPropagation();
            setTimeout(() => {
              setMenuToggle(true);
            }, 250);
          }}
          onMouseLeave={(e) => {
            e.stopPropagation();
            setTimeout(() => {
              setMenuToggle(false);
            }, 250);
          }}
          className="absolute flex flex-col justify-center items-center gap-10 mx-auto w-[90%] sm:w-[50%] h-[40vh] md:h-[25vh] top-[100%] sm:right-5 rounded-lg  bg-[#000000af] text-[#fafafa] py-5 px-5 z-50"
        >
          <Link
            to="/cryptocurrencies"
            onClick={() => {
              dispatch({
                type: SET_INSTRUMENT_TYPE,
                payload: { instrumentType: "cryptocurrencies" },
              });
            }}
          >
            Currencies
          </Link>
          <Link
            to="/cryptoexchanges"
            onClick={() => {
              dispatch({
                type: SET_INSTRUMENT_TYPE,
                payload: { instrumentType: "cryptoexchanges" },
              });
            }}
          >
            Exchanges
          </Link>
          <Link className="flex items-center gap-5">
            <p className="whitespace-nowrap">Base Currency</p>
            <DropdownMenu
              valueList={baseCurrencyList}
              handleSetMenuFun={handleSetCurrency}
              currentValue={baseCurrency.toUpperCase()}
              menuClasses={`bg-utility-bg cursor-pointer px-5 py-2  rounded text-center text-[0.8rem] font-[600] flex items-center justify-between gap-3 relative transition-transform text-[#333]`}
              menuContainerClasses={`absolute top-[100%] left-0 w-full  bg-utility-bg cursor-pointer  rounded transition-all z-40 overflow-hidden max-h-[15vh] overflow-y-auto`}
              menuItemClasses={`border-t-[1px] border-[#0000000c] px-5 py-2 hover:bg-[#00000008]`}
            />
          </Link>
        </ul>
      )}
    </nav>
  );
};

export default Navbar;
