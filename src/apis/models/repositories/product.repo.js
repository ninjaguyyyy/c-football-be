const { Product } = require('../index');

exports.updateProduct = async ({ id, payload }) => {
  const res = await Product.findByIdAndUpdate(id, payload, { new: true });
  console.log('🚀 ~ file: product.repo.js:5 ~ exports.updateProduct= ~ res:', res);
  return res;
};

exports.getProductById = async (id) => {
  return Product.findById(id);
};
