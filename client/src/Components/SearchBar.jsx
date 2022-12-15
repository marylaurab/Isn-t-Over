import { useState } from "react";

export default function SearchBar(){
const [nameGame,setNameGame] =useState("")

const changeInput=(e)=>{
    setNameGame(e)
}
return (
    <div>
        <input type='text' placeholder='search game'></input>
        <button>search</button>
    </div>
)
}