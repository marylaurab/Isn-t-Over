import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { postNewGame } from "../Redux/actions/data";
import { useHistory } from "react-router-dom";
import { getAllVideogames } from "../Redux/actions/data";
import {
  resetFetching,
  resetInputOrder,
  resetInputFilterByGenre,
  resetInputSearch,
  resetInputFilterByCreation,
  resetSomeAppliedFilterFlag,
  resetAxiosFlag,
} from "../Redux/actions/resets";

export default function CreateGame() {
  const date = new Date();
  const today = date.toLocaleDateString();

  const dispatch = useDispatch();
  const history = useHistory();
  const platforms = useSelector((state) => state.mainData.platforms);
  const genres = useSelector((state) => state.mainData.genres);
  const successAxios = useSelector((state) => state.mainData.successAxios);

  const initialValues = {
    title: "",
    description: "",
    release: "",
    rating: 1,
    platforms: [],
    genres: [],
  };

  const [inputs, setInputs] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [displayPlatforms, setDisplayPlatforms] = useState(false);
  const [displayGenres, setGenres] = useState(false);

  const validate = (inputToValidate) => {
    let foundErrors = {};

    if (inputToValidate.title) {
      if (!/^[\s\S]{3,25}$/.test(inputToValidate.title)) {
        foundErrors.title =
          "The title must have a minimum of 3 character and a maximum of 25 characters";
      }
    }

    if (inputToValidate.description) {
      if (!/^[\s\S]{10,255}$/.test(inputToValidate.description)) {
        foundErrors.description =
          "The description must have a minimum of 10 character and a maximum of 255 characters";
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

    if (displayPlatforms && inputToValidate.platforms.length === 0) {
      foundErrors.platforms = "You have to choose at least 1 platform";
    }

    if (displayGenres && inputToValidate.genres.length === 0) {
      foundErrors.genres = "You have to choose at least 1 genre";
    }
    return foundErrors;
  };
  const handlerChange = (e) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    setErrors(validate(inputs));
  }, [inputs, displayPlatforms, displayGenres]);

  const addGenre = (id) => {
    let checkboxClicked = document.getElementById(id);
    if (checkboxClicked.checked) {
      if (inputs.genres.includes(id)) {
        return;
      } else {
        setInputs({ ...inputs, genres: [...inputs.genres, id] });
      }
    } else {
      setInputs({ ...inputs, genres: inputs.genres.filter((g) => g !== id) });
    }
  };

  const addPlatform = (id) => {
    let checkboxClicked = document.getElementById(id);
    if (checkboxClicked.checked) {
      if (inputs.platforms.includes(id)) {
        return;
      } else {
        setInputs({ ...inputs, platforms: [...inputs.platforms, id] });
      }
    } else {
      setInputs({
        ...inputs,
        platforms: inputs.platforms.filter((p) => p !== id),
      });
    }
  };

  const receivedImage = (image) => {
    setInputs({
      ...inputs,
      image: image,
    });
  };

  const handlerSubmit = (e) => {
    e.preventDefault();
    if (
      JSON.stringify(errors) !== "{}" ||
      inputs.title === "" ||
      inputs.description === "" ||
      inputs.platforms.length === 0 ||
      inputs.genres.length === 0
    ) {
      alert("Please, check the info provided. The data is wrong or missing");
    } else {
      dispatch(postNewGame(inputs));
      if (successAxios) {
        alert("The videogame was created successfully");
        setInputs(initialValues);
        dispatch(getAllVideogames());
        dispatch(resetInputOrder());
        dispatch(resetInputFilterByGenre());
        dispatch(resetInputFilterByCreation());
        dispatch(resetInputSearch());
        dispatch(resetFetching());
        dispatch(resetSomeAppliedFilterFlag());
        dispatch(resetAxiosFlag());
        history.push("/videogames");
      } else {
        alert("Sorry! an error occurred. Try again.");
        setInputs(initialValues);
      }
    }
  };

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

      {/* <div>
        <input
          name="image"
          value={inputs.image}
          type="file"
          accept="image/png, image/jpeg"
          onChange={(e) => receivedImage(e.target.value)} //falta chequear si se crea bien o no en el back, si lo toma como valor valido.
        />
      </div> */}
      <div>
        <input
          type="url"
          name="url"
          id="url"
          value={inputs.image}
          onChange={(e) => receivedImage(e.target.value)}
          placeholder="https://example.com"
          pattern="https://.*"
          size="30"
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
      <div>
        <button
          onClick={() =>
            setDisplayPlatforms((old) => setDisplayPlatforms(!old))
          }
        >
          Choose platform/s
        </button>
        {errors.platforms ? <p>{errors.platforms}</p> : <p>{"\u00A0"}</p>}
        {displayPlatforms &&
          platforms.map((p, i) => (
            <label key={i}>
              {p}
              <input
                key={i}
                id={p}
                value={inputs.platforms}
                type="checkbox"
                onClick={() => addPlatform(p)}
              />
              <br />
            </label>
          ))}
      </div>
      <div>
        <button onClick={() => setGenres((old) => setGenres(!old))}>
          Choose genre/s
        </button>
        {errors.genres ? <p>{errors.genres}</p> : <p>{"\u00A0"}</p>}
        {displayGenres &&
          genres.map((g, i) => (
            <label key={i}>
              {g.name ? g.name : g}
              <input
                key={i}
                id={`${g.name ? g.name : g}`}
                value={inputs.genres}
                type="checkbox"
                onClick={() => addGenre(g.name ? g.name : g)}
              />
              <br />
            </label>
          ))}
      </div>
      <button onClick={(e) => handlerSubmit(e)}>create videogame</button>
    </div>
  );
}
