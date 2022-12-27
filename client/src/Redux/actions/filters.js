import { FILTER_BY_GENRES, FILTER_BY_CREATION } from "./-index";
import { store } from "../store/index";
import {
  filteringByGenres,
  directoryFilter,
  directoryOrder,
} from "../auxFunctions";
import { useSelector } from "react-redux";
export const filterByGenres = (genre) => {
  let state = store.getState();
  let orderApplied = state.settings.orderApplied;
  let filterByCreationApplied = state.settings.filterByCreationApplied;

  return {
    type: FILTER_BY_GENRES,
    payload: genre,
    orderApplied,
    filterByCreationApplied, //realemnte lo uso en el reducer?
    filteringByGenres,
  };
};

export const filterByCreation = (typeOfCreation) => {
  let state = store.getState();
  let inputForFilterByGenre = state.settings.inputForFilterByGenre;
  let orderApplied = state.settings.orderApplied;
  let filterByGenreApplied = state.settings.filterByGenreApplied;
  let inputForOrder = state.settings.inputForOrder;
  let filterType = directoryFilter.find((f) => f.name === typeOfCreation);
  let orderType = directoryOrder.find((o) => o.name === inputForOrder);
  return {
    type: FILTER_BY_CREATION,
    payload: typeOfCreation,
    orderApplied,
    filterByGenreApplied,
    filterType,
    inputForFilterByGenre,
    orderType,
  };
};
