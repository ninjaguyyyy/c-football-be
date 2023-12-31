const mongoose = require('mongoose');
const { toJSON } = require('./plugins');
const ObjectId = mongoose.Types.ObjectId;
const DOCUMENT_NAME = 'user-token';

const userTokenSchema = mongoose.Schema(
  {
    user: {
      type: ObjectId,
      required: true,
      ref: 'user',
    },
    refreshToken: {
      type: Array,
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

messageSchema.plugin(toJSON);

module.exports = mongoose.model(DOCUMENT_NAME, userTokenSchema);
