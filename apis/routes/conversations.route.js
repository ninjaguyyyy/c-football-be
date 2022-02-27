const express = require('express');
const { conversationsController } = require('../controllers');

const router = express.Router();

router.post('/', conversationsController.create);

module.exports = router;
