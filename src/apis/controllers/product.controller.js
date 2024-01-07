const { productService } = require('../services');

exports.createProduct = async (req, res) => {
  const productType = req.body.product_type;
  const payload = { ...req.body, shop: req.user.sub };

  const result = await productService.createProduct(productType, payload);
  res.status(201).json(result);
};

exports.createProduct = async (req, res) => {
  const productType = req.body.product_type;
  const payload = { ...req.body, shop: req.user.sub };

  const result = await productService.createProduct(productType, payload);
  res.status(201).json(result);
};

getProducts;
