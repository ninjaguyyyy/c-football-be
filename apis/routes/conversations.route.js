const express = require('express');
const { authUser } = require('../../middlewares/auth');
const { conversationsController } = require('../controllers');

const router = express.Router();

router.post('/', authUser, conversationsController.create);
router.get('/me', authUser, conversationsController.getByCurrentUser);

module.exports = router;
