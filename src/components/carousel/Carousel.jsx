import React from "react";
import "./carousel.css";

import useResolution from "../../hooks/useResolution";

import { carouselData } from "../../data/carouselData";
// icons
import rightIcon from "../../assets/icons/carousel_right.svg";
import leftIcon from "../../assets/icons/carousel_left.svg";

const Carousel = () => {
  const screenResolution = useResolution();

  const carouselLimit =
    screenResolution <= 768
      ? 1
      : screenResolution > 768 && screenResolution <= 1240
      ? 2
      : 3;

  return (
    <div className="bg-secondary-bg">
      <div className="carousel-top flex justify-center items-center w-[95%] md:w-[90%] lg:w-[85%] mx-auto px-5 py-6 md:gap-5  xl:gap-[3%]">
        <img
          src={leftIcon}
          alt="left"
          className="carousel-left cursor-pointer absolute hidden lg:flex lg:-left-[-4.5%] xl:-left-[-5%]"
        />
        <div className="carousel-center flex w-[100%] justify-center items-start gap-10  mx-auto ">
          {carouselData.map(
            (data, index) =>
              index < carouselLimit && (
                <div
                  className={`carousel-element flex justify-center  xl:justify-start items-center gap-10 md:gap-4 bg-tertary-bg rounded-[12px] h-[8rem]  px-5 py-3 cursor-pointer ${
                    carouselLimit >= 3
                      ? "w-[33%]"
                      : carouselLimit === 2
                      ? "w-[50%]"
                      : "w-[85%] sm:w-[75%]"
                  }`}
                  key={index}
                >
                  <img
                    className="w-20 h-20"
                    src={data.imageLink}
                    alt={data.heading}
                  />
                  <div className="carousel-element-info flex flex-col justify-start items-start p-1">
                    <p className="info-heading text-sm text-tertary-font">
                      {data.heading}
                    </p>
                    <p className="info-description">{data.description}</p>
                  </div>
                </div>
              )
          )}
        </div>
        <img
          src={rightIcon}
          alt="right"
          className="carousel-right cursor-pointer absolute hidden lg:flex lg:-right-[-4.5%] xl:-right-[-5%]"
        />
      </div>
      <ul className="carousel-bottom flex justify-center items-center gap-5 lg:hidden">
        {carouselData.map((data, index) => (
          <li
            className="p-[3px] h-1 w-1 rounded-full border-solid border-[1px] border-pagination-font cursor-pointer"
            key={index}
          ></li>
        ))}
      </ul>
    </div>
  );
};

export default Carousel;
