import {
  LOAD_DATA,
  SET_CURRENT_PAGE,
  OPEN_MODAL,
  CLOSE_MODAL,
  SET_ITEMS_PER_PAGE,
} from "../action.types";

export const CryptoReducer = (state, action) => {
  switch (action.type) {
    case LOAD_DATA:
      return { ...state, cryptoData: action.payload.cryptoData };
    case OPEN_MODAL:
      return { ...state, modal: action.payload.modal };
    case CLOSE_MODAL:
      return { ...state, modal: null };
    case SET_CURRENT_PAGE:
      return { ...state, currentPage: action.payload.currentPage};
    case SET_ITEMS_PER_PAGE:
      return { ...state, itemsPerPage: action.payload.itemsPerPage };
    default:
      return { ...state };
  }
};
