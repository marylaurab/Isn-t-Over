import { FILTER_BY_GENRES, FILTER_BY_CREATION } from "./-index";
import { store } from "../store/index";
import {
  filteringGenreDirectory,
  filteringCreationDirectory,
  directoryByGenre,
  directoryByCreationNoApplied,
} from "../auxFunctions";
export const filterByGenres = (genre) => {
  let state = store.getState();
  let orderApplied = state.settings.orderApplied;
  let filterByCreationApplied = state.settings.filterByCreationApplied;
  let applyingFilter = directoryByGenre.find((f) =>
    filteringGenreDirectory(f, genre, orderApplied, filterByCreationApplied)
  );
  return {
    type: FILTER_BY_GENRES,
    payload: genre,
    applyingFilter,
  };
};

export const filterByCreation = (created) => {
  let state = store.getState();
  let orderApplied = state.settings.orderApplied;
  let filterByGenreApplied = state.settings.filterByGenreApplied;
  let inputForFilterByGenre = state.settings.inputForFilterByGenre;
  let flags = directoryByCreationNoApplied.find((o) =>
    filteringCreationDirectory(o, created, orderApplied, filterByGenreApplied)
  );
  return {
    type: FILTER_BY_CREATION,
    payload: created,
    inputForFilterByGenre,
    flags,
  };
};