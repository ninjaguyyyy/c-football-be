const { productService } = require('../services');

exports.createProduct = async (req, res) => {
  const productType = req.body.product_type;
  const payload = { ...req.body, shop: req.user.sub };

  const result = await productService.createProduct(productType, payload);
  res.status(201).json(result);
};

exports.getProducts = async (req, res) => {
  const filters = { shop: req.user.sub };
  const products = await productService.getProducts(filters);

  res.status(200).json(products);
};

exports.updateProduct = async (req, res) => {
  const shop = req.user.sub;
  const id = req.params.id;
  const payload = req.body;

  const products = await productService.updateProduct({ shop, id, payload});

  res.status(200).json(products);
};
