const mongoose = require('mongoose');
const { DiscountTypes, DiscountAppliesToTypes } = require('../../constants/enum');

const DOCUMENT_NAME = 'discount';
const ObjectId = mongoose.Types.ObjectId;

const discountSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    type: { type: String, required: true, enum: Object.values(DiscountTypes) },
    value: { type: Number, required: true },
    code: { type: String, required: true },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    quota: { type: Number, required: true },
    usedQuota: { type: Number, required: true },
    perUserQuota: { type: Number, required: true },
    minOrderValue: { type: Number, required: true },
    shop: { type: ObjectId, required: true, ref: 'Shop' },
    active: { type: Boolean, default: true },
    appliesTo: { type: String, required: true, enum: Object.values(DiscountAppliesToTypes) },
    appliesToSpecificProductIds: { type: Array, default: [] },
    used_by_users: { type: Array, default: [] },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model(DOCUMENT_NAME, discountSchema);
