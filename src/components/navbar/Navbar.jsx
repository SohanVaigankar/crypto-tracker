import React from "react";

// icons
import logoIcon from "../../assets/icons/logo.svg";
import searchIcon from "../../assets/icons/search_icon.svg";
import menuIcon from "../../assets/icons/hamburger_icon.svg";

const Navbar = () => {
  return (
    <nav className="flex justify-end sm:justify-between gap-5 sm:gap-0 flex-row-reverse sm:flex-row items-center px-5 py-3 w-[95%] md:w-[90%] lg:w-[85%] mx-auto">
      <div className="flex justify-between items-center gap-[0.4rem] cursor-pointer">
        <img src={logoIcon} alt="crypto tracker" className="logo-icon h-6" />
        <h1 className="text-lg font-[600]">Crypto Tracker</h1>
      </div>
      <div className="flex justify-between items-center gap-10">
        <img src={searchIcon} alt="search" className="cursor-pointer hidden sm:flex" />
        <img src={menuIcon} alt="menu" className="cursor-pointer" />
      </div>
    </nav>
  );
};

export default Navbar;
