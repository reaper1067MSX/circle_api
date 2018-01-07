var express = require('express');
var router = express.Router();
var BeneficiarioController = require('../controllers/BeneficiarioController');

router.get('/', BeneficiarioController.getAll);

module.exports = router;