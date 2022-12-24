import { order,filterByGenre } from "../Redux/actions/index";
import { useDispatch, useSelector } from "react-redux";

export default function FilterAndOrder() {
  const dispatch = useDispatch();
  const inputForOrder = useSelector((state) => state.inputForOrder);
  const inputForFilter=useSelector((state)=>state.inputForFilter)
  const genres = useSelector((state) => state.genres);
  const toOrder = (e) => {
    dispatch(order(e.target.value));
  };
  const toFilterByName=(e)=>{
    dispatch(filterByGenre(e.target.value))
  }
  return (
    <div>
      <div>
        ORDER BY:
        <select onChange={(e) => toOrder(e)}>
          <option hidden value="hidden">
            {inputForOrder}
          </option>
          <option value="noOrder">no order</option>
          <option value="asc">{"A>Z"}</option>
          <option value="des">{"Z>A"} </option>
          <option value="greatest">{"GREATEST RATING"}</option>
          <option value="least">{"LEAST RATING"}</option>
        </select>
      </div>
      <div>
        FILTER BY:
        <select onChange={(e) => toFilterByName(e)}>
          <option hidden value="hidden">
            {inputForFilter}
          </option>
          {genres.map((genre) => (
            <option key={genre.id} value={genre.name}>{genre.name}</option>
          ))}
        </select>
      </div>
    </div>
  );
}
