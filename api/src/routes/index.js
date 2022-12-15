const { Router } = require('express');
const videogameMiddleware=require('../routes/routes-videogame.js');
const genreMiddleware=require('../routes/routes-genre.js')
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();
router.use('/videogames', videogameMiddleware)
router.use('/genres', genreMiddleware)





// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
  


module.exports = router;
