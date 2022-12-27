import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CardGame from "./CardGame";
import Pagination from "./Pagination";
import SearchBar from "./SearchBar";
import FilterAndOrder from "./Filter&Order";
import { getAllVideogames, getAllGenres } from "../Redux/actions/data";
import { setAuxPaginate, setPages, setSubPages } from "../Redux/actions/pages";
import {
  resetFetching,
  resetGamesToRender,
  cleanGamesToRender,
  resetInputOrder,
  resetInputFilterByGenre,
  resetGamesByName,
  resetInputSearch
} from "../Redux/actions/resets";
import{setByName} from "../Redux/actions/sets"
// import {
//   setAuxPaginate,
//   setPages,
//   setSubPages,
//   setFetching,
//   settingInput,
//   getAllVideogames,
//   resetGamesToRenderForNames,
//   resetInputOrder,
//   resetGamesByName,
//   resetHome,
//   getAllGenres,
//   setByName,
// } from "../Redux/actions/index";

export default function Home() {
  const dispatch = useDispatch();
  // const gamesToRender = useSelector((state) => state.gamesToRender);
  // const perPage = useSelector((state) => state.perPage);
  // const currentPage = useSelector((state) => state.currentPage);
  // const totalPagesToRender = useSelector((state) => state.totalPagesToRender);
  // const perSubPages = useSelector((state) => state.perSubPages);
  // const successFetch = useSelector((state) => state.successFetch);

  // const filterApplied = useSelector((state) => state.filterApplied);
  // const inputToSearch = useSelector((state) => state.inputToSearch);

  // const lastIndex = currentPage * perPage;
  // const firstIndex = lastIndex - perPage;

  const gamesByName=useSelector((state)=>state.mainData.gamesByName)

  const gamesToRender = useSelector((state) => state.mainData.gamesToRender);
  const perPage = useSelector((state) => state.paginate.perPage);
  const currentPage = useSelector((state) => state.paginate.currentPage);
  const totalPagesToRender = useSelector(
    (state) => state.paginate.totalPagesToRender
  );
  const perSubPages = useSelector((state) => state.paginate.perSubPages);
  const successFetch = useSelector((state) => state.mainData.successFetch);
  const filterByGenreApplied = useSelector((state) => state.settings.filterByGenreApplied);
  const inputForSearch = useSelector((state) => state.settings.inputForSearch);
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

  const resetHome = () => {
  
    dispatch(resetGamesToRender());
    dispatch(resetInputOrder());
    dispatch(resetInputFilterByGenre());
    dispatch(resetInputSearch())
    dispatch(resetGamesByName());
    dispatch(resetFetching());
  };

  const agree = () => {
    // dispatch(getAllVideogames()); //ver si aca lo modifico con unSetGamesTorender

    // dispatch(setFetching());
    //dispatch(resetFetching());
    dispatch(resetGamesToRender());
    resetHome()
  };
  const agreeGenreNotFound = () => {
    if (inputForSearch === "") {
      agree();
      return;
    }
    dispatch(resetInputFilterByGenre());
    dispatch(setByName());
    // dispatch(setByName());
  };

  const backButton = () => {
    // dispatch(resetGamesToRenderForNames());
    dispatch(cleanGamesToRender());
    resetHome();
  }; //Lo comente para aun no usarlo

  // const resetingHome = () => {
  //   dispatch(resetHome());
  // };




  //LA COPIA DESDE REDUCERS SEPARADOS:
  return successFetch ? (
    gamesToRender && gamesToRender.length > 0 ? (
      <div>
        <Link to="/">
          <button onClick={backButton}>back</button>
        </Link>
        <button onClick={resetHome}>reset home</button>
        <SearchBar />
        <FilterAndOrder />
        {gamesToRender.slice(firstIndex, lastIndex).map((g, i) => (
          <div key={i}>
            <Link to={`/videogames/${g.id}`}>
              <CardGame
                key={i}
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
     ): gamesToRender.length === 0 && filterByGenreApplied ? (
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


  //EL ORIGINAL PUSHEADO:
  // return gamesToRender && gamesToRender.length > 0 ? (
  //   <div>
  //     {/* <Link to="/landing" le quite esto al landing>
  //         <button onClick={backButton}>back</button>
  //       </Link>
  //       <button onClick={resetingHome}>reset home</button>
  //       <SearchBar />
  //       <FilterAndOrder /> */}
  //     {gamesToRender.slice(firstIndex, lastIndex).map((g, i) => (
  //       <div key={g.i}>
  //         <Link to={`/videogames/${g.id}`}>
  //           <CardGame
  //             key={i}
  //             image={g.image}
  //             title={g.title}
  //             rating={g.rating}
  //             genres={g.genres}
  //           />
  //         </Link>
  //       </div>
  //     ))}
  //     <Pagination
  //       currentPage={currentPage}
  //       totalPagesToRender={totalPagesToRender}
  //     />
  //   </div>
  // ) : (
  //   <img src="https://www.globalreporting.org/styles/assets/images/circle-loading-gif.gif" />
  // );
}
