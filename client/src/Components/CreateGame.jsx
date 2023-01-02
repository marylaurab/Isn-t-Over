import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";

export default function CreateGame() {
  const date = new Date();
  const today = date.toLocaleDateString();

  const platforms = useSelector((state) => state.mainData.platforms);
  const genres = useSelector((state) => state.mainData.genres);
  const initialValues = {
    title: "",
    description: "",
    release: "",
    image: "",
    rating: 1,
    platforms: [],
    genres: [],
  };

  const [inputs, setInputs] = useState(initialValues);
  const [errors, setErrors] = useState({});

  const validate = (inputToValidate) => {
    let foundErrors = {};

    if (inputToValidate.title) {
      if (!/^[\s\S]{3,25}$/.test(inputToValidate.title)) {
        foundErrors.title =
          "The title must have a minimum of 1 character and a maximum of 25 characters";
      }
    }

    if (inputToValidate.description) {
      if (!/^[\s\S]{10,255}$/.test(inputToValidate.description)) {
        foundErrors.description =
          "The title must have a minimum of 10 character and a maximum of 255 characters";
      }
    }

    if (inputToValidate.release) {
      const splitRelease = inputToValidate.release.split("/");
      const yearRelease = splitRelease[2];
      const splitToday = today.split("/");
      const yearToday = splitToday[2];
      if (
        !/^(0[1-9]|1[012])[/](0[1-9]|[12][0-9]|3[01])[/](19|20)\d\d$/.test(
          inputToValidate.release
        ) ||
        Number(yearRelease) < 1950 ||
        Number(yearRelease) > Number(yearToday)
      ) {
        foundErrors.release =
          "Month, day, year or separator symbols are incorret";
      }
    }

    if (inputToValidate.platforms.length === 0) {
      foundErrors.platforms = "You have to choose at least 1 platform";
    }

    if (inputToValidate.genres.length === 0) {
      foundErrors.genres = "You have to choose at least 1 genre";
    }
    return foundErrors;
  };
  const handlerChange = (e) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    setErrors(validate(inputs));
  }, [inputs]);

  return (
    <div>
      <div>
        <input
          name="title"
          value={inputs.title}
          placeholder="Title game..."
          type="text"
          onChange={handlerChange}
        />{" "}
        {errors.title && <p>{errors.title}</p>}
      </div>
      <div>
        <input
          name="description"
          value={inputs.description}
          placeholder="What's the game about?"
          type="text"
          onChange={handlerChange}
        />
        {errors.description && <p>{errors.description}</p>}
      </div>

      <div>
        <input
          name="release"
          value={inputs.release}
          type="text"
          placeholder="mm/dd/yyyy"
          onChange={handlerChange}
        />
        {errors.release && <p>{errors.release}</p>}
      </div>

      <div>
        <input
          name="image"
          value={inputs.image}
          type="file"
          accept="image/png, image/jpeg"
        />
      </div>

      <div>
        <input
          name="rating"
          value={inputs.rating}
          type="range"
          min="1"
          max="5"
          onChange={handlerChange}
        />
        {<p>{inputs.rating}</p>}
      </div>

      {platforms.map((p, i) => (
        <label key={i}>
          {p}
          <input key={i} name={p} value={inputs.platforms} type="checkbox" />
          <br />
        </label>
      ))}
      <br />
      {genres.map((g, i) => (
        <label key={i}>
          {g.name}
          <input key={i} name={g.name} value={inputs.genres} type="checkbox" />
          <br />
        </label>
      ))}
    </div>
  );
}
