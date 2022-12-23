import {
  LOAD_DATA,
  OPEN_MODAL,
  CLOSE_MODAL,
  SET_ITEMS_PER_PAGE,
  SET_BASE_CURRENCY,
  TOGGLE_LOADING,
  FAVOURITE_TOGGLE,
  SET_INSTRUMENT_TYPE,
} from "../action.types";

export const CryptoReducer = (state, action) => {
  switch (action.type) {
    case LOAD_DATA:
      return { ...state, cryptoData: action.payload.cryptoData };
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
    case FAVOURITE_TOGGLE:
      return {
        ...state,
        favouriteList: state.favouriteList.includes(action.payload.favourite)
          ? [
              ...state.favouriteList.filter(
                (element) => element != action.payload.favourite
              ),
            ]
          : [...state.favouriteList, action.payload.favourite],
      };
    default:
      return { ...state };
  }
};
