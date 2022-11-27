// icons
import rowMenuIcon from "../../assets/icons/table_row_menu_icon.svg";
import starIcon from "../../assets/icons/star_icon.svg";
import gapUpIcon from "../../assets/icons/gap_up_icon.svg";
import gapDownIcon from "../../assets/icons/gap_down_icon.svg";
// import descendingArrowIcon from "../../assets/icons/descending_arrow.svg"

// fn to convert numbers to millions, billions, etc
function convertNumbers(num) {
  // Trillions
  return Math.abs(Number(num)) >= 1.0e12
    ? (Math.abs(Number(num)) / 1.0e12).toFixed(2) + "T"
    : // Billions
    Math.abs(Number(num)) >= 1.0e9
    ? (Math.abs(Number(num)) / 1.0e9).toFixed(2) + "B"
    : // Millions
    Math.abs(Number(num)) >= 1.0e6
    ? (Math.abs(Number(num)) / 1.0e6).toFixed(2) + "M"
    : // Thousands
    Math.abs(Number(num)) >= 1.0e3
    ? (Math.abs(Number(num)) / 1.0e3).toFixed(2) + "K"
    : Math.abs(Number(num));
}

const listOfClasses = [
  "w-[3.5%] sm:w-[5%]  md:w-[2%]",
  "hidden md:flex md:w-[1%] -ml-3 lg:ml-0 lg:w-[1.5%] text-center ",
  "-ml-1 sm:ml-0 w-[40%] sm:w-[25%] md:w-[25%] md:w-[18%] xl:w-[15%]",
  "w-[25%] sm:w-[20%] md:w-[16%] md:w-[12%] xl:w-[6%] text-end",
  "w-[15%] sm:w-[12%] md:w-[8%] xl:w-[7%] text-end",
  "hidden lg:flex lg:w-[8%] xl:w-[7%] text-end justify-end",
  " hidden sm:flex sm:w-[15%] md:w-[10%] xl:w-[15%] text-end justify-end",
  " hidden md:flex md:w-[10%] xl:w-[13%] text-end justify-end",
  " hidden xl:flex xl:w-[13%] text-end justify-end",
  "hidden sm:flex sm:w-[5%] md:w-[3%]",
];

export const tableColumns = [
  {
    field: "favourite",
    classes: listOfClasses[0],
    headerName: "",
    renderCell: (params) => {
      return (
        <img
          src={starIcon}
          className={`fav-icon font-[400] h-[1rem] text-[1rem] text-center ${listOfClasses[0]}`}
          alt={"favourite"}
          key={params.tableIndex}
        />
      );
    },
  },
  {
    field: "serial-number",
    classes: listOfClasses[1],
    headerName: "#",
    renderCell: (params) => {
      return (
        <div
          className={`serial-no text-center ${listOfClasses[1]}`}
          key={params.tableIndex}
        >
          {params.index + 1}
        </div>
      );
    },
  },
  {
    field: "name",
    classes: listOfClasses[2],
    headerName: "NAME",
    renderCell: (params) => {
      let symbol = params.instrument.symbol;
      return (
        <div
          className={`image-cell flex justify-start items-center gap-[0.3rem] sm:gap-2 text-start ${listOfClasses[2]}`}
          key={params.tableIndex}
        >
          <img
            className="cell-img h-[1.5rem]"
            src={params.instrument?.image}
            alt="avatar"
          />
          <div>{params.instrument.name}</div>
          <div className="text-[#808A9D] text-[0.75rem]">
            {symbol.toUpperCase()}
          </div>
        </div>
      );
    },
  },

  {
    field: "price",
    classes: listOfClasses[3],
    headerName: "PRICE",
    renderCell: (params) => {
      return (
        <div
          key={params.tableIndex}
          className={`price-cell ${listOfClasses[3]}`}
        >{`₹ ${parseFloat(
          params.instrument.current_price.toFixed(2)
        ).toLocaleString()}`}</div>
      );
    },
  },
  {
    field: "daily-performance",
    classes: listOfClasses[4],
    headerName: `24H`,
    renderCell: (params) => {
      let percentage = parseFloat(
        params.instrument.price_change_percentage_24h_in_currency.toFixed(2)
      ).toLocaleString();
      return (
        <div
          key={params.tableIndex}
          className={`daily-performance-cell flex justify-end items-center gap-1 text-start ${listOfClasses[4]}`}
        >
          <img src={percentage >= 0 ? gapUpIcon : gapDownIcon} alt=" " />
          <p
            className={
              percentage > 0
                ? "text-gap-up"
                : percentage == 0
                ? "text-[#808A9D]"
                : "text-gap-down"
            }
          >{`${percentage}%`}</p>
        </div>
      );
    },
  },
  {
    field: "weekly-performance",
    classes: listOfClasses[5],
    headerName: "7D",
    renderCell: (params) => {
      let percentage = parseFloat(
        params.instrument.price_change_percentage_7d_in_currency.toFixed(2)
      ).toLocaleString();
      return (
        <div
          key={params.tableIndex}
          className={`weekly-performance-cell flex justify-start  items-center gap-1 text-start ${listOfClasses[5]}`}
        >
          <img src={percentage >= 0 ? gapUpIcon : gapDownIcon} alt=" " />
          <p
            className={
              percentage > 0
                ? "text-gap-up"
                : percentage == 0
                ? "text-[#808A9D]"
                : "text-gap-down"
            }
          >{`${percentage}%`}</p>
        </div>
      );
    },
  },
  {
    field: "mcap",
    classes: listOfClasses[6],
    headerName: "MARKET CAP",
    renderCell: (params) => {
      let mcap = params.instrument.market_cap;

      return (
        <div
          className={`market-cap ${listOfClasses[6]}`}
          key={params.tableIndex}
        >
          {`₹ ${
            params.screenWidth < 1280
              ? convertNumbers(mcap)
              : parseFloat(mcap.toFixed(2)).toLocaleString()
          }`}
        </div>
      );
    },
  },
  {
    field: "volume",
    classes: listOfClasses[7],
    headerName: "VOLUME(24H)",
    renderCell: (params) => {
      let volume = params.instrument.total_volume;
      let symbol = params.instrument.symbol;
      let currencyVolume = parseFloat(
        (volume / params.instrument.current_price).toFixed(2)
      );
      return (
        <div
          className={`volume flex flex-col justify-end items-end ${listOfClasses[7]}`}
          key={params.tableIndex}
        >
          <div className={``}>{`₹ ${
            params.screenWidth < 1280
              ? convertNumbers(volume)
              : parseFloat(volume.toFixed(2)).toLocaleString()
          }`}</div>
          <div className={`text-[#808A9D] text-[0.7rem]`}>{`${
            params.screenWidth < 1280
              ? convertNumbers(currencyVolume)
              : currencyVolume.toLocaleString()
          } ${symbol.toUpperCase()}`}</div>
        </div>
      );
    },
  },
  {
    field: "circulation",
    classes: listOfClasses[8],
    headerName: "CIRCULATING SUPPLY",
    renderCell: (params) => {
      let currentSupply = Math.round(params.instrument.circulating_supply);
      let totalSupply = params.instrument.total_supply;
      let supplyPercentage = Math.round((totalSupply / currentSupply) * 100);

      return (
        <div
          className={`circulation flex flex-col justify-center items-end gap-1 ${listOfClasses[8]}`}
          key={params.tableIndex}
        >
          <div className="flex gap-1">
            <p>{`${
              params.screenWidth < 1280
                ? convertNumbers(currentSupply)
                : parseFloat(currentSupply.toFixed(2)).toLocaleString()
            }`}</p>
            <p>{`${params.instrument.symbol.toUpperCase()}`}</p>
          </div>
          <div className="h-[0.4rem] rounded  w-full bg-[#EFF2F5]  ">
            <div
              className={`bg-[#CFD6E4]  h-full rounded `}
              style={{
                maxWidth:
                  currentSupply == 0 || totalSupply == 0
                    ? "0"
                    : supplyPercentage,
              }}
            ></div>
          </div>
        </div>
      );
    },
  },
  {
    field: "menu",
    classes: listOfClasses[9],
    headerName: "",
    renderCell: (params) => {
      return (
        <img
          src={rowMenuIcon}
          className={`fav-icon font-[400] h-[1rem] text-center cursor-pointer ${listOfClasses[9]}`}
          alt={"menu"}
          key={params.tableIndex}
        />
      );
    },
  },
];
