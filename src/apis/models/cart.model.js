const mongoose = require('mongoose');
const { DiscountTypes, CartStatusTypes } = require('../../constants/enum');

const DOCUMENT_NAME = 'cart';
const ObjectId = mongoose.Types.ObjectId;

const cartSchema = mongoose.Schema(
  {
    status: {
      type: String,
      required: true,
      enum: Object.values(CartStatusTypes),
      default: CartStatusTypes.ACTIVE,
    },
    products: { type: Array, required: true, default: [] },
    countProducts: { type: Number, default: 0 },
    user: { type: Number, required: true }, // todo: change to ObjectId
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model(DOCUMENT_NAME, cartSchema);
