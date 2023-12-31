const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const { toJSON, paginate } = require('./plugins');
const ObjectId = mongoose.Types.ObjectId;
const DOCUMENT_NAME = 'user';

const userSchema = mongoose.Schema(
  {
    avatar: String,
    username: String,
    password: {
      type: String,
      required: false,
      private: true,
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
    facebookId: {
      type: String,
      require: false,
      private: true,
    },
    team: [
      {
        type: ObjectId,
        ref: 'Team',
      },
    ],
  },
  {
    timestamps: true,
  }
);

userSchema.plugin(toJSON);
userSchema.plugin(paginate);

userSchema.statics.isUsernameTaken = async function (username) {
  const user = await this.findOne({ username });
  return !!user;
};

userSchema.methods.isPasswordMatch = async function (password) {
  const user = this;
  return bcrypt.compare(password, user.password);
};

userSchema.pre('save', async function (next) {
  const user = this;
  if (user.isModified('password')) {
    user.password = await bcrypt.hash(user.password, 10);
  }
  next();
});

module.exports = mongoose.model(DOCUMENT_NAME, userSchema);
