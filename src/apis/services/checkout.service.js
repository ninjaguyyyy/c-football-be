const CartRepo = require('../models/repositories/cart.repo');
const { checkExistingProducts } = require('../models/repositories/product.repo');

class CheckoutService {
  /**
   *
   * @param {*} param0 :
   * {
   *    cartId,
   *    userId,
   *    shopOrderIds: [
   *      {
   *        shopId,
   *        products: [{
   *          price,
   *          quantity,
   *          productId
   *        }],
   *        discount: []
   *      }
   *    ]
   * }
   * @returns
   */
  static async checkoutReview({ cartId, userId, shopOrderIds }) {
    // todo: check cartId existing

    const checkoutOrder = {
      totalPrice: 0,
      feeShip: 0,
      totalDiscount: 0,
      totalCheckout: 0,
    };

    const newShopOrderIds = [];

    for (let i = 0; i < array.length; i++) {
      const { shopId, discounts = [], products = [] } = shopOrderIds[i];
      const existingProducts = await checkExistingProducts(products);
      console.log('🚀 ~ CheckoutService ~ checkoutReview ~ existingProducts:', existingProducts);
      if (!existingProducts[0]) throw new ApiError(httpStatus.BAD_REQUEST, 'Order Wrong!');

      const checkoutPrice = existingProducts.reduce((acc, product) => {
        return acc + (product.quantity + product.price);
      }, 0);

      checkoutOrder.totalPrice += checkoutPrice;
    }
  }
}

module.exports = CheckoutService;
