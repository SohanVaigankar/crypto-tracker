import {
  LOAD_CURRENCY_DATA,
  LOAD_EXCHANGE_DATA,
  OPEN_MODAL,
  CLOSE_MODAL,
  SET_ITEMS_PER_PAGE,
  SET_BASE_CURRENCY,
  TOGGLE_LOADING,
  SHOW_FAVOURITE_TOGGLE,
  FAVOURITE_TOGGLE,
  SET_INSTRUMENT_TYPE,
} from "../action.types";

export const CryptoReducer = (state, action) => {
  switch (action.type) {
    case LOAD_CURRENCY_DATA:
      return {
        ...state,
        cryptoData: action.payload.cryptoData,
      };
    case LOAD_EXCHANGE_DATA:
      return {
        ...state,
        exchangeData: action.payload.exchangeData,
      };
    case SET_INSTRUMENT_TYPE:
      return { ...state, instrumentType: action.payload.instrumentType };
    case TOGGLE_LOADING:
      return { ...state, isLoading: !state.isLoading };
    case OPEN_MODAL:
      return { ...state, modal: action.payload.modal };
    case CLOSE_MODAL:
      return { ...state, modal: null };
    case SET_ITEMS_PER_PAGE:
      return { ...state, itemsPerPage: action.payload.itemsPerPage };
    case SET_BASE_CURRENCY:
      return { ...state, baseCurrency: action.payload.baseCurrency };
    case SHOW_FAVOURITE_TOGGLE:
      return { ...state, showFavourites: action.payload.showFavourites };

    case FAVOURITE_TOGGLE:
      // fn to toggle item to/from the favourite list.. return the list of final items
      const favouriteToggler = (state, action) => {
        // checking if the item is present in the list
        return state.favouriteList[state.instrumentType]?.includes(
          action.payload.favourite
        )
          ? // filtering out  items to unfavourite them
            [
              ...state.favouriteList[state.instrumentType]?.filter(
                (element) => element != action.payload.favourite
              ),
            ]
          : // adding to the favourite list
            [
              ...state.favouriteList[state.instrumentType],
              action.payload.favourite,
            ];
      };
      // updaing reducer state in a nested object
      return {
        ...state,
        favouriteList: {
          ...state.favouriteList,
          cryptocurrencies:
            state.instrumentType === "cryptocurrencies"
              ? favouriteToggler(state, action)
              : [...state.favouriteList.cryptocurrencies],
          cryptoexchanges:
            state.instrumentType === "cryptoexchanges"
              ? favouriteToggler(state, action)
              : [...state.favouriteList.cryptoexchanges],
        },
      };

    default:
      return { ...state };
  }
};
