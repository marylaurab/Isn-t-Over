import { useState} from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  allByName,
  settingInput,
  resetGamesToRenderForNames,
  resetInputOrder,
  resetInputFilter
} from "../Redux/actions/index";


export default function SearchBar() {
  const dispatch = useDispatch();
  const inputToSearch = useSelector((state) => state.inputToSearch);
  const [input, setInput] = useState("");

  const handlerChange = (e) => {
    setInput(e.target.value);
    dispatch(settingInput(e.target.value));
  };
  const handlerSubmit = (e) => {
    e.preventDefault();
    dispatch(resetGamesToRenderForNames());
    dispatch(allByName(input?input:inputToSearch));
    dispatch(resetInputOrder())
    dispatch(resetInputFilter())
  };
  return (
    <div>
    <form onSubmit={handlerSubmit}>
      <input
        type="text"
        placeholder="search game"
        value={inputToSearch}
        onChange={(e) => handlerChange(e)}
      ></input>
      <input type="submit" value="search"></input>
    </form>
    </div>
  ); 
}
