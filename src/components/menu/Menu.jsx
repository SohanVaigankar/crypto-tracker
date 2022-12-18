import React, { useState } from "react";
import rowMenuIcon from "../../assets/icons/table_row_menu_icon.svg";

const Menu = ({ params, listOfClasses }) => {
  // state to toggle row menu
  const [menuToggle, setMenuToggle] = useState(false);

  const handleMenuToggle = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setMenuToggle(!menuToggle);
  };

  return (
    <div
      className={`fav-icon font-[400] h-[1rem] text-center cursor-pointer relative ${listOfClasses} `}
      onClick={handleMenuToggle}
      onMouseLeave={(e) => {
        e.stopPropagation();
        setMenuToggle(false);
      }}
    >
      <img
        src={rowMenuIcon}
        className={`p-1 hover:bg-[#00000013] rounded`}
        alt={"menu"}
      />
      {menuToggle && (
        <ul className="absolute top-[70%] right-[100%] -mr-1  rounded bg-utility-bg z-40 p-2 transition ">
          <li className="w-fit whitespace-nowrap px-2 py-1 hover:bg-[#0000000a] rounded text-[0.9rem]">
            view details
          </li>
          <li className="w-fit whitespace-nowrap px-2 py-1 hover:bg-[#0000000a] rounded text-[0.9rem]">
            view charts
          </li>
        </ul>
      )}
    </div>
  );
};

export default Menu;
