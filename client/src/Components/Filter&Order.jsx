import { order } from "../Redux/actions/orders";
import {
  setInputFilterByGenre,
  setInputOrder,
  setInputFilterByCreation,
} from "../Redux/actions/sets";
import { filterByGenres, filterByCreation } from "../Redux/actions/filters";
import { useDispatch, useSelector } from "react-redux";
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
  const toOrder = (e) => {
    dispatch(setInputOrder(e.target.value));
    dispatch(order(e.target.value));
  };
  const toFilterByGenre = (e) => {
    dispatch(filterByGenres(e.target.value));
    dispatch(setInputFilterByGenre(e.target.value));
  };

  const toFilterByCreation = (e) => {
    dispatch(filterByCreation(e.target.value));
    dispatch(setInputFilterByCreation(e.target.value));
  };

  return (
    <div>
      <div>
        ORDER BY:
        <select onChange={(e) => toOrder(e)}>
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
      <div>
        <div>
          FILTER BY GENRE:
          <select onChange={(e) => toFilterByGenre(e)}>
            <option hidden value="hidden">
              {inputForFilterByGenre}
            </option>
            <option value={"NO FILTER"}>{"NO FILTER"}</option>
            {genres.map((genre, i) => (
              <option
                key={i}
                value={
                  genre.name ? genre.name : genre
                }
              >
                {genre.name ? genre.name : genre}
              </option>
            ))}
          </select>
        </div>
        <div>
          FILTER BY TYPE CREATION:
          <select onChange={(e) => toFilterByCreation(e)}>
            <option hidden value="hidden">
              {inputForFilterByCreation}
            </option>
            <option value={"NO FILTER"}>{"NO FILTER"}</option>
            <option value={"CREATED"}>{"CREATED"}</option>
            <option value={"EXISTING"}>{"EXISTING"}</option>
          </select>
        </div>
      </div>
    </div>
  );
}

// export default function FilterAndOrder() {
//   const dispatch = useDispatch();
//   const inputForOrder = useSelector((state) => state.inputForOrder);
//   const inputForFilter=useSelector((state)=>state.inputForFilter)
//   const genres = useSelector((state) => state.genres);
//   const toOrder = (e) => {
//     dispatch(order(e.target.value));
// //aca falta despachar la orden de setear los inputs y las flags
//   };
//   const toFilterByName=(e)=>{
//     dispatch(filterByGenre(e.target.value))
//   }
//   return (
//     <div>
//       <div>
//         ORDER BY:
//         <select onChange={(e) => toOrder(e)}>
//           <option hidden value="hidden">
//             {inputForOrder}
//           </option>
//           <option value="no order">no order</option>
//           <option value="asc">{"A>Z"}</option>
//           <option value="des">{"Z>A"} </option>
//           <option value="greatest">{"GREATEST RATING"}</option>
//           <option value="least">{"LEAST RATING"}</option>
//         </select>
//       </div>
//       <div>
//         FILTER BY:
//         <select onChange={(e) => toFilterByName(e)}>
//           <option hidden value="hidden">
//             {inputForFilter}
//           </option>
//           {genres.map((genre) => (
//             <option key={genre.id} value={genre.name}>{genre.name}</option>
//           ))}
//         </select>
//       </div>
//     </div>
//   );
// }
