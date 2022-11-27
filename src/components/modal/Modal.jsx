import React, { useContext } from "react";
import closeBtnIcon from "../../assets/icons/close_btn.svg";
import gapDownIcon from "../../assets/icons/gap_down_icon.svg";
import gapUpIcon from "../../assets/icons/gap_up_icon.svg";

// context
import { CLOSE_MODAL } from "../../context/action.types";
import { CryptoContext } from "../../context/CryptoContext";

import useResolution from "../../hooks/useResolution";

const Modal = ({}) => {
  // context
  const { modal, dispatch } = useContext(CryptoContext);

  const screenWidth = useResolution();

  screenWidth > 640 ? dispatch({ type: CLOSE_MODAL }) : "";

  // currency movement percentages for 24 hours and 7 Days
  let percentage1D = parseFloat(
    modal.price_change_percentage_24h_in_currency.toFixed(2)
  ).toLocaleString();
  let percentage7D = parseFloat(
    modal.price_change_percentage_24h_in_currency.toFixed(2)
  ).toLocaleString();

  const handleBackdropClick = async (e) => {
    e.preventDefault();
    if (e.target.classList.contains("modal-backdrop")) {
      await dispatch({ type: CLOSE_MODAL });
    }
  };

  return (
    <div
      className={`${
        modal && "modal-backdrop"
      } w-full h-[100vh] bg-[rgba(0,0,0,0.5)]  fixed top-0 left-0 flex justify-center items-center z-10 p-5 font-[600] `}
      onClick={handleBackdropClick}
    >
      <div className="modal-info sticky top-0 w-full px-5 pt-5 pb-10 bg-[#FFFFFF] border-[#DBDCDF] rounded-[8px]  text-[#0F1629]  z-20 flex flex-col gap-4 text-[0.85rem]">
        {/*header */}
        <div className="flex justify-between items-center mb-3">
          <div className="flex justify-start items-center gap-2">
            <img src={modal?.image} alt={modal?.name} className={`h-7 w-7`} />
            <p>{modal?.name.toUpperCase()}</p>
          </div>
          <img
            src={closeBtnIcon}
            alt="close modal"
            className="cursor-pointer h-3"
            onClick={() => dispatch({ type: CLOSE_MODAL })}
          />
        </div>
        {/*price */}
        <div className="flex justify-between items-center">
          <div className="flex flex-col items-start">
            <p className="text-[#0F1629]">PRICE</p>
            <p className="text-[#0F1629]">{`₹ ${modal.current_price.toLocaleString()}`}</p>
          </div>
          <div className="flex flex-col items-start">
            <p className="text-[#0F1629]">24H</p>
            <div className="flex items-center justify-start gap-1">
              <img src={percentage1D >= 0 ? gapUpIcon : gapDownIcon} alt=" " />
              <p
                className={
                  percentage1D > 0
                    ? "text-gap-up"
                    : percentage1D == 0
                    ? "text-[#808A9D]"
                    : "text-gap-down"
                }
              >{`${percentage1D}%`}</p>
            </div>
          </div>
          <div className="flex flex-col items-start pr-5">
            <p className="text-[#0F1629]">7D</p>
            <div className="flex items-center justify-start  gap-1">
              <img src={percentage7D >= 0 ? gapUpIcon : gapDownIcon} alt=" " />
              <p
                className={
                  percentage7D > 0
                    ? "text-gap-up"
                    : percentage7D == 0
                    ? "text-[#808A9D]"
                    : "text-gap-down"
                }
              >{`${percentage7D}%`}</p>
            </div>
          </div>
        </div>
        {/*mcap */}
        <div className="flex justify-start items-start flex-col">
          <p>MARKET CAP</p>
          <p>{`₹ ${modal.market_cap.toLocaleString()}`}</p>
        </div>
        {/*volume */}
        <div className="flex justify-start items-start flex-col">
          <p>VOLUME (24H)</p>
          <div className="flex items-center justify-start gap-2">
            <p>{`₹ ${modal.total_volume.toLocaleString()}`}</p>
            <div className="flex text-[#808A9D] text-[0.7rem] items-end gap-1">
              <p>{` ${(modal.total_volume / modal.current_price)
                .toFixed(2)
                .toLocaleString()}`}</p>
              <p>{` ${modal.symbol.toUpperCase()}`}</p>
            </div>
          </div>
        </div>
        {/*CIRCULATION */}
        <div
          className={`circulation flex flex-col justify-center items-start gap-1`}
        >
          <p>{`CIRCULATING SUPPLY`}</p>
          <div className="flex text-[#808A9D] items-center gap-1">
            <p>{` ${modal.circulating_supply.toLocaleString()}`}</p>
            <p>{`${modal.symbol.toUpperCase()}`}</p>
          </div>
          <div className="h-[0.3rem] rounded  w-[35.33%] bg-[#EFF2F5]  ">
            <div
              className={`bg-[#CFD6E4]  h-full rounded `}
              style={{
                width: Math.round(
                  (modal.circulating_supply / modal.total_supply) * 100
                ),
              }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
