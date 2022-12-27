const { Genre } = require("../db.js");
const { getGenresDb, getGenresApi } = require("./auxiliar-Genre.js");

const getAllGenres = async () => {
  try {
    let getGenresSaved = await getGenresDb();
    if (getGenresSaved.length === 0) {
      let getGenres = await getGenresApi();
      getGenres.forEach((genre) => {
        Genre.findOrCreate({
          where: {
            name: genre,
          },
        });
      });

      return getGenres;
    }
    return getGenresSaved;
  } catch (error) {
    throw Error(error.message);
  }
};

module.exports = {
  getAllGenres,
};
