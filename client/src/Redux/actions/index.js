const fetch = require("node-fetch");
export const GET_ALL_VIDEOGAMES = "GET_ALL_VIDEOGAMES";
export const GET_BY_NAME = "GET_BY_NAME";

export const getAllVideogames = () => {
  return async function (dispatch) {
    return fetch("http://localhost:3001/videogames")
      .then((response) => response.json())
      .then((json) => dispatch({ type: GET_ALL_VIDEOGAMES, payload: json }));
  };
};

// export const getByName = (nameGame) => {
//   return async function (dispatch) {
//     return fetch(`http://localhost:3001/videogames/${nameGame}`).then(
//       (response) => response.json()
//     ).then((json)=>dispatch({type: G}));
//   };
// };
