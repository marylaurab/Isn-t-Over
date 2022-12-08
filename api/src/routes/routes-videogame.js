const { Router } = require("express");
const router = Router();
const {
  getAllGames,
  getAllByName,
  getGameById,
  createVideogame,
} = require("../controllers.js/videogController.js");

router.get("/", async (req, res) => {
  try {
    const videogames = await getAllGames();
    res.json(videogames);
  } catch (error) {
    res.status(404).send(error.message);
  }
});
module.exports=router
