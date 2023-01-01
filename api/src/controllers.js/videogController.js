const fetch = require("node-fetch");
// const { Op } = require("sequelize");
const { Videogame, Genre } = require("../db.js");
const {
  getApiGames,
  getDbGames,
  getApiByName,
  getDbByName,
} = require("./auxiliar-Videogame.js");
const { API_KEY } = process.env;

const getAllGames = async () => {
  try {
    let allGames = [];
    let fromApi = await getApiGames();
    let fromDb = await getDbGames();
    allGames = [...fromApi, ...fromDb];
    return allGames;
  } catch (error) {
    throw Error(error.message);
  }
};

const getAllByName = async (title) => {
  try {
    let byName = [];
    let filteredApi = await getApiByName(title);
    let filteredDb = await getDbByName(title);
    byName = [...filteredApi, ...filteredDb];
    if (byName.length > 15) return byName.splice(0, 15);
    return byName;
  } catch (error) {
    throw Error(error.message);
  }
};

const getGameById = async (id) => {
  if (id.includes("-") && id.length === 36) {
    let aux = id.split("-");
    if (
      aux[0].length === 8 &&
      aux[1].length === 4 &&
      aux[2].length === 4 &&
      aux[3].length === 4 &&
      aux[4].length === 12
    ) {
      try {
        const detailsDb = await Videogame.findOne({
          where: { id: id },
          include: [
            { model: Genre, attributes: ["name"], through: { attributes: [] } },
          ],
        }).then((data) => data?.toJSON());
        if (!detailsDb) throw Error("Not game found");
        return detailsDb;
      } catch (error) {
        throw Error(error.message);
      }
    } else {
      throw Error("Please, check the ID provided.");
    }
  } else {
    try {
      let detailsApi;
      let aux = await fetch(
        `https://api.rawg.io/api/games/${id}?key=${API_KEY}`
      ).then((response) => response.json());
      detailsApi = {
        id: aux.id,
        title: aux.name,
        description: aux.description
          .replace(/<[^>]*>?/g, "")
          .replace(/(\r\n|\n|\r)/gm, "")
          .replaceAll("&#39;s", "'s"),
        release: aux.released,
        image: aux.background_image,
        rating: aux.rating,
        platforms: aux.parent_platforms?.map((p) => p.platform.name),
        genres: aux.genres?.map((g) => g.name),
      };

      return detailsApi;
    } catch (error) {
      throw Error(error.message);
    }
  }
};

const createVideogame = async (
  title,
  description,
  release,
  image,
  rating,
  platforms,
  genres
) => {
  try {
    let newGame = await Videogame.create({
      title,
      description,
      release,
      image,
      rating,
      platforms,
    });
    for (let name of genres) {
      const genreFromDB = await Genre.findOne({ where: { name } });
      await newGame.addGenre(genreFromDB);
    }
    // let genre = await Genre.findAll({

    //   where: {
    //     name: {
    //       [Op.in]: genres,
    //     },
    //   },
    // });
    // console.log("GENEROS:", genre)
    // for(let g of genre) {
    //   await newGame.addGenre(g);
    // }
    // // await newGame.addGenre(genre);
    // return newGame;

    const gameTobeReturned = await Videogame.findOne({
      where: { id: newGame.id },
      include: [
        {
          model: Genre,
          as: "genres",
          attributes: ["name"],
          through: {
            attributes: [],
          },
        },
      ],
    }).then((result) => result.toJSON());

    gameTobeReturned.genres = gameTobeReturned.genres.map((g) => g.name);

    return gameTobeReturned;
  } catch (error) {
    throw Error(error);
  }
};

// createVideogame("probandoAndo",
//   "lpm",
//   "20/22/08",
//   "https://cnnespanol.cnn.com/wp-content/uploads/2022/07/220713165438-rba-web-nasa-full-169.jpg?quality=100&strip=info&w=384&h=216&crop=1",
//   "5",
//   ["Xbox"],
//   ["Action", "Educational"])

module.exports = {
  getAllGames,
  getAllByName,
  getGameById,
  createVideogame,
};
