var express = require('express');
var router = express.Router();
var DetalleClubController = require('../controllers/DetalleClubController');

router.get('/', DetalleClubController.getAll);
//router.get('/:id', DetalleClubController.getById);
router.post('/', DetalleClubController.createAsignacion);
router.delete('/:id/:ps/:sc/:di', DetalleClubController.deleteByID);
router.patch('/:id', DetalleClubController.update)

router.patch('/desvinculacion/:id', DetalleClubController.desvinculacion);
module.exports = router;