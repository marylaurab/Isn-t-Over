import { useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { allByName, searchByInput } from "../Redux/actions/index";

export default function SearchBar() {
  const dispatch = useDispatch();
  const inputToSearch = useSelector((state) => state.inputToSearch);
  const [input, setInput] = useState("");

  const handlerChange = (e) => {
    setInput(e.target.value);
    dispatch(searchByInput(e.target.value));
  };
  const handlerSubmit = (e) => {
    e.preventDefault();
    dispatch(allByName(input));
  };
  return (
    <div>
      <input
        type="text"
        placeholder="search game"
        value={inputToSearch}
        onChange={(e) => handlerChange(e)}
      ></input>
      <button onClick={(e) => handlerSubmit(e)}>search</button>
    </div>
  );
}
