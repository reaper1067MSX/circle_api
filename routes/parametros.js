var express = require('express');
var router = express.Router();
var ParametroController = require('../controllers/ParametroController');

router.get('/', ParametroController.getAll);
router.get('/:id/', ParametroController.getById);
router.post('/', ParametroController.create);
router.patch('/:id/', ParametroController.deleteById);

module.exports = router;