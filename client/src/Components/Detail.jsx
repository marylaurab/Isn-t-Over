import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { resetDetailGame } from "../Redux/actions/resets";
import style from '../cssComponents/detail.module.css'

export default function Detail() {
  const detailGame = useSelector((state) => state.mainData.detailGame);
  const dispatch = useDispatch();

  const toBack = () => {
    dispatch(resetDetailGame());
  };

  return detailGame && Object.keys(detailGame).length > 0 ? (
    <div className={style.container}>
      <div className={style.backBar}>
        <Link to="/videogames">
          <button onClick={toBack} className={style.backButton}>back home</button>
        </Link>
      </div>
      <div className={style.detailCard}>
        <div>
          <h1>{`${detailGame.title}`}</h1>
        </div>
        <div>
          <img
            src={`${detailGame.image}`}
            width="150px"
            height="150px"
            alt={`photo id game: ${detailGame.id}`}
          />
        </div>
        <div>
          <div>
            {" "}
            <h6>RELEASE:</h6>
          </div>
          <div>{`${detailGame.release}`}</div>
        </div>
        <div>
          <div>
            <h6>RATING:</h6>
          </div>
          <div>
            <p>{`${detailGame.rating}`}</p>
          </div>
        </div>
        <div>
          <div>
            <h6>PLATFORMS:</h6>
          </div>
          {detailGame.platforms?.map((p, i) => (
            <div key={i}>
              <span key={i}>{p} </span>
            </div>
          ))}
        </div>
        <div>
          <div>
            <h6>GENRES:</h6>
          </div>
          {detailGame.genres?.map((g, i) => (
            <div key={i}>
              <span key={i}>{g.name ? g.name : g} </span>
            </div>
          ))}
        </div>
        <div>
          <p>{`${detailGame.description}`}</p>
        </div>
      </div>
    </div>
  ) : (
    <img src="https://www.globalreporting.org/styles/assets/images/circle-loading-gif.gif" />
  );
}
