const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;

const DOCUMENT_NAME = 'shop';

const shopSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    quantity: { type: Number, required: true },
    type: {
      type: String,
      required: true,
      enum: Object.values(ProductTypes),
    },
    shop: { type: ObjectId, required: true, refPath: 'type' },
    productDetail: { type: ObjectId, required: true, refPath: 'type' },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model(DOCUMENT_NAME, shopSchema);
