import { Link } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import CardGame from "./CardGame";
import Pagination from "./Pagination";
import SearchBar from "./SearchBar";
import FilterAndOrder from "./Filter&Order";
import {
  getAllVideogames,
  getAllGenres,
  getDetailGame,
  getPlatforms,
} from "../Redux/actions/data";
import { setAuxPaginate, setPages, setSubPages } from "../Redux/actions/pages";
import {
  resetFetching,
  resetGamesToRender,
  cleanGamesToRender,
  resetInputOrder,
  resetInputFilterByGenre,
  resetGamesByName,
  resetInputSearch,
  resetInputFilterByCreation,
  resetSomeAppliedFilterFlag,
} from "../Redux/actions/resets";
import { setByName } from "../Redux/actions/sets";

export default function Home() {
  const dispatch = useDispatch();
  const gamesByName = useSelector((state) => state.mainData.gamesByName);
  const gamesToRender = useSelector((state) => state.mainData.gamesToRender);
  const perPage = useSelector((state) => state.paginate.perPage);
  const currentPage = useSelector((state) => state.paginate.currentPage);
  const totalPagesToRender = useSelector(
    (state) => state.paginate.totalPagesToRender
  );
  const perSubPages = useSelector((state) => state.paginate.perSubPages);
  const successFetch = useSelector((state) => state.mainData.successFetch);
  const someFilterApplied = useSelector(
    (state) => state.mainData.someFilterApplied
  );
  const lastIndex = currentPage * perPage;
  const firstIndex = lastIndex - perPage;

  useEffect(() => {
    if (gamesToRender.length === 0) {
      dispatch(getAllVideogames());
      dispatch(getAllGenres());
      dispatch(getPlatforms());
    }
  }, []);

  useEffect(() => {
    dispatch(setAuxPaginate());
    dispatch(setPages());
    dispatch(setSubPages());
  }, [gamesToRender, perPage, perSubPages]);

  const getDetail = (id) => {
    dispatch(getDetailGame(id));
  };

  const resetHome = () => {
    dispatch(resetGamesToRender());
    dispatch(resetInputOrder());
    dispatch(resetInputFilterByGenre());
    dispatch(resetInputFilterByCreation());
    dispatch(resetInputSearch());
    dispatch(resetFetching());
    dispatch(resetSomeAppliedFilterFlag());
  };

  const agree = () => {
    resetHome();
  };
  const agreeGenreNotFound = () => {
    if (gamesByName.length === 0) {
      agree();
      return;
    }

    dispatch(resetInputFilterByGenre());
    dispatch(resetInputFilterByCreation());
    dispatch(resetSomeAppliedFilterFlag());
    dispatch(resetInputOrder());
    dispatch(setByName());
  };

  const backButton = () => {
    dispatch(cleanGamesToRender());
    dispatch(resetGamesByName());
    resetHome();
  };

  return successFetch ? (
    gamesToRender && gamesToRender.length > 0 ? (
      <div>
        <Link to="/">
          <button onClick={backButton}>back</button>
        </Link>
        <Link to="/creategame">
          <button>Create game</button>
        </Link>
        <SearchBar />
        <FilterAndOrder />
        {gamesToRender.slice(firstIndex, lastIndex).map((g, i) => (
          <div key={g.id} onClick={() => getDetail(g.id)}>
            <Link to={`/videogames/${g.id}`}>
              <CardGame
                id={g.id}
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
    ) : gamesToRender.length === 0 && !someFilterApplied ? (
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
      <button onClick={agree}>I agree!</button>
    </div>
  );
}
