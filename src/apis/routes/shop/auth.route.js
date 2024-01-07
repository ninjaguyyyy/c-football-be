const express = require('express');
const { authController } = require('../../controllers');

const router = express.Router();

router.post('/register', authController.registerShop);
router.post('/login', authController.loginShop);

module.exports = router;
