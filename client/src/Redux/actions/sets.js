import {
  SET_INPUT_SEARCHBAR,
  SET_INPUT_FILTER_BY_GENRE,
  SET_INPUT_FILTER_BY_CREATION,
  SET_INPUT_ORDER,
  SET_BY_NAME,
} from "./-index";

export const setInputSearchBar = (inputValue) => {
  //cambie nombre
  return {
    type: SET_INPUT_SEARCHBAR,
    payload: inputValue,
  };
};

export const setInputFilterByGenre = (inputValue) => {
  //cambiarrrrr nombre aca y a lo largo
  return {
    type: SET_INPUT_FILTER_BY_GENRE,
    payload: inputValue,
  };
};
export const setInputFilterByCreation=(inputValue)=>{
  return{
    type:SET_INPUT_FILTER_BY_CREATION,
    payload:inputValue
  }
}

export const setInputOrder = (inputValue) => {
  //cambie nombre
  return {
    type: SET_INPUT_ORDER,
    payload: inputValue,
  };
};

export const setByName = () => {
  return {
    type: SET_BY_NAME,
  };
};
