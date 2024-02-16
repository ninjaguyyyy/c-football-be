const { cartService } = require('../services');

exports.addToCart = async (req, res) => {
  const result = await cartService.addToCart(req.user.sub, req.body);
  res.status(200).json(result);
};

exports.updateQuantity = async (req, res) => {
  const result = await cartService.updateCart(req.user.sub, req.body);
  res.status(200).json(result);
};

exports.deleteProductFromCart = async (req, res) => {
  const productId = req.body.productId;
  const result = await cartService.deleteCartProduct(req.user.sub, productId);
  res.status(200).json(result);
};

exports.getCart = async (req, res) => {
  const result = await cartService.getCart(req.user.sub);
  res.status(200).json(result);
};
