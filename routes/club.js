var express = require('express');
var router = express.Router();
var ClubController = require('../controllers/ClubController');

router.get('/', ClubController.getAll);
router.post('/', ClubController.create);
router.patch('/:id/', ClubController.update);
router.delete('/:id/', ClubController.deleteByID);

module.exports = router;