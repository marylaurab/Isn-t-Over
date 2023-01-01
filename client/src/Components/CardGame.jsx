export default function CardGame({ image, title, rating, genres, id }) {
  return (
    <div>
      <img src={image} alt={`${title}`} width="380px" height="250px" />
      <h4>{title}</h4>
      <div>
        <div>
          <img
            src="https://cdn.pixabay.com/photo/2021/10/11/00/58/star-6699069__340.png"
            width="10px"
            height="10px"
          />
          <span>{rating}</span>
        </div>
        {genres?.map((g, i) => (
          <span key={i}>{`${g} `}</span>
        ))}
      </div>
    </div>
  );
}
