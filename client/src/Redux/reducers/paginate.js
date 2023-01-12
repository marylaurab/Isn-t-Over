import {
  PREV_PAGE,
  NEXT_PAGE,
  ON_SPECIFIC_PAGE,
  SET_AUX_PAGINATE,
  SET_PAGES,
  SET_SUBPAGES,
  PREV_SUBPAGE,
  NEXT_SUBPAGE,
  SET_PREVPIVOT,
  SET_NEXTPIVOT,
  RESET_PAGINATE,
} from "../actions/-index";

let initialState = {
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
export const paginate = (localState = initialState, action) => {
  switch (action.type) {
    case SET_AUX_PAGINATE: {
      return {
        ...localState,
        totalGames: action.payload.length,
        totalPagesToRender: Math.ceil(
          action.payload.length / localState.perPage
        ),
        conditional: Math.ceil(
          Math.ceil(action.payload.length / localState.perPage) /
            localState.perSubPages //cambiar nombre de condicional al totalSubPagesToRender
        ),
      };
    }
    case SET_PAGES: {
      let auxPages = [];
      for (let i = 1; i <= localState.totalPagesToRender; i++) {
        auxPages.push(i);
      }
      return {
        ...localState,
        pages: auxPages,
      };
    }
    case SET_SUBPAGES: {
      if (localState.pages.length === 1) {
        return {
          ...localState,
          renderSubPages: [localState.pages[localState.indexes.j]],
        };
      } else {
        return {
          ...localState,
          renderSubPages: [
            localState.pages[localState.indexes.j],
            localState.pages[localState.indexes.k],
            localState.pages[localState.indexes.l],
          ].filter((e) => e !== undefined),
        };
      }
    }
    case PREV_PAGE: {
      return {
        ...localState,
        currentPage: localState.currentPage - 1,
      };
    }
    case NEXT_PAGE: {
      return {
        ...localState,
        currentPage: localState.currentPage + 1,
      };
    }
    case ON_SPECIFIC_PAGE: {
      return {
        ...localState,
        currentPage: action.payload,
      };
    }
    case PREV_SUBPAGE: {
      return {
        ...localState,
        indexes: {
          j: localState.indexes.j - localState.perSubPages,
          k: localState.indexes.k - localState.perSubPages,
          l: localState.indexes.l - localState.perSubPages,
        },
        currentSubPage: localState.currentSubPage - action.payload,
      };
    }
    case NEXT_SUBPAGE: {
      return {
        ...localState,
        indexes: {
          j: localState.indexes.j + localState.perSubPages,
          k: localState.indexes.k + localState.perSubPages,
          l: localState.indexes.l + localState.perSubPages,
        },
        currentSubPage: localState.currentSubPage + action.payload,
      };
    }
    case SET_NEXTPIVOT: {
      return {
        ...localState,
        currentPage: localState.pages[localState.indexes.j],
      };
    }
    case SET_PREVPIVOT: {
      return {
        ...localState,
        currentPage: localState.pages[localState.indexes.l],
      };
    }
    case RESET_PAGINATE: {
      return {
        ...localState,
        currentPage: 1,
        currentSubPage: 1,
        indexes: { j: 0, k: 1, l: 2 }
      };
    }
    default:
      return localState;
  }
};
