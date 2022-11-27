import React from "react";

const Loader = () => {
  return (
    <div className="  sm:h-[30vh]  w-full my-20 text-[#DBDCDF] flex justify-center items-center">
      <div className="spinner w-[3rem] h-[3rem] rounded-full border-solid border-[7px] border-[#a9a9a9] border-r-[#FAFAFA] animate-spin"></div>
    </div>
  );
};

export default Loader;
