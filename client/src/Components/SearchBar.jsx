import { useState} from "react";
import { useDispatch, useSelector } from "react-redux";
// import {
//   allByName,
//   settingInput,
//   resetGamesToRenderForNames,
//   resetInputOrder,
//   resetInputFilter
// } from "../Redux/actions/index";
import{getAllByName} from "../Redux/actions/data"
import{setInputSearchBar} from "../Redux/actions/sets"
import{resetInputOrder,resetInputFilterByGenre} from "../Redux/actions/resets"

export default function SearchBar() {
  const dispatch = useDispatch();
  const inputForSearch = useSelector((state) => state.settings.inputForSearch);
  const [input, setInput] = useState("");

  const handlerChange = (e) => {
    setInput(e.target.value);
    dispatch(setInputSearchBar(e.target.value));
  };
  const handlerSubmit = (e) => {
    e.preventDefault();
  
    dispatch(getAllByName(input?input:inputForSearch));
    // dispatch(resetGamesByName()); //la busqueda hace estsso solo
    // dispatch(getAllByName(input?input:inputToSearch)); //chequear a ver si luego
    //de ":" pongo un alert
    dispatch(resetInputOrder())
    dispatch(resetInputFilterByGenre())
   
  }; //en el boton de search, con estilos, le dare la deshabilitacion pmientras que esta buscando el juego por names
  return (
    <div>
    <form onSubmit={handlerSubmit}> 
      <input
        type="text"
        placeholder="search game"
        value={inputForSearch}
        onChange={(e) => handlerChange(e)}
      ></input>
      <input type="submit" value="search"></input>
    </form>
    </div>
  ); 
}

// export default function SearchBar() {
//   const dispatch = useDispatch();
//   const inputToSearch = useSelector((state) => state.inputToSearch);
//   const [input, setInput] = useState("");

//   const handlerChange = (e) => {
//     setInput(e.target.value);
//     dispatch(settingInput(e.target.value));
//   };
//   const handlerSubmit = (e) => {
//     e.preventDefault();
//     dispatch(resetGamesToRenderForNames());
//     dispatch(allByName(input?input:inputToSearch));
//     dispatch(resetInputOrder())
//     dispatch(resetInputFilter())
//   };
//   return (
//     <div>
//     <form onSubmit={handlerSubmit}>
//       <input
//         type="text"
//         placeholder="search game"
//         value={inputToSearch}
//         onChange={(e) => handlerChange(e)}
//       ></input>
//       <input type="submit" value="search"></input>
//     </form>
//     </div>
//   ); 
//}
