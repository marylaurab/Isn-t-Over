import {
  SET_INPUT_SEARCHBAR,
  SET_INPUT_FILTER_BY_GENRE,
  SET_INPUT_FILTER_BY_CREATION,
  SET_INPUT_ORDER,
  SET_BY_NAME,
  SET_FLAG_SOME_FILTER_APPLIED
} from "./-index";

export const setInputSearchBar = (inputValue) => {
  return {
    type: SET_INPUT_SEARCHBAR,
    payload: inputValue,
  };
};

export const setInputFilterByGenre = (inputValue) => {
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
 export const setFlagSomeFilterApplied=()=>{
  return {
    type:SET_FLAG_SOME_FILTER_APPLIED
  }
 }