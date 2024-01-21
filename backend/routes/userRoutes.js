const express = require('express');
const userController = require('../controllers/userController');
const {checkRole} = require('../middleware/roleMiddleware');

const router = express.Router();

router.post('/', checkRole(['ADMIN']), userController.createUser);

module.exports = router;