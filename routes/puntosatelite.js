var express = require('express');
var router = express.Router();
var PuntoSateliteController = require('../controllers/PuntoSateliteController');

router.get('/', PuntoSateliteController.getAll);
router.get('/:id', PuntoSateliteController.getById);
router.post('/', PuntoSateliteController.create);
router.delete('/:id/', PuntoSateliteController.deleteById);
router.patch('/:id', PuntoSateliteController.update);

module.exports = router;