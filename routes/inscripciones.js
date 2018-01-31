var express = require('express');
var router = express.Router();
var InscripcionesController = require('../controllers/InscripcionesController');



//router.get('/', DetalleClubController.getAll);
//router.get('/:id', DetalleClubController.getById);
router.post('/:id', InscripcionesController.create);
router.delete('/', InscripcionesController.deleteByID);
module.exports = router;