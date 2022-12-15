import { Link } from "react-router-dom";
import CardGame from "./CardGame";
import Pagination from "./Pagination";
import SearchBar from "./SearchBar";
import { useEffect, useState } from "react";
import { getAllVideogames } from "../Redux/actions/index.js";
import { useDispatch, useSelector } from "react-redux";

export default function Home() {
  const [position, setPosition] = useState({ firstOne: 0, LastOne: 15 });
  const dispatch = useDispatch();
  const gamesToRender = useSelector((state) => state.gamesToRender);
  useEffect(() => {
    dispatch(getAllVideogames());
  }, []);

  const next = () => {
    if (position.LastOne >= gamesToRender.length) return;
    setPosition({
      firstOne: position.firstOne + 15,
      LastOne: position.LastOne + 15,
    });
  };

  const prev = () => {
    if (position.firstOne === 0) return;
    setPosition({
      firstOne: position.firstOne - 15,
      LastOne: position.LastOne - 15,
    });
  };

  return gamesToRender && gamesToRender.length > 0 ? (
    <div>
      <SearchBar />
      {gamesToRender.slice(position.firstOne, position.LastOne).map((g) => (
        <div key={g.id}>
          {/*No me toma el key */}
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
      <Pagination prev={prev} next={next} />
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
