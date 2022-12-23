import React, { useState } from "react";
import downArrowIcon from "../../assets/icons/down_arrow.svg";
import upArrowIcon from "../../assets/icons/up_arrow.svg";

const DropdownMenu = ({
  valueList,
  currentValue,
  handleSetMenuFun,
  menuClasses,
  menuContainerClasses,
  menuItemClasses,
}) => {
  // state to keep track of open and close state of show Menu
  const [menuToggle, setMenuToggle] = useState(false);

  // fn to toggle dropdown menu
  const handleMenuToggle = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setMenuToggle(!menuToggle);
  };

  // fn to set dropdown data
  const handleSetMenu = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    setMenuToggle(!menuToggle);
    handleSetMenuFun(e.target.attributes["value"].value);
  };
  return (
    <div
      onClick={handleMenuToggle}
      onMouseLeave={(e) => {
        e.stopPropagation();
        setTimeout(() => {
          setMenuToggle(false);
        }, 250);
      }}
      className={menuClasses}
    >
      <span>{currentValue}</span>
      <img src={menuToggle ? upArrowIcon : downArrowIcon} className="h-3 w-3" />
      {menuToggle && (
        <ul onClick={handleSetMenu} className={menuContainerClasses}>
          {valueList.map((value) => (
            <li key={value} value={value} className={menuItemClasses}>
              {value}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default DropdownMenu;
