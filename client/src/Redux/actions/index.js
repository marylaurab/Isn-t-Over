const fetch = require("node-fetch");
export const GET_ALL_VIDEOGAMES = "GET_ALL_VIDEOGAMES";
export const SET_PAGES = "SET_PAGES";
export const SET_AUX_PAGINATE = "SET_AUX_PAGINATE";
export const SET_SUBPAGES = "SET_SUBPAGES";
export const PREV_PAGE = "PREV_PAGE";
export const NEXT_PAGE = "NEXT_PAGE";
export const ON_SPECIFIC_PAGE = "ON_SPECIFIC_PAGE";
export const PREV_SUBPAGE = "PREV_SUBPAGE";
export const NEXT_SUBPAGE = "NEXT_SUBPAGE";
export const SET_NEXTPIVOT = "SET_NEXTPIVOT";
export const SET_PREVPIVOT = "SET_PREVPIVOT";
export const ALL_BY_NAME = "ALL_BY_NAME";
export const INPUT_SEARCHBAR = "INPUT_SEARCHBAR";
export const RESET_GAMESTORENDER = "RESET_GAMESTORENDER";
export const FETCHING = "FETCHING";
export const FILTER_BY_GENRES = "FILTER_BY_GENRES";
export const ORDER_BY = "ORDER_BY";
export const RESET_INPUT_VALUE = "RESET_INPUT_VALUE";
export const RESET_GAMES_BY_NAME = "RESET_GAMES_BY_NAME";
export const RESET_HOME = "RESET_HOME";
export const GET_ALL_GENRES = "GET_ALL_GENRES";
export const RESET_INPUT_FILTER="RESET_INPUT_FILTER"
export const SET_BY_NAME="SET_BY_NAME"

export const getAllVideogames = () => {
  return async function (dispatch) {
    return fetch("http://localhost:3001/videogames")
      .then((response) => response.json())
      .then((json) => dispatch({ type: GET_ALL_VIDEOGAMES, payload: json }));
  };
};
export const allByName = (nameGame) => {
  return async function (dispatch) {
    return fetch(`http://localhost:3001/videogames?nameGame=${nameGame}`)
      .then((response) => response.json())
      .then((json) => dispatch({ type: ALL_BY_NAME, payload: json }));
  };
};
export const getAllGenres = () => {
  return async function (dispatch) {
    return fetch("http://localhost:3001/genres")
      .then((response) => response.json())
      .then((json) => dispatch({ type: GET_ALL_GENRES, payload: json }));
  };
};
export const setAuxPaginate = () => {
  return {
    type: SET_AUX_PAGINATE,
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
export const settingInput = (inputValue) => {
  return {
    type: INPUT_SEARCHBAR,
    payload: inputValue,
  };
};
export const resetGamesToRenderForNames = () => {
  return {
    type: RESET_GAMESTORENDER,
  };
};
export const setFetching = () => {
  return {
    type: FETCHING,
  };
};
export const filterByGenres = () => {
  return {
    type: FILTER_BY_GENRES,
  };
};
export const order = (order) => {
  return {
    type: ORDER_BY,
    payload: order,
  };
};
export const resetInputOrder = () => {
  return {
    type: RESET_INPUT_VALUE,
  };
};
export const resetGamesByName = () => {
  return {
    type: RESET_GAMES_BY_NAME,
  };
};
export const resetHome = () => {
  return {
    type: RESET_HOME,
  };
};

export const filterByGenre = (genre) => {
  return {
    type: FILTER_BY_GENRES,
    payload: genre,
  };
};
export const resetInputFilter=()=>{
  return {
    type:RESET_INPUT_FILTER
  }
}
export const setByName=()=>{
  return{
    type:SET_BY_NAME
  }
}