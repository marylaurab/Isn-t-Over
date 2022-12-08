const fetch = require("node-fetch");
const { Genre } = require("../db.js");

const getGenresDb = async () => {
  try {
    let genresDb = await Genre.findAll({
    }).then((response) => response?.map((g) => g.toJSON()));
    return genresDb;
  } catch (error) {
    throw Error(error.message);
  }
};

const getGenresApi = async () => {
  try {
    const genresApi =[] 
    await fetch(
      `https://api.rawg.io/api/genres?key=0bf28af6c8e545f1a7f19fcbaa63d25e`
    ).then((response) => response.json()).then((data)=>{
        data.results?.forEach(g => {
            genresApi.push(g.name)
        });
    });
    return genresApi;
  } catch (error) {
    throw Error(error.message);
  }
};
getGenresApi()
module.exports = {
  getGenresDb,
  getGenresApi,
};
