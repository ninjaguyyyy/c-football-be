const mongoose = require('mongoose');

const DOCUMENT_NAME = 'inventory';
const ObjectId = mongoose.Types.ObjectId;

const inventorySchema = mongoose.Schema(
  {
    product: { type: ObjectId, required: true, ref: 'Product' },
    location: { type: String },
    stock: { type: Number, required: true },
    reservations: { type: Array, default: [] },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model(DOCUMENT_NAME, inventorySchema);
