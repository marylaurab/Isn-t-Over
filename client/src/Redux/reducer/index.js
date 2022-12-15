import { GET_ALL_VIDEOGAMES} from "../actions";
let initialState = {
    allVideogames: [],
    gamesToRender:[]
};
export const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_VIDEOGAMES: {
      return {
        ...state,
        allVideogames: action.payload,
        gamesToRender: action.payload
      };
    }
    default:
      return state;
  }
};
