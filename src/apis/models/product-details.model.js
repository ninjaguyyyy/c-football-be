﻿const mongoose = require('mongoose');
const { Schema, ObjectId } = mongoose;

const clothingSchema = new Schema(
  {
    brand: { type: String, required: true },
    sizes: String,
    material: String,
  },
  { timestamps: true }
);

const electronicsSchema = new Schema(
  {
    manufacturer: { type: String, required: true },
    model: String,
    color: String,
  },
  { timestamps: true }
);

const Clothing = mongoose.model('Clothing', clothingSchema);
const Electronics = mongoose.model('Electronics', electronicsSchema);

module.exports = {
  Clothing,
  Electronics,
};
