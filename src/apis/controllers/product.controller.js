const { productService } = require('../services');

exports.createProduct = async (req, res) => {
  const productType = req.body.product_type;
  const payload = { ...req.body, shop: req.user.sub };

  const result = await productService.createProduct(productType, payload);
  res.status(201).json(result);
};

exports.getProductsForShop = async (req, res) => {
  const filters = { shop: req.user.sub };
  const products = await productService.getProducts(filters);

  res.status(200).json(products);
};

exports.updateProduct = async (req, res) => {
  const shop = req.user.sub;
  const id = req.params.id;
  const payload = req.body;
  const productType = req.body.product_type;

  const products = await productService.updateProduct({ shop, id, payload, type: productType });

  res.status(200).json(products);
};

exports.getProductsForUser = async (req, res) => {
  const q = req.query.q;
  const sortBy = req.query.sortBy;

  const filters = {};
  const options = {};

  if (q) {
    filters = {
      $text: { $search: new RegExp(q) },
      isPublic: true,
    };
  }

  if (sortBy) {
    options.sortBy = sortBy;
  }

  options.select = ['name', 'price'];

  const products = await productService.getProducts(filters, options);

  res.status(200).json(products);
};

exports.getProduct = async (req, res) => {
  const id = req.params.id;
  const product = await productService.getProductById(id);

  res.status(200).json(product);
};
