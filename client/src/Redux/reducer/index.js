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
  RESET_GAMESTORENDER,
  FETCHING,
  ORDER_BY,
  RESET_INPUT_VALUE,
  RESET_GAMES_BY_NAME,
  RESET_HOME,
  GET_ALL_GENRES,
  FILTER_BY_GENRES,
  RESET_INPUT_FILTER,
  SET_BY_NAME
} from "../actions";
let initialState = {
  allVideogames: [],
  gamesToRender: [],
  gamesByName: [],
  genres: [],
  inputToSearch: "",
  inputForOrder: "no order",
  inputForFilter: "no filter",
  successFetch: true,
  filterApplied: false,
  orderApplied:false,
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
      if (action.payload.length === 0) {
        return {
          ...state,
          successFetch: false,
          gamesToRender: state.allVideogames,
        };
      } else {
        return {
          ...state,
          gamesToRender: action.payload,
          gamesByName: action.payload,
        };
      }
    }
    case INPUT_SEARCHBAR: {
      return {
        ...state,
        inputToSearch: action.payload,
      };
    }
    case RESET_GAMESTORENDER: {
      return {
        ...state,
        gamesToRender: [],
      };
    }
    case FETCHING: {
      return {
        ...state,
        successFetch: true,
        inputToSearch: "",
      };
    }
    case ORDER_BY: {
      if (action.payload === "asc") {
        return {
          ...state,
          inputForOrder: "A>Z",
          gamesToRender: state.gamesToRender.slice().sort((m, n) => {
            if (m.title.toLowerCase() > n.title.toLowerCase()) {
              return 1;
            }
            if (n.title.toLowerCase() > m.title.toLowerCase()) {
              return -1;
            }
            return 0;
          }),
          orderApplied:true,
        };
      } else if (action.payload === "des") {
        return {
          ...state,
          inputForOrder: "Z>A",
          gamesToRender: state.gamesToRender.slice().sort((m, n) => {
            if (m.title.toLowerCase() > n.title.toLowerCase()) {
              return -1;
            }
            if (n.title.toLowerCase() > m.title.toLowerCase()) {
              return 1;
            }
            return 0;
          }),
          orderApplied:true,
        };
      } else if (action.payload === "greatest") {
        return {
          ...state,
          inputForOrder: "GREATEST RATING",
          gamesToRender: state.gamesToRender.slice().sort((m, n) => {
            if (m.rating > n.rating) {
              return -1;
            }
            if (n.rating > m.rating) {
              return 1;
            }
            return 0;
          }),
          orderApplied:true,
        };
      } else if (action.payload === "least") {
        return {
          ...state,
          inputForOrder: "LEAST RATING",
          gamesToRender: state.gamesToRender.slice().sort((m, n) => {
            if (m.rating > n.rating) {
              return 1;
            }
            if (n.rating > m.rating) {
              return -1;
            }
            return 0;
      
          }),
          orderApplied:true,
        };
      } else if (action.payload === "noOrder") {
        if (state.filterApplied === false && state.inputToSearch === "") {
          return {
            ...state,
            gamesToRender: state.allVideogames,
            orderApplied:false,
          };
        } else if (
          state.filterApplied === false &&
          state.inputToSearch !== ""
        ) {
          return {
            ...state,
            gamesToRender: state.gamesByName,
            orderApplied:false,
          };
        }
      }
      break;
      // else {
      //   return {
      //     ...state,
      //     gamesToRender: withoutOrder,
      //   };
      // }
    }
    case RESET_INPUT_VALUE: {
      return {
        ...state,
        inputForOrder: "no order",
        orderApplied:false,
      };
    }
    case RESET_GAMES_BY_NAME: {
      return {
        ...state,
        gamesByName: [],
      };
    }
    case RESET_HOME: {
      return {
        ...state,
        gamesByName: [],
        gamesToRender: state.allVideogames,
        orderApplied:false,
        filterApplied: false,
        inputToSearch: "",
        inputForOrder: "no order",
        inputForFilter: "no filter"
      };
    }
    case GET_ALL_GENRES: {
      return {
        ...state,
        genres: action.payload,
      };
    }
    case FILTER_BY_GENRES: {
      if(state.orderApplied===false && state.inputToSearch=== "") {
        return{
          ...state,
        filterApplied: true,
        inputForFilter: action.payload,
        gamesToRender: state.allVideogames.slice().filter((game) =>
          game.genres.includes(action.payload)
        ),
        }
      }
      if(state.orderApplied===false && state.inputToSearch!== ""){
        return {
          ...state,
          filterApplied: true,
          inputForFilter: action.payload,
          gamesToRender: state.gamesByName.slice().filter((game) =>
          game.genres.includes(action.payload)
        )
        }
      }
    }
    case RESET_INPUT_FILTER:{
      return {
        ...state,
        inputForFilter: "no filter",
        filterApplied: false
      }
    }
    case SET_BY_NAME:{
      return {
        ...state,
        inputForFilter: "no filter",
        filterApplied: false,
        gamesToRender: state.gamesByName
      }
    }
    default:
      return state;
  }
};
