import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllByName } from "../Redux/actions/data";
import { setInputSearchBar } from "../Redux/actions/sets";
import {
  resetInputOrder,
  resetInputFilterByGenre,
  cleanGamesToRender,
  resetSomeAppliedFilterFlag,
  resetPaginate
} from "../Redux/actions/resets";

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
    if (input) {
      dispatch(resetSomeAppliedFilterFlag());
      dispatch(resetInputOrder());
      dispatch(resetInputFilterByGenre());
      dispatch(cleanGamesToRender());
      dispatch(resetPaginate());
      dispatch(getAllByName(input));
      return;
    } else {
      alert("Please enter a name game");
    }
  };
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