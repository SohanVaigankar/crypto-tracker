import React from "react";
import { Link } from "react-router-dom";
// components
import Navbar from "../components/navbar/Navbar";

const PageNotFound = () => {
  return (
    <>
      <Navbar />
      <div className="w-full h-full flex flex-col justify-center items-center mt-48">
        <h1 className="text-[2rem] font-[600]">404! Page Not Found</h1>
        <Link
          to="/"
          className="text-[#7d30ea] border-[#7d30ea] border-2 rounded mt-5 px-3 py-1"
        >
          go back to the homepage
        </Link>
      </div>
    </>
  );
};

export default PageNotFound;
