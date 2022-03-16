const httpStatus = require('http-status');

const { User } = require('../models');
const ApiError = require('../../utils/api-error');

exports.upsertByEmail = (email, user) => {
  return User.findOneAndUpdate({ email }, user, { upsert: true, new: true });
};

exports.createUser = async (user) => {
  if (await User.isUsernameTaken(user.username)) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Username already taken.');
  }
  return User.create(user);
};
