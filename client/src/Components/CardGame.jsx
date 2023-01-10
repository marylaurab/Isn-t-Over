import style from "../cssComponents/cards.module.css";

export default function CardGame({ image, title, rating, genres, id }) {
  return (
    <div className={style.card}>
      <img
        src={image}
        alt={`${title}`}
        width="380px"
        height="250px"
        className={style.img}
      />
      <div className={style.title}>{title}</div>

      <div className={style.divRating}>
        <img
          src="https://cdn.pixabay.com/photo/2021/10/11/00/58/star-6699069__340.png"
          width="10px"
          height="10px"
        />
        <span className={style.spanRating}>{rating}</span>
      </div>
      <div className={style.genreCotainer}>
        {genres?.map((g, i) => (
          <div key={i}>
            <span key={i} className={style.spanGenre}>{`${g} `}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
