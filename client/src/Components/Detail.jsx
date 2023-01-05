import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { resetDetailGame } from "../Redux/actions/resets";

export default function Detail() {
  const detailGame = useSelector((state) => state.mainData.detailGame);
  const dispatch = useDispatch();

  const toBack = () => {
    dispatch(resetDetailGame());
  };

  return detailGame && Object.keys(detailGame).length > 0 ? (
    <div>
      <Link to="/videogames">
        <button onClick={toBack}>back home</button>
      </Link>
      <div>
        <h1>{`${detailGame.title}`}</h1>
      </div>
      <img
        src={`${detailGame.image}`}
        width="600px"
        height="600px"
        alt={`photo id game: ${detailGame.id}`}
      />
      <div>
        <h6>RELEASE: {`${detailGame.release}`}</h6>
        <p>{`${detailGame.rating}`}</p>
      </div>
      <div>
        <h6>PLATFORMS:</h6>
        {detailGame.platforms?.map((p, i) => (
          <span key={i}>{p} </span>
        ))}
      </div>
      <div>
        <h6>GENRES:</h6>
        {detailGame.genres?.map((g, i) => (
          <span key={i}>{g.name ? g.name : g} </span>
        ))}
      </div>
      <p>{`${detailGame.description}`}</p>
    </div>
  ) : (
    <img src="https://www.globalreporting.org/styles/assets/images/circle-loading-gif.gif" />
  );
}
