const fetch = require("node-fetch");
const { Op } = require("sequelize");
const { Videogame, Genre } = require("../db.js");

const getApiGames = async () => {
    const apiGames = [];
    for (let i = 1; i < 6; i++) {
      try {
        await fetch(
          `https://api.rawg.io/api/games?key=0bf28af6c8e545f1a7f19fcbaa63d25e&page=${i}`
        )
          .then((response) => response.json())
          .then((data) => {
            data.results.forEach((game) => {
              apiGames.push({
                id: game.id,
                title: game.name,
                description: game.description,
                release: game.released,
                image: game.background_image,
                rating: game.rating,
                platforms: game.parent_platforms.map((p) => p.platform.name),
                genres: game.genres.map((g) => g.name),
              });
            });
          });
      } catch (error) {
        throw Error(error.message);
      }
    }
    return apiGames;
  };

  const getDbGames = async () => {
    try {
      const dbGames = await Videogame.findAll({
        include: {
          model: Genre,
          attributes: ["name"],
          through: { attributes: [] },
        },
      }).then((data) => data.map((g) => g.toJSON()));
      return dbGames;
    } catch (error) {
      throw Error(error.message);
    }
  };

  const getApiByName = async (nameGame) => {
    let gamesApiByName = [];
    for (let i = 1; i < 6; i++) {
      try {
        await fetch(
          `https://api.rawg.io/api/games?search=${nameGame}&key=0bf28af6c8e545f1a7f19fcbaa63d25e`
        )
          .then((response) => response.json())
          .then((data) => {
            data.results.forEach((game) => {
              gamesApiByName.push({
                id: game.id,
                title: game.name,
                description: game.description,
                release: game.released,
                image: game.background_image,
                rating: game.rating,
                platforms: game.parent_platforms.map((p) => p.platform.name),
                genres: game.genres.map((g) => g.name),
              });
            });
          });
      } catch (error) {
        throw Error(error.message);
      }
    }
    return gamesApiByName;
  };
  const getDbByName = async (nameGame) => {
    try {
      let gamesDbByName = await Videogame.findAll({
        include: {
          model: Genre,
          attributes: ["name"],
          through: { attributes: [] },
        },
        where: {
          title: {
            [Op.iLike]: `%${nameGame}%`,
          },
        },
      }).then((data) => data.map((g) => g.toJSON()));
      return gamesDbByName;
    } catch (error) {
      throw Error(error.message);
    }
  };
  module.exports={
    getApiGames,
    getDbGames,
    getApiByName,
    getDbByName
  }