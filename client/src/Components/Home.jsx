import { Link } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import CardGame from "./CardGame";
import Pagination from "./Pagination";
import SearchBar from "./SearchBar";
import FilterAndOrder from "./Filter&Order";
import FilterNotFound from "./alertsComponents/FilterNotFound";
import NameNotFound from "./alertsComponents/NameNotFound";
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
  resetAxiosFlag,
} from "../Redux/actions/resets";
import { setByName } from "../Redux/actions/sets";
import style from "../cssComponents/home.module.css";


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
      // dispatch(getPlatforms());
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
    dispatch(resetAxiosFlag());
  };

  const agreeFilterNotFound = () => {
    if (gamesByName.length === 0) {
      resetHome();
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
      <div className={style.container}>
        <div className={style.navBar}>
          <Link to="/">
            <button onClick={backButton} className={style.buttons}>
              back
            </button>
          </Link>
          <SearchBar />
          <Link to="/creategame">
            <button className={style.buttons}>post game</button>
          </Link>
        </div>
        <div className={style.filterAndCards}>
          <div >
          <FilterAndOrder />
          </div>
          <div className={style.cardsContainer}>
            {gamesToRender.slice(firstIndex, lastIndex).map((g) => (
              <div key={g.id} onClick={() => getDetail(g.id)} className={style.cardContainer}>
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
          </div>
        </div>
        <Pagination
          currentPage={currentPage}
          totalPagesToRender={totalPagesToRender}
        />
      </div>
    ) : gamesToRender.length === 0 && !someFilterApplied ? (
      <div className={style.divImg}>
        <img
          src="https://64.media.tumblr.com/65205bb83beb085f92044a30ef585d50/tumblr_nwle4wbqcE1ujcnnno1_500.gifv"
          className={style.img}
        />
      </div>
    ) : (
      <FilterNotFound agreeFilterNotFound={agreeFilterNotFound} />
    )
  ) : (
    <NameNotFound resetHome={resetHome} />
  ); //Al any game with that name se le pasaba onClick={agree}
}
