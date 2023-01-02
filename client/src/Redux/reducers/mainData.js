import {
  GET_ALL_VIDEOGAMES,
  GET_ALL_BY_NAME,
  SET_BY_NAME,
  GET_ALL_GENRES,
  GET_DETAILS,
  GET_PLATFORMS,
  RESET_GAMES_TO_RENDER,
  RESET_GAMES_BY_NAME,
  RESET_FETCHING,
  RESET_SOME_APPLIED_FILTER_FLAG,
  CLEAN_GAMES_TO_RENDER,
  ORDER_BY,
  FILTER_BY_GENRES,
  FILTER_BY_CREATION,
  SET_FLAG_SOME_FILTER_APPLIED,
} from "../actions/-index";

import { filteringByGenres, filteringByCreated } from "../auxFunctions";

let initialState = {
  allVideogames: [],
  gamesToRender: [],
  gamesByName: [],
  genres: [],
  detailGame: [],
  platforms:[],

  successFetch: true,
  someFilterApplied: false,

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
          gamesByName: [],
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
    case GET_DETAILS: {
      return {
        ...localState,
        detailGame: action.payload,
      };
    }
    case GET_PLATFORMS:{
      return {
        ...localState,
        platforms: action.payload
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
    case RESET_SOME_APPLIED_FILTER_FLAG: {
      return {
        ...localState,
        someFilterApplied: false,
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
      if (action.applyingOrder.name !== "NO ORDER") {
        return {
          ...localState,
          gamesToRender: localState.gamesToRender
            .slice()
            .sort(action.applyingOrder.sortToApply),
          onlyOrderForAll: localState.allVideogames
            .slice()
            .sort(action.applyingOrder.sortToApply),
          onlyOrderForNames: localState.gamesByName
            .slice()
            .sort(action.applyingOrder.sortToApply),
        };
      } else {
        if (action.flags.id === 1 && localState.gamesByName.length === 0) {
          return {
            ...localState,
            gamesToRender: localState.allVideogames,
            onlyOrderForAll: [],
            onlyOrderForNames: [],
          };
        } else if (action.flags.id === 1 && localState.gamesByName.length > 0) {
          return {
            ...localState,
            gamesToRender: localState.gamesByName,
            onlyOrderForAll: [],
            onlyOrderForNames: [],
          };
        } else if (
          action.flags.id === 2 &&
          localState.gamesByName.length === 0
        ) {
          return {
            ...localState,
            gamesToRender: localState.onlyFilterByGenreForAll,
            onlyOrderForAll: [],
            onlyOrderForNames: [],
          };
        } else if (action.flags.id === 2 && localState.gamesByName.length > 0) {
          return {
            ...localState,
            gamesToRender: localState.onlyFilterByGenreForNames,
            onlyOrderForAll: [],
            onlyOrderForNames: [],
          };
        } else if (
          action.flags.id === 3 &&
          localState.gamesByName.length === 0
        ) {
          return {
            ...localState,
            gamesToRender: localState.onlyFilterByCreationForAll,
            onlyOrderForAll: [],
            onlyOrderForNames: [],
          };
        } else if (action.flags.id === 3 && localState.gamesByName.length > 0) {
          return {
            ...localState,
            gamesToRender: localState.onlyFilterByCreationForNames,
            onlyOrderForAll: [],
            onlyOrderForNames: [],
          };
        } else if (
          action.flags.id === 4 &&
          localState.gamesByName.length === 0
        ) {
          return {
            ...localState,
            gamesToRender: localState.onlyFilterByCreationForAll.filter((g) =>
              filteringByGenres(g, action.inputForFilterByGenre)
            ),
            onlyOrderForAll: [],
            onlyOrderForNames: [],
          };
        } else if (action.flags.id === 4 && localState.gamesByName.length > 0) {
          return {
            ...localState,
            gamesToRender: localState.onlyFilterByCreationForNames.filter((g) =>
              filteringByGenres(g, action.inputForFilterByGenre)
            ),
            onlyOrderForAll: [],
            onlyOrderForNames: [],
          };
        }
      }
    }
    case FILTER_BY_GENRES: {
      if (
        action.applyingFilter.id === 1 &&
        localState.gamesByName.length === 0
      ) {
        return {
          ...localState,
          gamesToRender: localState.allVideogames.filter((g) =>
            filteringByGenres(g, action.payload)
          ),
          onlyFilterByGenreForAll: localState.allVideogames.filter((g) =>
            filteringByGenres(g, action.payload)
          ),
          onlyFilterByGenreForNames: [],
        };
      } else if (
        action.applyingFilter.id === 1 &&
        localState.gamesByName.length > 0
      ) {
        return {
          ...localState,
          gamesToRender: localState.gamesByName.filter((g) =>
            filteringByGenres(g, action.payload)
          ),
          onlyFilterByGenreForAll: localState.allVideogames.filter((g) =>
            filteringByGenres(g, action.payload)
          ),
          onlyFilterByGenreForNames: localState.gamesByName.filter((g) =>
            filteringByGenres(g, action.payload)
          ),
        };
      } else if (
        action.applyingFilter.id === 2 &&
        localState.gamesByName.length === 0
      ) {
        return {
          ...localState,
          gamesToRender: localState.onlyOrderForAll.filter((g) =>
            filteringByGenres(g, action.payload)
          ),
          onlyFilterByGenreForAll: localState.allVideogames.filter((g) =>
            filteringByGenres(g, action.payload)
          ),
          onlyFilterByGenreForNames: [],
        };
      } else if (
        action.applyingFilter.id === 2 &&
        localState.gamesByName.length > 0
      ) {
        return {
          ...localState,
          gamesToRender: localState.onlyOrderForNames.filter((g) =>
            filteringByGenres(g, action.payload)
          ),
          onlyFilterByGenreForAll: localState.allVideogames.filter((g) =>
            filteringByGenres(g, action.payload)
          ),
          onlyFilterByGenreForNames: localState.gamesByName.filter((g) =>
            filteringByGenres(g, action.payload)
          ),
        };
      } else if (
        action.applyingFilter.id === 3 &&
        localState.gamesByName.length === 0
      ) {
        return {
          ...localState,
          gamesToRender: localState.onlyFilterByCreationForAll.filter((g) =>
            filteringByGenres(g, action.payload)
          ),
          onlyFilterByGenreForAll: localState.allVideogames.filter((g) =>
            filteringByGenres(g, action.payload)
          ),
          onlyFilterByGenreForNames: [],
        };
      } else if (
        action.applyingFilter.id === 3 &&
        localState.gamesByName.length > 0
      ) {
        return {
          ...localState,
          gamesToRender: localState.onlyFilterByCreationForAll.filter((g) =>
            filteringByGenres(g, action.payload)
          ),
          onlyFilterByGenreForAll: localState.allVideogames.filter((g) =>
            filteringByGenres(g, action.payload)
          ),
          onlyFilterByGenreForNames: localState.gamesByName.filter((g) =>
            filteringByGenres(g, action.payload)
          ),
        };
      } else if (
        action.applyingFilter.id === 4 &&
        localState.gamesByName.length === 0
      ) {
        return {
          ...localState,
          gamesToRender: localState.onlyOrderForAll
            .filter((g) => filteringByGenres(g, action.payload))
            .filter((g) => filteringByCreated(g)),
          onlyFilterByGenreForAll: localState.allVideogames.filter((g) =>
            filteringByGenres(g, action.payload)
          ),
          onlyFilterByGenreForNames: [],
        };
      } else if (
        action.applyingFilter.id === 4 &&
        localState.gamesByName.length > 0
      ) {
        return {
          ...localState,
          gamesToRender: localState.onlyOrderForNames
            .filter((g) => filteringByGenres(g, action.payload))
            .filter((g) => filteringByCreated(g)),
          onlyFilterByGenreForAll: localState.allVideogames.filter((g) =>
            filteringByGenres(g, action.payload)
          ),
          onlyFilterByGenreForNames:
            localState.onlyFilterByGenreForNames.filter((g) =>
              filteringByCreated(g, action.payload)
            ),
        };
      } else if (
        action.applyingFilter.id === 5 &&
        localState.gamesByName.length === 0
      ) {
        return {
          ...localState,
          gamesToRender: localState.allVideogames,
          onlyFilterByGenreForAll: [],
          onlyFilterByGenreForNames: [],
          someFilterApplied: false,
        };
      } else if (
        action.applyingFilter.id === 5 &&
        localState.gamesByName.length > 0
      ) {
        return {
          ...localState,
          gamesToRender: localState.gamesByName,
          onlyFilterByGenreForAll: [],
          onlyFilterByGenreForNames: [],
          someFilterApplied: false,
        };
      } else if (
        action.applyingFilter.id === 6 &&
        localState.gamesByName.length === 0
      ) {
        return {
          ...localState,
          gamesToRender: localState.onlyOrderForAll,
          onlyFilterByGenreForAll: [],
          onlyFilterByGenreForNames: [],
          someFilterApplied: false,
        };
      } else if (
        action.applyingFilter.id === 6 &&
        localState.gamesByName.length > 0
      ) {
        return {
          ...localState,
          gamesToRender: localState.onlyOrderForNames,
          onlyFilterByGenreForAll: [],
          onlyFilterByGenreForNames: [],
          someFilterApplied: false,
        };
      } else if (
        action.applyingFilter.id === 7 &&
        localState.gamesByName.length === 0
      ) {
        return {
          ...localState,
          gamesToRender: localState.onlyFilterByCreationForAll,
          onlyFilterByGenreForAll: [],
          onlyFilterByGenreForNames: [],
        };
      } else if (
        action.applyingFilter.id === 7 &&
        localState.gamesByName.length > 0
      ) {
        return {
          ...localState,
          gamesToRender: localState.onlyFilterByCreationForNames,
          onlyFilterByGenreForAll: [],
          onlyFilterByGenreForNames: [],
        };
      } else if (
        action.applyingFilter.id === 8 &&
        localState.gamesByName.length === 0
      ) {
        return {
          ...localState,
          gamesToRender: localState.onlyOrderForAll.filter((g) =>
            filteringByCreated(g)
          ),
          onlyFilterByGenreForAll: [],
          onlyFilterByGenreForNames: [],
        };
      } else if (
        action.applyingFilter.id === 8 &&
        localState.gamesByName.length > 0
      ) {
        return {
          ...localState,
          gamesToRender: localState.onlyOrderForNames.filter((g) =>
            filteringByCreated(g)
          ),
          onlyFilterByGenreForAll: [],
          onlyFilterByGenreForNames: [],
        };
      }
    }
    case FILTER_BY_CREATION: {
      if (action.payload !== "NO FILTER") {
        return {
          ...localState,
          gamesToRender: localState.gamesToRender.filter((g) =>
            filteringByCreated(g)
          ),
          onlyFilterByCreationForAll: localState.allVideogames.filter((g) =>
            filteringByCreated(g)
          ),
          onlyFilterByCreationForNames: localState.gamesByName.filter((g) =>
            filteringByCreated(g)
          ),
        };
      } else {
        if (action.flags.id === 1) {
          return {
            ...localState,
            gamesToRender: localState.allVideogames,
            onlyFilterByCreationForAll: [],
            onlyFilterByCreationForNames: [],
          };
        } else if (action.flags.id === 2) {
          return {
            ...localState,
            gamesToRender: localState.onlyFilterByGenreForAll,
            onlyFilterByCreationForAll: [],
            onlyFilterByCreationForNames: [],
          };
        } else if (action.flags.id === 3) {
          return {
            ...localState,
            gamesToRender: localState.onlyOrderForAll,
            onlyFilterByCreationForAll: [],
            onlyFilterByCreationForNames: [],
          };
        } else if (action.flags.id === 4) {
          return {
            ...localState,
            gamesToRender: localState.onlyOrderForAll.filter((g) =>
              filteringByGenres(g, action.inputForFilterByGenre)
            ),
            onlyFilterByCreationForAll: [],
            onlyFilterByCreationForNames: [],
          };
        }
      }
    }
    case SET_FLAG_SOME_FILTER_APPLIED: {
      return {
        ...localState,
        someFilterApplied: true,
      };
    }
    default:
      return localState;
  }
};
