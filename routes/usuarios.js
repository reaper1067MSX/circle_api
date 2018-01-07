var express = require('express');
var router = express.Router();
var UsuarioController = require('../controllers/UsuarioController');

//router.get('/', UsuarioController.getAll);

router.post('/:id/login', UsuarioController.getById);

module.exports = router;