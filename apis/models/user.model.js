const mongoose = require('mongoose');

const userSchema = mongoose.Schema(
  {
    avatar: String,
    username: String,
    password: {
      type: String,
      required: false,
    },
    name: {
      type: String,
      required: false,
      default() {
        return this.username;
      },
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

userSchema.statics.isUsernameTaken = async function (username) {
  const user = await this.findOne({ username });
  return !!user;
};

module.exports = mongoose.model('user', userSchema);
