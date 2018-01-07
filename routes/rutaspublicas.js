var express = require('express');
var router = express.Router();
var AuthController = require('../controllers/AuthController');


router.get('/', function(req, res, next) {
  res.status(200).json({'estado': 'api activa'})
});

router.post('/login', AuthController.login);

module.exports = router;