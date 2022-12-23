import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { getAllVideogames } from "../Redux/actions/index.js";
import { useDispatch, useSelector } from "react-redux";
import CardGame from "./CardGame";
import Pagination from "./Pagination";
import SearchBar from "./SearchBar";
import { setAuxPaginate, setPages, setSubPages,setFetching } from "../Redux/actions/index";

export default function Home() {
  const dispatch = useDispatch();
  const gamesToRender = useSelector((state) => state.gamesToRender);
  const perPage = useSelector((state) => state.perPage);
  const currentPage = useSelector((state) => state.currentPage);
  const totalPagesToRender = useSelector((state) => state.totalPagesToRender);
  const perSubPages = useSelector((state) => state.perSubPages);
  const successFetch = useSelector((state) => state.successFetch);
  const lastIndex = currentPage * perPage;
  const firstIndex = lastIndex - perPage;

  useEffect(() => {
    if (gamesToRender.length === 0) {
      dispatch(getAllVideogames());
    }
  }, []);

  useEffect(() => {
    dispatch(setAuxPaginate());
    dispatch(setPages());
    dispatch(setSubPages());
  }, [gamesToRender, perPage, perSubPages]);

  const agree=()=>{
    dispatch(getAllVideogames())
    dispatch(setFetching())
  }
  return successFetch? gamesToRender && gamesToRender.length > 0 ? (
    <div>
      <SearchBar />
      {gamesToRender.slice(firstIndex, lastIndex).map((g) => (
        <div key={g.id}>
          <Link to={`/videogames/${g.id}`}>
            <CardGame
              image={g.image}
              title={g.title}
              rating={g.rating}
              genres={g.genres}
            />
          </Link>
        </div>
      ))}
      <Pagination
        currentPage={currentPage}
        totalPagesToRender={totalPagesToRender}
      />
    </div>
  ) : (
    <img src="https://www.globalreporting.org/styles/assets/images/circle-loading-gif.gif" />
  ):(
    <div>
      <SearchBar />
      <h3>Can not found any game</h3>
      <h6>Please, check the provided info</h6>
      <button onClick={agree}>I agree!</button>
    </div>
  )
}
