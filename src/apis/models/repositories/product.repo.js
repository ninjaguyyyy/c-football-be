const { Product } = require('../index');

exports.updateProduct = async ({ id, payload, model }) => {
  const res = await model.findByIdAndUpdate(id, payload, { new: true });
  return res;
};

exports.getProductById = async (id) => {
  return Product.findById(id);
};

exports.checkExistingProducts = async (products) => {
  const checkExistingProductPromises = products.map(async (product) => {
    const foundProduct = await getProductById(product.productId);
    if (foundProduct) {
      return {
        price: foundProduct.price,
        quantity: product.quantity,
        productId: product.productId,
      };
    }
  });

  return await Promise.all(checkExistingProductPromises);
};
