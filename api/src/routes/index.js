const { Router } = require('express');
const videogameMiddleware=require('../routes/routes-videogame.js')
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();
router.use('/videogames', videogameMiddleware)
//router.use('/genres', genreMiddleware)
//---->>>>>>aca iria la ruta '/' base de llegada res.send('PI') ejemplo.




// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
  


module.exports = router;
