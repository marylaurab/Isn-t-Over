import {
  SET_INPUT_SEARCHBAR,
  SET_INPUT_FILTER_BY_GENRE,
  SET_INPUT_FILTER_BY_CREATION,
  SET_INPUT_ORDER,
  RESET_INPUT_SEARCHBAR,
  RESET_INPUT_FILTER_BY_GENRE,
  RESET_INPUT_FILTER_BY_CREATION,
  RESET_INPUT_ORDER,
} from "../actions/-index";

let initialState = {
  inputForSearch: "",
  inputForOrder: "NO ORDER",
  inputForFilterByGenre: "NO FILTER",
  inputForFilterByCreation: "NO FILTER",
  filterByCreationApplied: false,
  filterByGenreApplied: false,
  orderApplied: false,
};

export const settings = (localState = initialState, action) => {
  switch (action.type) {
    case SET_INPUT_SEARCHBAR: {
      return {
        ...localState,
        inputForSearch: action.payload,
      };
    }
    case SET_INPUT_FILTER_BY_GENRE: {
      if (action.payload === "NO FILTER") {
        return {
          ...localState,
          inputForFilterByGenre: action.payload,
          filterByGenreApplied: false,
        };
      } else {
        return {
          ...localState,
          inputForFilterByGenre: action.payload,
          filterByGenreApplied: true,
        };
      }
    }
    case SET_INPUT_FILTER_BY_CREATION: {
      if (action.payload === "NO FILTER") {
        return {
          ...localState,
          inputForFilterByCreation: action.payload,
          filterByCreationApplied: false,
        };
      } else {
        return {
          ...localState,
          inputForFilterByCreation: action.payload,
          filterByCreationApplied: true,
        };
      }
    }
    case SET_INPUT_ORDER: {
      if (action.payload === "NO ORDER") {
        return {
          ...localState,
          inputForOrder: action.payload,
          orderApplied: false,
        };
      } else {
        return {
          ...localState,
          inputForOrder: action.payload,
          orderApplied: true,
        };
      }
    }
    case RESET_INPUT_SEARCHBAR: {
      return {
        ...localState,
        inputForSearch: "",
      };
    }
    case RESET_INPUT_FILTER_BY_GENRE: {
      return {
        ...localState,
        inputForFilterByGenre: "NO FILTER",
        filterByGenreApplied: false,
      };
    }
    case RESET_INPUT_FILTER_BY_CREATION:{
      return {
        ...localState,
        inputForFilterByCreation: "NO FILTER",
        filterByCreationApplied: false,
      };
    }
    case RESET_INPUT_ORDER: {
      return {
        ...localState,
        inputForOrder: "NO ORDER",
        orderApplied: false,
      };
    }
    default:
      return localState;
  }
};
