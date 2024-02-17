const { Discount } = require('..');

class DiscountRepo {
  static async findByCode({ code, shopId }) {
    return Discount.findOne({ code, shop: shopId }).lean();
  }

  static async create(data) {
    return Discount.create(data);
  }

  static async pullUserFromDiscountUsedUsers({ discountId, userId }) {
    return Discount.findByIdAndUpdate(discountId, {
      $pull: {
        used_by_users: userId,
      },
      $inc: {
        usedQuota: -1,
      },
    });
  }
}

module.exports = DiscountRepo;
