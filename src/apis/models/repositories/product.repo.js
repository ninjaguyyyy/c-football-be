const { Product } = require('../index');

exports.updateProduct = async ({ id, payload, model }) => {
  const res = await model.findByIdAndUpdate(id, payload, { new: true });
  return res;
};

exports.getProductById = async (id) => {
  return Product.findById(id);
};
