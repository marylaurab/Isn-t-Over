export const fetch = require("node-fetch");

export const GET_ALL_VIDEOGAMES = "GET_ALL_VIDEOGAMES";
export const GET_ALL_BY_NAME = "GET_ALL_BY_NAME";
export const GET_ALL_GENRES = "GET_ALL_GENRES";


export const PREV_PAGE = "PREV_PAGE";
export const NEXT_PAGE = "NEXT_PAGE";
export const ON_SPECIFIC_PAGE = "ON_SPECIFIC_PAGE";
export const SET_AUX_PAGINATE = "SET_AUX_PAGINATE";
export const SET_PAGES = "SET_PAGES";
export const SET_SUBPAGES = "SET_SUBPAGES";
export const PREV_SUBPAGE = "PREV_SUBPAGE";
export const NEXT_SUBPAGE = "NEXT_SUBPAGE";
export const SET_PREVPIVOT = "SET_PREVPIVOT";
export const SET_NEXTPIVOT = "SET_NEXTPIVOT";

export const RESET_GAMES_TO_RENDER = "RESET_GAMES_TO_RENDER";
export const RESET_INPUT_ORDER = "RESET_INPUT_ORDER ";
export const RESET_INPUT_FILTER_BY_GENRE="RESET_INPUT_FILTER_BY_GENRE";
export const RESET_INPUT_FILTER_BY_CREATION="RESET_INPUT_FILTER_BY_CREATION";
export const RESET_GAMES_BY_NAME = "RESET_GAMES_BY_NAME";
export const RESET_FETCHING = "RESET_FETCHING";
export const RESET_INPUT_SEARCHBAR="RESET_INPUT_SEARCHBAR"
export const CLEAN_GAMES_TO_RENDER="CLEAN_GAMES_TO_RENDER"
// export const SAVED_BY_NAME="SAVED_BY_NAME";

export const SET_INPUT_SEARCHBAR = "SET_INPUT_SEARCHBAR";
export const SET_INPUT_FILTER_BY_GENRE="SET_INPUT_FILTER_BY_GENRE";
export const SET_INPUT_FILTER_BY_CREATION="SET_INPUT_FILTER_BY_CREATION"
export const SET_INPUT_ORDER="SET_INPUT_ORDER";
export const SET_BY_NAME="SET_BY_NAME"

export const FILTER_BY_GENRES = "FILTER_BY_GENRES";
export const FILTER_BY_CREATION="FILTER_BY_CREATION"

export const ORDER_BY = "ORDER_BY";

// const fetch = require("node-fetch");  X
// export const GET_ALL_VIDEOGAMES = "GET_ALL_VIDEOGAMES";          X
// export const SET_PAGES = "SET_PAGES";     X
// export const SET_AUX_PAGINATE = "SET_AUX_PAGINATE";      X
// export const SET_SUBPAGES = "SET_SUBPAGES";     X
// export const PREV_PAGE = "PREV_PAGE";                         X
// export const NEXT_PAGE = "NEXT_PAGE";         X
// export const ON_SPECIFIC_PAGE = "ON_SPECIFIC_PAGE";    X
// export const PREV_SUBPAGE = "PREV_SUBPAGE";     X
// export const NEXT_SUBPAGE = "NEXT_SUBPAGE";   X
// export const SET_NEXTPIVOT = "SET_NEXTPIVOT";  X
// export const SET_PREVPIVOT = "SET_PREVPIVOT";  X
// export const ALL_BY_NAME = "ALL_BY_NAME";       X
// export const INPUT_SEARCHBAR = "INPUT_SEARCHBAR"; X
// export const RESET_GAMESTORENDER = "RESET_GAMESTORENDER";     X
// export const FETCHING = "FETCHING";                         X
// export const FILTER_BY_GENRES = "FILTER_BY_GENRES"; X
// export const ORDER_BY = "ORDER_BY";   X
// export const RESET_INPUT_VALUE = "RESET_INPUT_VALUE";    X
// export const RESET_GAMES_BY_NAME = "RESET_GAMES_BY_NAME";   X
// export const RESET_HOME = "RESET_HOME";                      X
// export const GET_ALL_GENRES = "GET_ALL_GENRES";                    X
// export const RESET_INPUT_FILTER="RESET_INPUT_FILTER";         X
// export const SET_BY_NAME="SET_BY_NAME"                     X

// export const getAllVideogames = () => {
//   return async function (dispatch) {
//     return fetch("http://localhost:3001/videogames")
//       .then((response) => response.json())
//       .then((json) => dispatch({ type: GET_ALL_VIDEOGAMES, payload: json }));
//   };
// }; 
// export const allByName = (nameGame) => {
//   return async function (dispatch) {
//     return fetch(`http://localhost:3001/videogames?nameGame=${nameGame}`)
//       .then((response) => response.json())
//       .then((json) => dispatch({ type: ALL_BY_NAME, payload: json }));
//   };
// };
// export const getAllGenres = () => {
//   return async function (dispatch) {
//     return fetch("http://localhost:3001/genres")
//       .then((response) => response.json())
//       .then((json) => dispatch({ type: GET_ALL_GENRES, payload: json }));
//   };
// };
// export const setAuxPaginate = () => {
//   return {
//     type: SET_AUX_PAGINATE,
//   };
// };
// export const setPages = () => {
//   return {
//     type: SET_PAGES,
//   };
// };
// export const setSubPages = () => {
//   return {
//     type: SET_SUBPAGES,
//   };
// };
// export const setNextPivot = () => {
//   return {
//     type: SET_NEXTPIVOT,
//   };
// };
// export const setPrevPivot = () => {
//   return {
//     type: SET_PREVPIVOT,
//   };
// };
// export const prevPage = () => {
//   return {
//     type: PREV_PAGE,
//   };
// };
// export const nxtPage = () => {
//   return {
//     type: NEXT_PAGE,
//   };
// };
// export const specificPage = (page) => {
//   return {
//     type: ON_SPECIFIC_PAGE,
//     payload: page,
//   };
// };

// export const prevSubPages = () => {
//   return {
//     type: PREV_SUBPAGE,
//     payload: 1,
//   };
// };

// export const nxtSubPages = () => {
//   return {
//     type: NEXT_SUBPAGE,
//     payload: 1,
//   };
// };
// export const settingInput = (inputValue) => {
//   return {
//     type: INPUT_SEARCHBAR,
//     payload: inputValue,
//   };
// };
// export const resetGamesToRenderForNames = () => {
//   return {
//     type: RESET_GAMESTORENDER,
//   };
// };
// export const setFetching = () => {
//   return {
//     type: FETCHING,
//   };
// };

// export const filterByGenres = () => {
//   return {
//     type: FILTER_BY_GENRES,
//   };
// };
// export const order = (order) => {
//   return {
//     type: ORDER_BY,
//     payload: order,
//   };
// };

// export const resetInputOrder = () => {
//   return {
//     type: RESET_INPUT_VALUE,
//   };
// };
// export const resetGamesByName = () => {
//   return {
//     type: RESET_GAMES_BY_NAME,
//   };
// };
// export const resetHome = () => {
//   return {
//     type: RESET_HOME,
//   };
// };





// export const filterByGenre = (genre) => {
//   return {
//     type: FILTER_BY_GENRES,
//     payload: genre,
//   };
// };


// export const resetInputFilter=()=>{
//   return {
//     type:RESET_INPUT_FILTER
//   }
// };
// export const setByName=()=>{
//   return{
//     type:SET_BY_NAME
//   }
// }