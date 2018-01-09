var express = require('express');
var router = express.Router();
var CatalogosController = require('../controllers/CatalogosController');

router.get('/', CatalogosController.getAll);

module.exports = router; 