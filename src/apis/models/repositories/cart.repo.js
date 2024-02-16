const Cart = require('../cart.model');

class CartRepo {
  static async createCart(userId, product) {
    const query = { user: userId };
    const updateOrInsert = {
      $addToSet: {
        products: product,
      },
    };
    const options = { upsert: true, new: true };

    return Cart.findOneAndUpdate(query, updateOrInsert, options);
  }

  static async updateQuantity(userId, product) {
    console.log('🚀 ~ CartRepo ~ updateQuantity ~ product:', product);
    const { productId, quantity } = product;

    const query = { user: userId, 'products.productId': productId };
    const updateSet = {
      $inc: {
        'products.$.quantity': quantity,
      },
    };
    const options = {
      new: true,
    };

    return Cart.findOneAndUpdate(query, updateSet, options);
  }

  static async deleteProductFromCart(userId, productId) {
    const query = { user: userId };
    const updateSet = {
      $pull: {
        products: {
          productId,
        },
      },
    };

    return Cart.updateOne(query, updateSet);
  }

  static async findByUserId(userId) {
    return Cart.findOne({ user: userId });
  }
}

module.exports = CartRepo;
