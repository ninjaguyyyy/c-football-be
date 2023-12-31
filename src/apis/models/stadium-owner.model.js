const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;
const DOCUMENT_NAME = 'stadium-owner';

const stadiumOwnerSchema = mongoose.Schema(
  {
    email: {
      type: String,
      unique: true,
    },
    phone: {
      type: String,
      unique: true,
    },
    password: {
      type: String,
      private: true,
    },
    name: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model(DOCUMENT_NAME, stadiumOwnerSchema);
