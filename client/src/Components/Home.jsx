import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { getAllVideogames } from "../Redux/actions/index.js";
import { useDispatch, useSelector } from "react-redux";
import CardGame from "./CardGame";
import Pagination from "./Pagination";
import SearchBar from "./SearchBar";

export default function Home() {
  const dispatch = useDispatch();
  const gamesToRender = useSelector((state) => state.gamesToRender);
  const [perPage, setPerPage] = useState(15);
  const [currentPage, setCurrentPage] = useState(1);
  const totalGames = gamesToRender.length;
  const lastIndex = currentPage * perPage;
  const firstIndex = lastIndex - perPage;

  useEffect(() => {
    dispatch(getAllVideogames());
  }, []);

  return gamesToRender && gamesToRender.length > 0 ? (
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
        perPage={perPage}
        totalGames={totalGames}
        setCurrentPage={setCurrentPage}
        currentPage={currentPage}
      />
    </div>
  ) : (
    <img src="https://www.globalreporting.org/styles/assets/images/circle-loading-gif.gif" />
  );
}
// export class Home extends React.Component {
//   constructor(props) {
//     super(props);
//   }
//   componentDidMount() {
//     this.props.getAllVideogames();
//   }
//   render() {
//     return(<div>hola</div>);
//   }
// }
// export function mapStateToProps(state) {
//   return {
//     videogames: state.allVideogames,
//   };
// }
// export function mapDispatchToPros(dispatch) {
//   return {
//     getAllVideogames: () => dispatch(getAllVideogames()),
//   };
// }

// export default connect(mapStateToProps, mapDispatchToPros)(Home);