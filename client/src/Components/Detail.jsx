import { useSelector } from "react-redux";

export default function Detail() {
  const detailGame = useSelector((state) => state.mainData.detailGame);
  return (
    <div>
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
          <span key={i}>{g} </span>
        ))}
      </div>
      <p>{`${detailGame.description}`}</p>
    </div>
  );
}
