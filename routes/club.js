var express = require('express');
var router = express.Router();
var ClubController = require('../controllers/ClubController');

router.get('/', ClubController.getAll);
module.exports = router;