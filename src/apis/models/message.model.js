const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');
const ObjectId = mongoose.Types.ObjectId;
const DOCUMENT_NAME = 'message';

const messageSchema = mongoose.Schema(
  {
    conversation: {
      type: ObjectId,
      required: true,
      ref: 'conversation',
    },
    sender: {
      type: ObjectId,
      required: true,
      ref: 'user',
    },
    text: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

messageSchema.plugin(toJSON);
messageSchema.plugin(paginate);

module.exports = mongoose.model(DOCUMENT_NAME, messageSchema);
