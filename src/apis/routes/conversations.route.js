const express = require('express');
const { conversationsController } = require('../controllers');

const router = express.Router();

router.post('/', conversationsController.create);
router.get('/me', conversationsController.getByCurrentUser);

module.exports = router;
