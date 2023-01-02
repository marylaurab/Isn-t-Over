const { Router } = require('express');
const videogameMiddleware=require('../routes/routes-videogame.js');
const genreMiddleware=require('../routes/routes-genre.js')
const platformMiddleware=require('../routes/routes-platforms.js')
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();
router.use('/videogames', videogameMiddleware)
router.use('/genres', genreMiddleware)
router.use('/platforms',platformMiddleware )




// Configurar los routers
// Ejemplo: rbbbbiisawmouter.use('/auth', authRouter);
  


module.exports = router;
