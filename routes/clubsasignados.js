var express = require('express');
var router = express.Router();
var ClubAsignadoController = require('../controllers/ClubAsignadoController');

router.get('/', ClubAsignadoController.getAll);
//router.get('/:id', ClubAsignadoController.getById);
//router.post('/:id', ClubAsignadoController.create);
//router.delete('/', ClubAsignadoController.deleteByID);
module.exports = router;



