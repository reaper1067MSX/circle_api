var express = require('express');
var router = express.Router();
var BeneficiarioController = require('../controllers/BeneficiarioController');

router.get('/', BeneficiarioController.getAll);
router.get('/:id', BeneficiarioController.getById);
router.post('/', BeneficiarioController.create);
router.patch('/:id', BeneficiarioController.update);
router.delete('/:id', BeneficiarioController.deleteByID);
module.exports = router;