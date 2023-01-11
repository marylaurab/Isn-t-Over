import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { resetDetailGame } from "../Redux/actions/resets";
import style from "../cssComponents/detail.module.css";

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
          <button onClick={toBack} className={style.backButton}>
            back home
          </button>
        </Link>
      </div>
      <div className={style.detailCard}>
        <div className={style.headerCard}>
          <div className={style.divTitle}>
            <h1>{`${detailGame.title}`}</h1>
          </div>
          <div className={style.divImg}>
            <img className={style.img}
              src={`${detailGame.image}`}
              width="200px"
              height="200px"
              alt={`photo id game: ${detailGame.id}`}
            />
          </div>
          <div>
            <div>
              {" "}
              <h6>RELEASE:</h6>
            </div>
            <div className={style.release}>{`${detailGame.release}`}</div>
          </div>
          <div className={style.divRating}>
            <div>
              <h6>RATING:</h6>
            </div>
            <div>
              <p>{`${detailGame.rating}`}</p>
            </div>
          </div>
          <div className={style.divPlatform}>
            <div>
              <h6>PLATFORMS:</h6>
            </div>
            {detailGame.platforms?.map((p, i) => (
              <div key={i}>
                <span key={i} className={style.span}>{p} </span>
              </div>
            ))}
          </div>
          <div className={style.divGenre}>
            <div>
              <h6>GENRES:</h6>
            </div>
            {detailGame.genres?.map((g, i) => (
              <div key={i}>
                <span key={i} className={style.span}>{g.name ? g.name : g} </span>
              </div>
            ))}
          </div>
        </div>
        <div className={style.divDescription}>
          <p>{`${detailGame.description}`}</p>
        </div>
      </div>
    </div>
  ) : (
    <img src="https://www.globalreporting.org/styles/assets/images/circle-loading-gif.gif" />
  );
}
