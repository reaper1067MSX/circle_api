var express = require('express');
var router = express.Router();
var AuthController = require('../controllers/AuthController');

var parametros = require('./parametros');
var beneficiarios = require('./beneficiario');

router.use('/parametros', parametros);
router.use('/beneficiarios', beneficiarios);
//router.get('/parametros/:usuario/:perfilid', AuthController.getParametros)

module.exports = router;