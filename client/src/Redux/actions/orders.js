import { ORDER_BY } from "./-index";
import { store } from "../store/index";
import { directoryOrder, directoryFilter } from "../auxFunctions";

export const order = (orderValue) => {
  let state = store.getState();
  let filterByCreationApplied = state.settings.filterByCreationApplied;
  let inputForFilterByGenre = state.settings.inputForFilterByGenre;
  let filterByGenreApplied = state.settings.filterByGenreApplied;
  let orderToApply = directoryOrder.find((o) => o.name === orderValue);
  let filterTypeToApply = directoryFilter.find(
    (f) => f.name === filterByCreationApplied
  );
  return {
    type: ORDER_BY,
    payload: orderToApply,
    payloadByCreation: filterTypeToApply,
    filterByCreationApplied,
    filterByGenreApplied,
    inputForFilterByGenre, //para pasarlo en el primer filter como 2do parametro
  };
};
