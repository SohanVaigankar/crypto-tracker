import React, { useState, useEffect, useContext } from "react";

const Pagination = ({
  data,
  itemsPerPage,
  currentPage,
  setCurrentPage,
  setCurrentPageItems,
}) => {
  // pagination
  // indices of page item of the current page
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = parseInt(indexOfLastItem) - parseInt(itemsPerPage);

  useEffect(() => {
    data.length > itemsPerPage
      ? setCurrentPageItems(data.slice(indexOfFirstItem, indexOfLastItem))
      : setCurrentPageItems(data);
  }, [itemsPerPage, currentPage, data]);

  let pageNumbers = [];
  for (let i = 1; i <= Math.ceil(data.length / itemsPerPage); i++) {
    pageNumbers.push(i);
  }

  const handleOnClick = (e) => {
    e.preventDefault();
    setCurrentPage(parseInt(e.target.value));
  };

  return (
    data.length > itemsPerPage && (
      <ul className="flex justify-center xl:justify-end items-center gap-2 py-8 px-5 flex-wrap">
        <li
          className={`px-4 py-2 border-[1px] border-solid border-[#DFE3E8] rounded cursor-pointer ${
            currentPage <= 1 ? "bg-utility-2-bg text-[#FFFFFF] font-[800]" : ""
          }`}
          value={currentPage - 1 > 0 ? currentPage - 1 : currentPage}
          onClick={(e) => handleOnClick(e, "prev")}
        >{`<`}</li>
        {pageNumbers.map((element, index) => (
          <li
            value={element}
            className={`px-4 py-2 border-[1px] border-solid font-[600] ${
              element != currentPage
                ? "  border-[#DFE3E8]"
                : "border-pagination-font text-pagination-font"
            } rounded cursor-pointer `}
            onClick={(e) => setCurrentPage(parseInt(e.target.value))}
            key={element}
          >
            {element}
          </li>
        ))}

        <li
          className={`px-4 py-2 border-[1px] border-solid border-[#DFE3E8] rounded cursor-pointer ${
            currentPage + 1 > pageNumbers.length
              ? "bg-utility-2-bg text-[#FFFFFF] font-[800]"
              : ""
          }`}
          onClick={(e) => handleOnClick(e, "next")}
          value={
            currentPage < pageNumbers.length ? currentPage + 1 : currentPage
          }
        >{`>`}</li>
      </ul>
    )
  );
};

export default Pagination;
