const { discountService } = require('../services');

exports.createDiscount = async (req, res) => {
  const result = await discountService.createDiscount({ ...req.body, shopId: req.user.sub });
  res.status(201).json(result);
};

exports.getDiscounts = async (req, res) => {
  const result = await discountService.getDiscountsByShop({ shopId: req.user.sub });
  res.status(200).json(result);
};

exports.getDiscountAmount = async (req, res) => {
  const result = await discountService.calcDiscountAmount({ ...req.body });
  res.status(200).json(result);
};
