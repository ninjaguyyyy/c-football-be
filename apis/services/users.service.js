const User = require('../models/user.model');

exports.upsertByEmail = (email, user) => {
  return User.findOneAndUpdate({ email }, user, { upsert: true, new: true });
};
