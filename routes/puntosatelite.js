var express = require('express');
var router = express.Router();
var PuntoSateliteController = require('../controllers/PuntoSateliteController');

router.get('/', PuntoSateliteController.getAll);


module.exports = router;