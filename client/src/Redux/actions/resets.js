import {
  RESET_GAMES_TO_RENDER,
  RESET_INPUT_ORDER,
  RESET_INPUT_FILTER_BY_GENRE,
  RESET_INPUT_FILTER_BY_CREATION,
  RESET_INPUT_SEARCHBAR,
  RESET_GAMES_BY_NAME,
  RESET_FETCHING,
  CLEAN_GAMES_TO_RENDER,
} from "./-index";

export const resetGamesToRender = () => {
  //OJO CON CAMBIAR NOMBRE
  return {
    type: RESET_GAMES_TO_RENDER,
  };
};
export const cleanGamesToRender = () => {
  return {
    //no existia antes.. para el boton back
    type: CLEAN_GAMES_TO_RENDER,
  };
};
export const resetInputSearch = () => {
  return {
    type: RESET_INPUT_SEARCHBAR,
  };
};
export const resetInputOrder = () => {
  return {
    type: RESET_INPUT_ORDER,
  };
};
export const resetInputFilterByGenre = () => {
  return {
    type: RESET_INPUT_FILTER_BY_GENRE,
  };
};
export const resetInputFilterByCreation = () => {
  return {
    type: RESET_INPUT_FILTER_BY_CREATION,
  };
};
export const resetGamesByName = () => {
  return {
    type: RESET_GAMES_BY_NAME,
  };
};
export const resetFetching = () => {
  //cambie nombre
  return {
    type: RESET_FETCHING,
  };
};

//PARA USARLA EN COMPONENTE HOME
// export const resetHome = () => {
//   dispatch(resetGamesToRender());
//   dispatch(cleanGamesToRender());
//   dispatch(resetInputOrder());
//   dispatch(resetInputFilter());
//   dispatch(resetGamesByName());
//   dispatch(resetFetching());
// };
