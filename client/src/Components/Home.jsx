import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
// import { getAllVideogames } from "../Redux/actions/index.js";
import { useDispatch, useSelector } from "react-redux";
import CardGame from "./CardGame";
import Pagination from "./Pagination";
import SearchBar from "./SearchBar";
import FilterAndOrder from "./Filter&Order";
import {
  setAuxPaginate,
  setPages,
  setSubPages,
  setFetching,
  settingInput,
  getAllVideogames,
  resetGamesToRenderForNames,
  resetInputOrder,
  resetGamesByName,
  resetHome,
  getAllGenres,
  setByName,
} from "../Redux/actions/index";

export default function Home() {
  const dispatch = useDispatch();
  const gamesToRender = useSelector((state) => state.gamesToRender);
  const perPage = useSelector((state) => state.perPage);
  const currentPage = useSelector((state) => state.currentPage);
  const totalPagesToRender = useSelector((state) => state.totalPagesToRender);
  const perSubPages = useSelector((state) => state.perSubPages);
  const successFetch = useSelector((state) => state.successFetch);
  const filterApplied = useSelector((state) => state.filterApplied);
  const inputToSearch = useSelector((state) => state.inputToSearch);
  const lastIndex = currentPage * perPage;
  const firstIndex = lastIndex - perPage;
 
  useEffect(() => {
    if (gamesToRender.length === 0) {
      dispatch(getAllVideogames());
      dispatch(getAllGenres());
    }
  }, []);

  useEffect(() => {
    dispatch(setAuxPaginate());
    dispatch(setPages());
    dispatch(setSubPages());
  }, [gamesToRender, perPage, perSubPages]);

  const agreeNameNotFound = () => {
    dispatch(getAllVideogames());
    dispatch(setFetching());
    dispatch(resetHome());
  };
  const agreeGenreNotFound = () => {
    if (inputToSearch === "") {
      agreeNameNotFound();
      return;
    }
    dispatch(setByName());
  };

  const backButton = () => {
    dispatch(resetGamesToRenderForNames());
    dispatch(settingInput(""));
    dispatch(resetInputOrder());
    dispatch(resetGamesByName());
  };

  const resetingHome = () => {
    dispatch(resetHome());
  };
  return successFetch ? (
    gamesToRender && gamesToRender.length > 0 ? (
      <div>
        <Link to="/landing">
          <button onClick={backButton}>back</button>
        </Link>
        <button onClick={resetingHome}>reset home</button>
        <SearchBar />
        <FilterAndOrder />
        {gamesToRender.slice(firstIndex, lastIndex).map((g, i) => (
          <div key={g.id}>
            <Link to={`/videogames/${g.id}`}>
              <CardGame
                key={i}
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
    ) : gamesToRender.length === 0 && !filterApplied ? (
      <img src="https://www.globalreporting.org/styles/assets/images/circle-loading-gif.gif" />
    ) : (
      <div>
        <SearchBar />
        <h3>Can not found any game </h3>
        <h6>Please, check the provided info</h6>
        <button onClick={agreeGenreNotFound}>I agree!</button>
      </div>
    )
  ) : (
    <div>
      <SearchBar />
      <h3>Can not found any game with that name</h3>
      <h6>Please, check the provided info</h6>
      <button onClick={agreeNameNotFound}>I agree!</button>
    </div>
  );
}
