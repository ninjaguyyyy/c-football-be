const httpStatus = require('http-status');

const { Shop } = require('../models');
const ApiError = require('../../utils/api-error');

exports.createShop = async (shop) => {
  if (await Shop.isEmailTaken(shop.email)) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Email already taken.');
  }
  return Shop.create(shop);
};

exports.getByEmail = async (email) => {
  return Shop.findOne({ email });
};
