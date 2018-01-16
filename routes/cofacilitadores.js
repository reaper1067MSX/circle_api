var express = require('express');
var router = express.Router();
var CoFacilitadorController = require('../controllers/CoFacilitadorController');

router.get('/', CoFacilitadorController.getAll);
router.post('/', CoFacilitadorController.create);
router.delete('/:id/', CoFacilitadorController.deleteById);

module.exports = router;