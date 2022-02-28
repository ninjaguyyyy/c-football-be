const mongoose = require('mongoose');

const userSchema = mongoose.Schema(
  {
    avatar: String,
    password: {
      type: String,
      required: false,
    },
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: false,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('user', userSchema);
