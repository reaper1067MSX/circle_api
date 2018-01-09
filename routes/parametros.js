var express = require('express');
var router = express.Router();
var ParametroController = require('../controllers/ParametroController');

router.get('/', ParametroController.getAll);
router.post('/', ParametroController.create);

module.exports = router;