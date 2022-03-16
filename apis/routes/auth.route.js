const express = require('express');
const { authController } = require('../controllers');

const router = express.Router();

router.post('/register', authController.register);
router.post('/login/with-username', authController.loginWithUsername);
router.post('/login/with-google', authController.loginWithGoogle);

module.exports = router;
