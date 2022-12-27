import {
  GET_ALL_VIDEOGAMES,
  GET_ALL_BY_NAME,
  SET_BY_NAME,
  GET_ALL_GENRES,
  RESET_GAMES_TO_RENDER,
  RESET_GAMES_BY_NAME,
  RESET_FETCHING,
  CLEAN_GAMES_TO_RENDER,
  ORDER_BY,
  FILTER_BY_GENRES,
  FILTER_BY_CREATION,
} from "../actions/-index";

import { filteringByGenres } from "../auxFunctions";

let initialState = {
  allVideogames: [],
  gamesToRender: [],
  gamesByName: [],
  genres: [],
  successFetch: true,

  onlyFilterByGenreForAll: [],
  onlyFilterByGenreForNames: [],

  onlyFilterByCreationForAll: [],
  onlyFilterByCreationForNames: [],

  onlyOrderForAll: [],
  onlyOrderForNames: [],
};

export const mainData = (localState = initialState, action) => {
  switch (action.type) {
    case GET_ALL_VIDEOGAMES: {
      return {
        ...localState,
        allVideogames: action.payload,
        gamesToRender: action.payload,
      };
    }
    case GET_ALL_GENRES: {
      return {
        ...localState,
        genres: action.payload,
      };
    }
    case GET_ALL_BY_NAME: {
      if (action.payload.length === 0) {
        return {
          ...localState,
          successFetch: false,
          gamesByName: [], //esto se agrego luego
          gamesToRender: localState.allVideogames,
        };
      } else {
        return {
          ...localState,
          gamesToRender: action.payload,
          gamesByName: action.payload,
        };
      }
    }
    case RESET_GAMES_TO_RENDER: {
      return {
        ...localState,
        gamesToRender: localState.allVideogames,
      };
    }
    case RESET_GAMES_BY_NAME: {
      return {
        ...localState,
        gamesByName: [],
      };
    }
    case RESET_FETCHING: {
      return {
        ...localState,
        successFetch: true,
      };
    }
    case CLEAN_GAMES_TO_RENDER: {
      return {
        ...localState,
        gamesToRender: [],
      };
    }
    case SET_BY_NAME: {
      return {
        ...localState,
        gamesToRender: localState.gamesByName,
      };
    }
    case ORDER_BY: {
      if (action.payload.name !== "NO ORDER") {
        return {
          ...localState,
          gamesToRender: localState.gamesToRender
            .slice()
            .sort(action.payload.sortToApply),
          onlyOrderForAll: localState.allVideogames
            .slice()
            .sort(action.payload.sortToApply),
          onlyOrderForNames: localState.gamesByName
            .slice()
            .sort(action.payload.sortToApply),
        };
      } else {
        if (
          action.filterByCreationApplied === false &&
          action.filterByGenreApplied === false
        ) {
          if (localState.gamesByName.length > 0) {
            return {
              ...localState,
              onlyOrderForAll: [],
              onlyOrderForNames: [],
              gamesToRender: localState.gamesByName,
            };
          } else {
            return {
              ...localState,
              onlyOrderForAll: [],
              onlyOrderForNames: [],
              gamesToRender: localState.allVideogames,
            };
          }
        } else if (
          action.filterByCreationApplied === false &&
          action.filterByGenreApplied === true
        ) {
          if (localState.gamesByName.length > 0) {
            return {
              ...localState,
              onlyOrderForAll: [],
              onlyOrderForNames: [],
              gamesToRender: localState.onlyFilterByGenreForNames,
            };
          } else {
            return {
              ...localState,
              onlyOrderForAll: [],
              onlyOrderForNames: [],
              gamesToRender: localState.onlyFilterByGenreForAll,
            };
          }
        } else if (
          action.filterByCreationApplied !== false &&
          action.filterByGenreApplied === false
        ) {
          if (localState.gamesByName.length > 0) {
            return {
              ...localState,
              onlyOrderForAll: [],
              onlyOrderForNames: [],
              gamesToRender: localState.onlyFilterByCreationForNames,
            };
          } else {
            return {
              ...localState,
              onlyOrderForAll: [],
              onlyOrderForNames: [],
              gamesToRender: localState.onlyFilterByCreationForAll,
            };
          }
        } else if (
          action.filterByCreationApplied !== false &&
          action.filterByGenreApplied === true
        ) {
          if (localState.gamesByName.length > 0) {
            return {
              ...localState,
              onlyOrderForAll: [],
              onlyOrderForNames: [],
              gamesToRender: localState.onlyFilterByCreationForNames.filter(
                (g) => filteringByGenres(g, action.payload.name)
              ),
              //otra forma: localState.gamesByName
              // .filter((g) =>
              //   filteringByGenres(g, action.inputForFilterByGenre)
              // )
              // .filter((g) => action.payloadByCreation.filterToApply(g)),
            };
          } else {
            return {
              ...localState,
              onlyOrderForAll: [],
              onlyOrderForNames: [],
              gamesToRender: localState.onlyFilterByCreationForAll.filter((g) =>
                filteringByGenres(g, action.payload.name)
              ),
              // OTRA FORMA: localState.allVideogames
              //   .filter((g) =>
              //     filteringByGenres(g, action.inputForFilterByGenre)
              //   )
              //   .filter((g) => action.payloadByCreation.filterToApply(g)),
            };
          }
        }
      }
    }
    case FILTER_BY_GENRES: {
      if (action.payload !== "NO FILTER") {
        return {
          ...localState,
          gamesToRender: localState.gamesToRender.filter((g) =>
            filteringByGenres(g, action.payload)
          ),
          onlyFilterByGenreForAll: localState.allVideogames.filter((g) =>
            filteringByGenres(g, action.payload)
          ),
          onlyFilterByGenreForNames: localState.gamesByName.filter((g) =>
            filteringByGenres(g, action.payload)
          ),
        };
      } else {
        if (
          action.orderApplied === false &&
          action.filterByCreationApplied === false
        ) {
          if (localState.gamesByName.length > 0) {
            return {
              ...localState,
              onlyFilterByGenreForAll: [],
              onlyFilterByGenreForNames: [],
              gamesToRender: localState.gamesByName,
            };
          } else {
            return {
              ...localState,
              onlyFilterByGenreForAll: [],
              onlyFilterByGenreForNames: [],
              gamesToRender: localState.allVideogames,
            };
          }
        } else if (
          action.orderApplied === false &&
          action.filterByCreationApplied !== false
        ) {
          if (localState.gamesByName.length > 0) {
            return {
              ...localState,
              onlyFilterByGenreForAll: [],
              onlyFilterByGenreForNames: [],
              gamesToRender: localState.onlyFilterByCreationForNames,
            };
          } else {
            return {
              ...localState,
              onlyFilterByGenreForAll: [],
              onlyFilterByGenreForNames: [],
              gamesToRender: localState.onlyFilterByCreationForAll,
            };
          }
        } else if (
          action.orderApplied === true &&
          action.filterByCreationApplied === false
        ) {
          if (localState.gamesByName.length > 0) {
            return {
              ...localState,
              onlyFilterByGenreForAll: [],
              onlyFilterByGenreForNames: [],
              gamesToRender: localState.onlyOrderForNames,
            };
          } else {
            return {
              ...localState,
              onlyFilterByGenreForAll: [],
              onlyFilterByGenreForNames: [],
              gamesToRender: localState.onlyOrderForAll,
            };
          }
        } else if (
          action.orderApplied === true &&
          action.filterByCreationApplied !== false
        ) {
          if (localState.gamesByName.length > 0) {
            return {
              ...localState,
              onlyFilterByGenreForAll: [],
              onlyFilterByGenreForNames: [],
              gamesToRender: localState.onlyFilterByCreationForNames.filter(
                (g) => filteringByGenres(g, action.payload)
              ),
            };
          } else {
            return {
              ...localState,
              onlyFilterByGenreForAll: [],
              onlyFilterByGenreForNames: [],
              gamesToRender: localState.onlyFilterByCreationForAll.filter((g) =>
                filteringByGenres(g, action.payload)
              ),
            };
          }
        }
      }
    }
    case FILTER_BY_CREATION: {
      if (action.payload !== "NO FILTER") {
        return {
          ...localState,
          gamesToRender: localState.gamesToRender.filter((g) =>
            action.filterType.filterToApply(g)
          ),
          onlyFilterByCreationForAll: localState.allVideogames.filter((g) =>
            action.filterType.filterToApply(g)
          ),
          onlyFilterByCreationForNames: localState.gamesByName.filter((g) =>
            action.filterType.filterToApply(g)
          ),
        };
      } else {
        if (
          action.orderApplied === false &&
          action.filterByGenreApplied === false
        ) {
          if (localState.gamesByName.length > 0) {
            return {
              ...localState,
              onlyFilterByCreationForAll: [],
              onlyFilterByCreationForNames: [],
              gamesToRender: localState.gamesByName,
            };
          } else {
            return {
              ...localState,
              onlyFilterByCreationForAll: [],
              onlyFilterByCreationForNames: [],
              gamesToRender: localState.allVideogames,
            };
          }
        } else if (
          action.orderApplied === false &&
          action.filterByGenreApplied === true
        ) {
          if (localState.gamesByName.length > 0) {
            return {
              ...localState,
              onlyFilterByCreationForAll: [],
              onlyFilterByCreationForNames: [],
              gamesToRender: localState.onlyFilterByGenreForNames,
            };
          } else {
            return {
              ...localState,
              onlyFilterByCreationForAll: [],
              onlyFilterByCreationForNames: [],
              gamesToRender: localState.onlyFilterByGenreForAll,
            };
          }
        } else if (
          action.filterByGenreApplied === false &&
          action.orderApplied === true
        ) {
          if (localState.gamesByName.length > 0) {
            return {
              ...localState,
              onlyFilterByCreationForAll: [],
              onlyFilterByCreationForNames: [],
              gamesToRender: localState.onlyOrderForNames,
            };
          } else {
            return {
              ...localState,
              onlyFilterByCreationForAll: [],
              onlyFilterByCreationForNames: [],
              gamesToRender: localState.onlyOrderForAll,
            };
          }
        } else if (
          action.orderApplied === true &&
          action.filterByGenreApplied === true
        ) {
          if (localState.gamesByName.length > 0) {
            return {
              ...localState,
              onlyFilterByCreationForAll: [],
              onlyFilterByCreationForNames: [],
              gamesToRender: localState.onlyOrderForNames.filter((g) =>
                filteringByGenres(g, action.inputForFilterByGenre)
              ),
            };
          } else {
            return {
              ...localState,
              onlyFilterByCreationForAll: [],
              onlyFilterByCreationForNames: [],
              gamesToRender: localState.onlyOrderForAll.filter((g) =>
                filteringByGenres(g, action.inputForFilterByGenre)
              ),
            };
          }
        }
      }
    }
    default:
      return localState;
  }
};
