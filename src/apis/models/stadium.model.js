const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;
const DOCUMENT_NAME = 'stadium';

const stadiumSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    owner: {
      type: ObjectId,
      required: true,
      ref: 'stadium-owner',
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model(DOCUMENT_NAME, stadiumSchema);
