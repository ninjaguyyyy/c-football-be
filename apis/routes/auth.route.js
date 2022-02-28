const express = require('express');
const { authController } = require('../controllers');
const router = express.Router();

router.post('/login/with-google', authController.loginWithGoogle);

module.exports = router;
