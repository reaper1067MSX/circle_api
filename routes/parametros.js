var express = require('express');
var router = express.Router();
var ParametroController = require('../controllers/ParametroController');

router.get('/', ParametroController.getAll);
router.get('/:id/', ParametroController.getById);
router.post('/', ParametroController.create);
router.delete('/:id/', ParametroController.deleteById);
router.patch('/:id/', ParametroController.update);
module.exports = router;