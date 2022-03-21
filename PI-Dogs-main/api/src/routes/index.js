const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const dog = require ("./dog")
const temperamento = require ("./temperamento")


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.use('/dogs', dog)
router.use('/temperament', temperamento)


module.exports = router;
