const mongoose = require('mongoose');

const userSchema = mongoose.Schema(
  {
    avatar: String,
    password: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('user', userSchema);
