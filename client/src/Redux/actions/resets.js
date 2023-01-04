import {
  RESET_GAMES_TO_RENDER,
  RESET_INPUT_ORDER,
  RESET_INPUT_FILTER_BY_GENRE,
  RESET_INPUT_FILTER_BY_CREATION,
  RESET_INPUT_SEARCHBAR,
  RESET_GAMES_BY_NAME,
  RESET_FETCHING,
  RESET_SOME_APPLIED_FILTER_FLAG,
  RESET_AXIOS_FLAG,
  CLEAN_GAMES_TO_RENDER,
} from "./-index";

export const resetGamesToRender = () => {
  return {
    type: RESET_GAMES_TO_RENDER,
  };
};
export const cleanGamesToRender = () => {
  return {
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

  return {
    type: RESET_FETCHING,
  };
};
 export const resetSomeAppliedFilterFlag=()=>{
  return {
    type:RESET_SOME_APPLIED_FILTER_FLAG
  }
 };
 export const resetAxiosFlag=()=>{
  return{
    type:RESET_AXIOS_FLAG
  }
 }