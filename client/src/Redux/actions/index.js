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
export const SET_NEXTPIVOT="SET_NEXTPIVOT";
export const SET_PREVPIVOT="SET_PREVPIVOT"
// export const GET_BY_NAME = "GET_BY_NAME";
// export const SET_CURRENT_PAGE="SET_CURRENT_PAGE"

export const getAllVideogames = () => {
  return async function (dispatch) {
    return fetch("http://localhost:3001/videogames")
      .then((response) => response.json())
      .then((json) => dispatch({ type: GET_ALL_VIDEOGAMES, payload: json }));
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
export const setNextPivot=()=>{
  return {
    type: SET_NEXTPIVOT
  }
}
export const setPrevPivot=()=>{
  return{
    type:SET_PREVPIVOT
  }
}
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

export const prevSubPages=()=>{
  return {
    type: PREV_SUBPAGE,
    payload: 1
  }
};

export const nxtSubPages=()=>{
  return {
    type: NEXT_SUBPAGE,
    payload: 1
  }
}
// export const getByName = (nameGame) => {
//   return async function (dispatch) {
//     return fetch(`http://localhost:3001/videogames/${nameGame}`).then(
//       (response) => response.json()
//     ).then((json)=>dispatch({type: G}));
//   };
// };
