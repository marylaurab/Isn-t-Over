import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { postNewGame } from "../Redux/actions/data";
import { useHistory } from "react-router-dom";
import {
  getAllVideogames,
  getAllGenres,
  getPlatforms,
} from "../Redux/actions/data";
import {
  resetFetching,
  resetInputOrder,
  resetInputFilterByGenre,
  resetInputSearch,
  resetInputFilterByCreation,
  resetSomeAppliedFilterFlag,
  resetAxiosFlag,
} from "../Redux/actions/resets";
import style from "../cssComponents/createGame.module.css";

export default function CreateGame() {
  const date = new Date();
  const today = date.toLocaleDateString();

  const dispatch = useDispatch();
  const history = useHistory();
  const platforms = useSelector((state) => state.mainData.platforms);
  const genres = useSelector((state) => state.mainData.genres);
  const successAxios = useSelector((state) => state.mainData.successAxios);
  const gamesToRender = useSelector((state) => state.mainData.gamesToRender);

  useEffect(() => {
    if (gamesToRender.length === 0) {
      dispatch(getAllVideogames());
      dispatch(getAllGenres());
    }
    dispatch(getPlatforms());
  }, []);

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

  useEffect(
    () =>
      Object.keys(errors).includes("image")
        ? inputs.image?.length === 0
          ? setInputs({ ...inputs, image: undefined })
          : null
        : null,
    [inputs.image]
  );

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

        history.push("/videogames");
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
    <div className={style.container}>
      <div className={style.backBar}>
        <div>
          <Link to="/videogames">
            <button className={style.buttonHeader}>home</button>
          </Link>
        </div>
        <div>
          <Link to="/">
            <button className={style.buttonHeader}>landing</button>
          </Link>
        </div>
      </div>
      <div className={style.formContainer}>
        <div className={style.typeTable}>
          <div className={style.inputsTypeTable}>
            <div className={style.titleContainer}>
              <label className={style.titleLabel}>Title: </label>
              <input
                name="title"
                value={inputs.title}
                placeholder="Title game..."
                type="text"
                onChange={handlerChange}
                autoComplete="off"
                className={style.titleInput}
              />
              {errors.title && <p className={style.errors}>{errors.title}</p>}
            </div>
            <div className={style.descriptionContainer}>
              <label className={style.descriptionLabel}>Description: </label>
              <input
                name="description"
                value={inputs.description}
                placeholder="What's the game about?"
                type="text"
                autoComplete="off"
                onChange={handlerChange}
                className={style.descriptionInput}
              />
              {errors.description && (
                <p className={style.errors}>{errors.description}</p>
              )}
            </div>

            <div className={style.releaseContainer}>
              <label className={style.releaseLabel}>Release: </label>
              <input
                name="release"
                value={inputs.release}
                type="text"
                autoComplete="off"
                placeholder="mm/dd/yyyy"
                onChange={handlerChange}
                className={style.releaseInput}
              />
              {errors.release && (
                <p className={style.errors}>{errors.release}</p>
              )}
            </div>

            <div className={style.imgContainer}>
              <label className={style.imgLabel}>Image link: </label>
              <input
                className={style.imgInput}
                type="link"
                name="image"
                id="link"
                autoComplete="off"
                value={inputs.image}
                onChange={(e) => (
                  receivedImage(e.target.value), handlerChange(e)
                )}
                placeholder="https://example.jpg"
                pattern="https://.*"
                // size="30"
              />
              {errors.image && <p className={style.errors}>{errors.image}</p>}
            </div>

            <div className={style.ratingContainer}>
              <label className={style.ratingLabel}>Rating: </label>
              <input
                name="rating"
                value={inputs.rating}
                type="range"
                min="1"
                max="5"
                step="0.01"
                onChange={handlerChange}
                className={style.ratingInput}
              />
              {<p className={style.ratingNumber}>{inputs.rating}</p>}
            </div>
          </div>
        </div>
        <div className={style.selectTable}>
          <div className={style.platformANDGenreContainer}>
            <label className={style.platformLabel}>Platforms: </label>
            {!displayPlatforms ? (
              <button
                onClick={() =>
                  setDisplayPlatforms((old) => setDisplayPlatforms(!old))
                }
                className={style.platformBotton}
              >
                show platforms
              </button>
            ) : (
              <button
                onClick={() =>
                  setDisplayPlatforms((old) => setDisplayPlatforms(!old))
                }
                className={style.platformBotton}
              >
                hide platforms
              </button>
            )}
            {errors.platforms ? (
              <p className={style.errors}>{errors.platforms}</p>
            ) : null}
            {displayPlatforms && (
              <div className={style.scrolling}>
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
          <div className={style.platformANDGenreContainer}>
            <label className={style.genreLabel}>Genres: </label>
            {!displayGenres ? (
              <button
                onClick={() => setGenres((old) => setGenres(!old))}
                className={style.genreBoton}
              >
                show genres
              </button>
            ) : (
              <button
                onClick={() => setGenres((old) => setGenres(!old))}
                className={style.genreBoton}
              >
                hide genres
              </button>
            )}
            {errors.genres ? (
              <p className={style.errors}>{errors.genres}</p>
            ) : null}
            {displayGenres && (
              <div className={style.scrolling}>
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
        </div>
        <div className={style.divCreateBotton}>
          <button
            onClick={(e) => handlerSubmit(e)}
            className={style.createBotton}
          >
            post game
          </button>
        </div>
      </div>
    </div>
  );
}
