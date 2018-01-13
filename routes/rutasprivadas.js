var express = require('express');
var router = express.Router();
var AuthController = require('../controllers/AuthController');

var parametros = require('./parametros');
var beneficiarios = require('./beneficiario');
var catalogos = require('./catalogos');
var club = require('./club');

router.use('/parametros', parametros);
router.use('/beneficiarios', beneficiarios);
router.use('/catalogos', catalogos);
router.use('/club', club);
//router.get('/parametros/:usuario/:perfilid', AuthController.getParametros)

module.exports = router;