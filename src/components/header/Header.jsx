import React, { useContext } from "react";
import starIcon from "../../assets/icons/star_icon.svg";
// context
import { SET_ITEMS_PER_PAGE } from "../../context/action.types";
import { CryptoContext } from "../../context/CryptoContext";

const Header = () => {
  // context
  const { dispatch } = useContext(CryptoContext);

  const handleOnClick = async (e) => {
    e.preventDefault();
    await dispatch({
      type: SET_ITEMS_PER_PAGE,
      payload: { itemsPerPage: parseInt(e.target.value) },
    });
  };

  return (
    <div>
      <div className="middle-section bg-secondary-bg px-5 py-10 md:py-5  flex flex-col gap-10 ">
        <div className="table-title text-left text-2xl font-[700] w-[95%] md:w-[90%] lg:w-[85%] mx-auto">
          Top 100 Cryptocurrencies by Market Cap
        </div>
        <div className="hidden md:flex utility text-[0.8rem] items-center justify-between w-[95%] md:w-[90%] lg:w-[85%] mx-auto">
          <ul className="instruments flex gap-5 ">
            <li className="bg-utility-bg cursor-pointer py-[0.4rem] px-2 rounded-[8px] flex justify-center items-center gap-1">
              <img src={starIcon} alt="favourite" />
              <span>Favourites</span>
            </li>
            <li className="bg-utility-bg cursor-pointer py-[0.4rem] px-2 rounded-[8px] text-[#3861FB]">
              CryptoCurrencies
            </li>
            <li className="bg-utility-bg cursor-pointer py-[0.4rem] px-2 rounded-[8px]">
              DeFi
            </li>
            <li className="bg-utility-bg cursor-pointer py-[0.4rem] px-2 rounded-[8px]">
              NFTs & Collectibles
            </li>
          </ul>
          <div className="table-size flex gap-2 items-center relative top-2">
            <span className="text-[#5b667c] text-[0.8rem]">show rows</span>
            <select
              className="bg-utility-bg cursor-pointer py-[0.5rem] px-1 rounded-[8px] text-center font-[600]"
              onClick={handleOnClick}
            >
              <option value={10} style={{width:"5rem"}}>10</option>
              <option value={20} style={{width:"5rem"}}>20</option>
              <option value={25} style={{width:"5rem"}}>25</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
