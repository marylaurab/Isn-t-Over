import axios from "axios";
import {
  fetch,
  GET_ALL_VIDEOGAMES,
  GET_ALL_BY_NAME,
  GET_ALL_GENRES,
  GET_DETAILS,
  GET_PLATFORMS,
  POST_GAME,
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

export const getDetailGame = (id) => {
  return async function (dispatch) {
    return fetch(`http://localhost:3001/videogames/${id}`).then((response) =>
      response
        .json()
        .then((json) => dispatch({ type: GET_DETAILS, payload: json }))
    );
  };
};

export const getPlatforms = () => {
  return async function (dispatch) {
    return fetch("http://localhost:3001/platforms")
      .then((response) => response.json())
      .then((json) => dispatch({ type: GET_PLATFORMS, payload: json }));
  };
};

export const postNewGame = (game) => {
  return async function (dispatch) {
    const createdGame = await axios.post(
      "http://localhost:3001/videogames",
      game
    );
    return dispatch({type: POST_GAME, payload: createdGame})
  };
};
