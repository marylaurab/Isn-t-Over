import { useState } from "react";

export default function SearchBar() {
  const [nameGame, setNameGame] = useState("");

  const changeHandler = (e) => {
    setNameGame(e.target.value);
  };
  return (
    <div>
      <input
        type="text"
        placeholder="search game"
        value={nameGame}
        onChange={(e) => changeHandler(e)}
      ></input>
      <button>search</button>
    </div>
  );
}
