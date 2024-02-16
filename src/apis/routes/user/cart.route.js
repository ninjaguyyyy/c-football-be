const express = require('express');
const { cartController } = require('../../controllers');
const router = express.Router();

router.get('/', cartController.getCart);
router.post('/', cartController.addToCart);
router.patch('/', cartController.updateQuantity);
router.delete('/', cartController.deleteProductFromCart);

module.exports = router;
