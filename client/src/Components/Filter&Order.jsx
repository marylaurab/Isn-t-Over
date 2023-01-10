import { order } from "../Redux/actions/orders";
import {
  setInputFilterByGenre,
  setInputOrder,
  setInputFilterByCreation,
  setFlagSomeFilterApplied,
} from "../Redux/actions/sets";
import { filterByGenres, filterByCreation } from "../Redux/actions/filters";
import { useDispatch, useSelector } from "react-redux";
import style from "../cssComponents/filterAndOrder.module.css";

export default function FilterAndOrder() {
  const dispatch = useDispatch();
  const inputForOrder = useSelector((state) => state.settings.inputForOrder);
  const inputForFilterByGenre = useSelector(
    (state) => state.settings.inputForFilterByGenre
  );
  const inputForFilterByCreation = useSelector(
    (state) => state.settings.inputForFilterByCreation
  );
  const genres = useSelector((state) => state.mainData.genres);
  const gamesByName = useSelector((state) => state.mainData.gamesByName);
  const toOrder = (e) => {
    dispatch(setInputOrder(e.target.value));
    dispatch(order(e.target.value));
  };
  const toFilterByGenre = (e) => {
    dispatch(filterByGenres(e.target.value));
    dispatch(setInputFilterByGenre(e.target.value));
    dispatch(setFlagSomeFilterApplied());
  };

  const toFilterByCreation = (e) => {
    dispatch(filterByCreation(e.target.value));
    dispatch(setInputFilterByCreation(e.target.value));
    dispatch(setFlagSomeFilterApplied());
  };

  return (
    <div className={style.container}>
      <div className={style.orderContainer}>
        <div className={style.orderTitle}>ORDER BY:</div>
        <div className={style.orderDivSelect}>
          <select onChange={(e) => toOrder(e)} className={style.orderSelect}>
            <option hidden value="hidden">
              {inputForOrder}
            </option>
            <option value="NO ORDER">{"NO ORDER"}</option>
            <option value="A>Z">{"A>Z"}</option>
            <option value="Z>A">{"Z>A"} </option>
            <option value="GREATEST RATING">{"GREATEST RATING"}</option>
            <option value="LEAST RATING">{"LEAST RATING"}</option>
          </select>
        </div>
      </div>

      <div className={style.genreContainer}>
        <div className={style.genreTitle}>FILTER BY GENRE:</div>
        <div className={style.genreDivSelect}>
          <select
            onChange={(e) => toFilterByGenre(e)}
            className={style.genreSelect}
          >
            <option hidden value="hidden">
              {inputForFilterByGenre}
            </option>
            <option value={"NO FILTER"}>{"NO FILTER"}</option>
            {genres.map((genre, i) => (
              <option key={i} value={genre.name ? genre.name : genre}>
                {genre.name ? genre.name : genre}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className={style.creationContainer}>
        <div className={style.creationTitle}>FILTER BY TYPE CREATION:</div>
        <div className={style.creationDivSelect}>
          <select
            onChange={(e) => toFilterByCreation(e)}
            disabled={gamesByName && gamesByName.length > 0 ? true : false}
            className={style.creationSelect}
          >
            <option hidden value="hidden">
              {inputForFilterByCreation}
            </option>
            <option value={"NO FILTER"}>{"NO FILTER"}</option>
            <option value={"CREATED"}>{"CREATED"}</option>
          </select>
        </div>
      </div>
    </div>
  );
}
