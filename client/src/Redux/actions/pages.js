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
} from "./-index";
import {store} from '../store/index'
export const setAuxPaginate = () => {
  let state=store.getState()
  let gamesToRender=state.mainData.gamesToRender;
  return {
    type: SET_AUX_PAGINATE,
    payload:gamesToRender
  };
};
export const setPages = () => {
  return {
    type: SET_PAGES,
  };
};
export const setSubPages = () => {
  return {
    type: SET_SUBPAGES,
  };
};
export const prevPage = () => {
  return {
    type: PREV_PAGE,
  };
};
export const nxtPage = () => {
  return {
    type: NEXT_PAGE,
  };
};
export const specificPage = (page) => {
  return {
    type: ON_SPECIFIC_PAGE,
    payload: page,
  };
};
export const prevSubPages = () => {
  return {
    type: PREV_SUBPAGE,
    payload: 1,
  };
};

export const nxtSubPages = () => {
  return {
    type: NEXT_SUBPAGE,
    payload: 1,
  };
};

export const setNextPivot = () => {
  return {
    type: SET_NEXTPIVOT,
  };
};
export const setPrevPivot = () => {
  return {
    type: SET_PREVPIVOT,
  };
};
