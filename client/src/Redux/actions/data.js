import {
  fetch,
  GET_ALL_VIDEOGAMES,
  GET_ALL_BY_NAME,
  // SAVED_BY_NAME,
  GET_ALL_GENRES,
} from "./-index";

export const getAllVideogames = () => {
  return async function (dispatch) {
    return fetch("http://localhost:3001/videogames")
      .then((response) => response.json())
      .then((json) => dispatch({ type: GET_ALL_VIDEOGAMES, payload: json }));
  };
};

export const getAllGenres = () => {
  return async function (dispatch) {
    return fetch("http://localhost:3001/genres")
      .then((response) => response.json())
      .then((json) => dispatch({ type: GET_ALL_GENRES, payload: json }));
  };
};

export const getAllByName = (nameGame) => {
  return async function (dispatch) {
    return fetch(`http://localhost:3001/videogames?nameGame=${nameGame}`)
      .then((response) => response.json())
      .then((json) => dispatch({ type: GET_ALL_BY_NAME, payload: json }));
  };
};


// export const savedByName = () => {
//   //cambie nombre
//   return {
//     type: SAVED_BY_NAME,
//   };
// };
