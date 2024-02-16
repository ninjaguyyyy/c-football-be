const CartRepo = require('../models/repositories/cart.repo');

class CartService {
  static async addToCart(userId, product) {
    const cart = await CartRepo.findByUserId(userId);

    if (!cart) {
      return await CartRepo.createCart(userId, product);
    }

    if (!cart.products.length) {
      cart.products = [product];
      return await cart.save();
    }

    return await CartRepo.updateQuantity(userId, product);
  }

  // payload:
  // {
  //   shopOrderIds: [
  //     {
  //       shopId,
  //       products: [
  //         {
  //           quantity,
  //           price,
  //           shopId,
  //           oldQuantity,
  //           productId
  //         }
  //       ]
  //     }
  //   ]
  // }
  static async updateCart(userId, payload) {
    const { productId, quantity, oldQuantity } = payload.shopOrderIds[0]?.products[0];

    // todo: check valid product id
    // todo: check valid shop id has this product id

    if (quantity === 0) {
      // todo: delete product
    }

    return await CartRepo.updateQuantity(userId, {
      productId,
      quantity: quantity - oldQuantity,
    });
  }

  static async getCart(userId) {
    return CartRepo.findByUserId(userId);
  }

  static async deleteCartProduct(userId, productId) {
    return CartRepo.deleteProductFromCart(userId, productId);
  }
}

module.exports = CartService;
