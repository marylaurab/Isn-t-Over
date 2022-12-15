const fetch = require("node-fetch");
export const GET_ALL_VIDEOGAMES = "GET_ALL_VIDEOGAMES";


export const getAllVideogames = () => {
  return async function (dispatch) {
    return fetch('http://localhost:3001/videogames')
      .then((response) => response.json())
      .then((json) => dispatch({ type: GET_ALL_VIDEOGAMES, payload: json }));
  };
};

