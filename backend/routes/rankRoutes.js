const express = require('express');
const rankController = require('../controllers/rankController');
const {checkRole} = require('../middleware/roleMiddleware');

const router = express.Router();

router.get('/', checkRole(['ADMIN', 'USER']), rankController.getRanks);

module.exports = router;