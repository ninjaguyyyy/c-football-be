const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const { toJSON } = require('./plugins');

const DOCUMENT_NAME = 'shop';

const shopSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true, trim: true },
    password: {
      type: String,
      required: false,
      private: true,
    },
  },
  {
    timestamps: true,
  }
);

shopSchema.plugin(toJSON);

shopSchema.statics.isEmailTaken = async function (email) {
  const shop = await this.findOne({ email });
  return !!shop;
};

shopSchema.methods.isPasswordMatch = async function (password) {
  const user = this;
  return bcrypt.compare(password, user.password);
};

shopSchema.pre('save', async function (next) {
  const user = this;
  if (user.isModified('password')) {
    user.password = await bcrypt.hash(user.password, 10);
  }
  next();
});

module.exports = mongoose.model(DOCUMENT_NAME, shopSchema);
