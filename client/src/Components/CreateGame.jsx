import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
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
import scrolling from "../cssComponents/CreateGame.module.css";
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
    image: undefined,
    rating: 1,
    platforms: [],
    genres: [],
  };

  const [inputs, setInputs] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [displayPlatforms, setDisplayPlatforms] = useState(false);
  const [displayGenres, setGenres] = useState(false);
  const [selectedPlatforms, setSelectedPlatforms] = useState([]);
  const [selectedGenres, setSelectedGenres] = useState([]);

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
    if (inputToValidate.image) {
      if (
        !/https?\:\/\/[a-zA-Z0-9\-\.]+\.[a-zA-Z]{2,}/.test(
          inputToValidate.image
        )
      ) {
        foundErrors.image = "Invalid link";
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

  const addGenre = (id, i) => {
    let checkboxClicked = document.getElementById(id);
    if (checkboxClicked.checked) {
      if (inputs.genres.includes(id)) {
        return;
      } else {
        setInputs({ ...inputs, genres: [...inputs.genres, id] });
        setSelectedGenres((old) => setSelectedGenres([...old, i]));
      }
    } else {
      setInputs({ ...inputs, genres: inputs.genres.filter((g) => g !== id) });
      setSelectedGenres((old) => setSelectedGenres(old.filter((g) => g !== i)));
    }
  };

  const addPlatform = (id, i) => {
    let checkboxClicked = document.getElementById(id);
    if (checkboxClicked.checked) {
      if (inputs.platforms.includes(id)) {
        return;
      } else {
        setInputs({ ...inputs, platforms: [...inputs.platforms, id] });
        setSelectedPlatforms((old) => setSelectedPlatforms([...old, i]));
      }
    } else {
      setInputs({
        ...inputs,
        platforms: inputs.platforms.filter((p) => p !== id),
      });
      setSelectedPlatforms((old) =>
        setSelectedPlatforms(old.filter((p) => p !== i))
      );
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
        cleaningHome();
        alert("The videogame was created successfully");

        history.push("/videogames"); //esto podria ir en el boton de click ir al home luego de crearlo correctamente
      } else {
        alert("Sorry! an error occurred. Try again.");
        setInputs(initialValues);
        dispatch(resetAxiosFlag());
      }
    }
  };

  const cleaningHome = () => {
    setInputs(initialValues);
    dispatch(getAllVideogames());
    dispatch(resetInputOrder());
    dispatch(resetInputFilterByGenre());
    dispatch(resetInputFilterByCreation());
    dispatch(resetInputSearch());
    dispatch(resetFetching());
    dispatch(resetSomeAppliedFilterFlag());
  };

  return (
    <div>
      <Link to="/videogames">
        <button>back home</button>
      </Link>
      <div>
        <label>Title: </label>
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
        <label>Description: </label>
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
        <label>Release: </label>
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
        <label>Image link: </label>
        <input
          type="link"
          name="link"
          id="link"
          value={inputs.image}
          onChange={(e) => receivedImage(e.target.value)}
          placeholder="https://example.jpg"
          pattern="https://.*"
          size="30"
        />
        {errors.image && <p>{errors.image}</p>}
      </div>

      <div>
        <label>Rating: </label>
        <input
          name="rating"
          value={inputs.rating}
          type="range"
          min="1"
          max="5"
          step="0.01"
          onChange={handlerChange}
        />
        {<p>{inputs.rating}</p>}
      </div>
      <div>
        <label>Platforms: </label>
        {!displayPlatforms ? (
          <button
            onClick={() =>
              setDisplayPlatforms((old) => setDisplayPlatforms(!old))
            }
          >
            show platforms
          </button>
        ) : (
          <button
            onClick={() =>
              setDisplayPlatforms((old) => setDisplayPlatforms(!old))
            }
          >
            hide platforms
          </button>
        )}
        {errors.platforms ? <p>{errors.platforms}</p> : <p>{"\u00A0"}</p>}
        {displayPlatforms && (
          <div className={scrolling.container}>
            {platforms.map((p, i) => (
              <label key={i}>
                {p}
                <input
                  key={i}
                  id={p}
                  value={inputs.platforms}
                  type="checkbox"
                  checked={selectedPlatforms?.includes(i) ? true : false}
                  onChange={() => addPlatform(p, i)}
                />
                <br />
              </label>
            ))}
          </div>
        )}
      </div>
      <div>
        <label>Genres: </label>
        {!displayGenres ? (
          <button onClick={() => setGenres((old) => setGenres(!old))}>
            show genres
          </button>
        ) : (
          <button onClick={() => setGenres((old) => setGenres(!old))}>
            hide genres
          </button>
        )}
        {errors.genres ? <p>{errors.genres}</p> : <p>{"\u00A0"}</p>}
        {displayGenres && (
          <div className={scrolling.container}>
            {genres.map((g, i) => (
              <label key={i}>
                {g.name ? g.name : g}
                <input
                  key={i}
                  id={`${g.name ? g.name : g}`}
                  value={inputs.genres}
                  type="checkbox"
                  checked={selectedGenres?.includes(i) ? true : false}
                  onChange={() => addGenre(g.name ? g.name : g, i)}
                />
                <br />
              </label>
            ))}
          </div>
        )}
      </div>
      <button onClick={(e) => handlerSubmit(e)}>create videogame</button>
    </div>
  );
}
