var express = require('express');
var router = express.Router();
var AuthController = require('../controllers/AuthController');

var asignaciones = require('./asignaciones');
var parametros = require('./parametros');
var beneficiarios = require('./beneficiario');
var catalogos = require('./catalogos');
var club = require('./club');
var cofacilitadores = require('./cofacilitadores');
var puntosatelite = require('./puntosatelite');
var inscripciones = require('./inscripciones');
var clubsasignados = require('./clubsasignados');

router.use('/asignaciones', asignaciones);
router.use('/parametros', parametros);
router.use('/beneficiarios', beneficiarios);
router.use('/catalogos', catalogos);
router.use('/club', club);
router.use('/cofacilitadores', cofacilitadores);
router.use('/puntosatelite', puntosatelite);
router.use('/inscripciones', inscripciones);
router.use('/clubsasignados', clubsasignados);
//router.get('/parametros/:usuario/:perfilid', AuthController.getParametros)

module.exports = router;