const httpStatus = require('http-status');

const { User } = require('../models');
const ApiError = require('../../utils/api-error');
const CartRepo = require('../models/repositories/cart.repo');

exports.upsertByEmail = async (email, user) => {
  const newUser = User.findOneAndUpdate({ email }, user, { upsert: true, new: true });
  console.log('🚀 ~ exports.upsertByEmail= ~ newUser:', newUser);

  // todo: create default cart if absent

  return newUser;
};

exports.upsertByFacebookId = async (facebookId, user) => {
  const newUser = await User.findOneAndUpdate({ facebookId }, user, { upsert: true, new: true });

  // todo: create default cart if absent

  return newUser;
};

exports.createUser = async (user) => {
  if (await User.isUsernameTaken(user.username)) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Username already taken.');
  }

  const createdUser = await User.create(user);
  await CartRepo.createCart(createdUser.id);

  return createdUser;
};

exports.getByUsername = async (username) => {
  return User.findOne({ username });
};

exports.queryUsers = async (filter = {}, options = {}) => {
  return User.paginate(filter, options);
};
