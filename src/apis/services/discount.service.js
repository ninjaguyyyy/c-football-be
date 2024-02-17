const httpStatus = require('http-status');

const DiscountRepo = require('../models/repositories/discount.repo');
const { DiscountAppliesToTypes, DiscountTypes } = require('../../constants/enum');

class DiscountService {
  static async createDiscount(payload) {
    const {
      code,
      startDate,
      endDate,
      active,
      shopId,
      minOrderValue,
      appliesToSpecificProductIds,
      appliesTo,
      name,
      description,
      type,
      value,
      quota,
      usedQuota,
      perUserQuota,
    } = payload;
    // todo: check valid discount date start -> date end

    const discount = await DiscountRepo.findByCode(code, shopId);

    if (discount && discount.active)
      throw new ApiError(httpStatus.BAD_REQUEST, 'Discount existing!');

    const newDiscount = await DiscountRepo.create({
      code,
      startDate,
      endDate,
      active,
      shop: shopId,
      minOrderValue,
      appliesToSpecificProductIds,
      appliesTo,
      name,
      description,
      type,
      value,
      quota,
      usedQuota,
      perUserQuota,
    });

    return newDiscount;
  }

  static async updateDiscount(payload) {
    // todo: ..
  }

  /**
   * Get products can apply discount code
   * @param {*} param0
   */
  static async getCanApplyDiscountProducts({ code, shopId, userId, limit, page }) {
    const discount = await DiscountRepo.findByCode(code, shopId);

    if (!discount || !discount.active)
      throw new ApiError(httpStatus.NOT_FOUND, 'Discount not found!');

    let products = [];
    const { appliesTo, appliesToSpecificProductIds } = discount;
    if (appliesTo === DiscountAppliesToTypes.ALL) {
      // todo: get all products
    }

    if (appliesTo === DiscountAppliesToTypes.SPECIFIC) {
      // todo: get all products have id in appliesToSpecificProductIds
    }

    return products;
  }

  /**
   * Get all discount of a shop
   * @param {*} param0
   */
  static async getDiscountsByShop({ shopId }) {
    // todo: query ...
  }

  /*
  products = [
    {
      productId,
      shopId,
      quantity,
      name,
      price
    }
  ]
  */
  static async calcDiscountAmount({ codeId, userId, shopId, products }) {
    const discount = await DiscountRepo.findByCode(codeId, shopId);

    if (!discount || !discount.active)
      throw new ApiError(httpStatus.NOT_FOUND, 'Discount not found!');

    const { active, quota, minOrderValue, used_by_users, type, value } = discount;
    // todo: check discount quota
    // todo: check discount expire with start date and end date

    let totalOrder = 0;
    if (minOrderValue > 0) {
      totalOrder = products.reduce((acc, product) => {
        return acc + product.quantity * product.price;
      }, 0);

      if (totalOrder < minOrderValue)
        throw new ApiError(
          httpStatus.NOT_FOUND,
          'Total order amount is not valid to apply this discount'
        );
    }

    if (perUserQuota > 0) {
      const usedUser = used_by_users.find((user) => user.userId === userId);
      if (usedUser) {
        // ...
      }
    }

    const amount = type === DiscountTypes.FIXED_AMOUNT ? value : totalOrder * (value / 100);

    return {
      totalOrder,
      discount: amount,
      totalPrice: totalOrder - amount,
    };
  }

  static async cancelDiscount({ codeId, shopId, userId }) {
    const discount = await DiscountRepo.findByCode(codeId, shopId);

    if (!discount || !discount.active)
      throw new ApiError(httpStatus.NOT_FOUND, 'Discount not found!');

    const result = await DiscountRepo.pullUserFromDiscountUsedUsers({
      discountId: discountId._id,
      userId,
    });

    return result;
  }

  static async deleteDiscount({ shopId, code }) {
    // todo: ..
  }
}

module.exports = DiscountService;
