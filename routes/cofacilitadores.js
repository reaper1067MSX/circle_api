var express = require('express');
var router = express.Router();
var CoFacilitadorController = require('../controllers/CoFacilitadorController');

router.get('/', CoFacilitadorController.getAll);
router.get('/:id', CoFacilitadorController.getById);
router.post('/', CoFacilitadorController.create);
router.delete('/:id/', CoFacilitadorController.deleteById);
router.patch('/:id', CoFacilitadorController.update);

module.exports = router;