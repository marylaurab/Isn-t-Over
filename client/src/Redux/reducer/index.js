import {
  GET_ALL_VIDEOGAMES,
  SET_AUX_PAGINATE,
  SET_PAGES,
  SET_NEXTPIVOT,
  SET_PREVPIVOT,
  SET_SUBPAGES,
  PREV_PAGE,
  NEXT_PAGE,
  ON_SPECIFIC_PAGE,
  PREV_SUBPAGE,
  NEXT_SUBPAGE,
  ALL_BY_NAME,
  INPUT_SEARCHBAR,
} from "../actions";
let initialState = {
  allVideogames: [],
  gamesToRender: [],
  inputToSearch: "",
  perPage: 15,
  currentPage: 1,
  perSubPages: 3,
  pages: [],
  totalGames: 0,
  totalPagesToRender: 0,
  conditional: 0,
  currentSubPage: 1,
  indexes: { j: 0, k: 1, l: 2 },
  renderSubPages: [],
};
export const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_VIDEOGAMES: {
      return {
        ...state,
        allVideogames: action.payload,
        gamesToRender: action.payload,
      };
    }
    case SET_AUX_PAGINATE: {
      return {
        ...state,
        totalGames: state.gamesToRender.length,
        totalPagesToRender: Math.ceil(
          state.gamesToRender.length / state.perPage
        ),
        conditional: Math.ceil(
          Math.ceil(state.gamesToRender.length / state.perPage) /
            state.perSubPages
        ),
      };
    }
    case SET_PAGES: {
      let auxPages = [];
      for (let i = 1; i <= state.totalPagesToRender; i++) {
        auxPages.push(i);
      }
      return {
        ...state,
        pages: auxPages,
      };
    }
    case SET_SUBPAGES: {
      return {
        ...state,
        renderSubPages: [
          state.pages[state.indexes.j],
          state.pages[state.indexes.k],
          state.pages[state.indexes.l],
        ].filter((e) => e !== undefined),
      };
    }
    case PREV_PAGE: {
      return {
        ...state,
        currentPage: state.currentPage - 1,
      };
    }
    case NEXT_PAGE: {
      return {
        ...state,
        currentPage: state.currentPage + 1,
      };
    }
    case ON_SPECIFIC_PAGE: {
      return {
        ...state,
        currentPage: action.payload,
      };
    }
    case PREV_SUBPAGE: {
      return {
        ...state,
        indexes: {
          j: state.indexes.j - state.perSubPages,
          k: state.indexes.k - state.perSubPages,
          l: state.indexes.l - state.perSubPages,
        },
        currentSubPage: state.currentSubPage - action.payload,
      };
    }
    case NEXT_SUBPAGE: {
      return {
        ...state,
        indexes: {
          j: state.indexes.j + state.perSubPages,
          k: state.indexes.k + state.perSubPages,
          l: state.indexes.l + state.perSubPages,
        },
        currentSubPage: state.currentSubPage + action.payload,
      };
    }
    case SET_NEXTPIVOT: {
      return {
        ...state,
        currentPage: state.pages[state.indexes.j],
      };
    }
    case SET_PREVPIVOT: {
      return {
        ...state,
        currentPage: state.pages[state.indexes.l],
      };
    }
    case ALL_BY_NAME: {
      return {
        ...state,
        gamesToRender: action.payload,
      };
    }
    case INPUT_SEARCHBAR: {
      return {
        ...state,
        inputToSearch: action.payload,
      };
    }
    default:
      return state;
  }
};
