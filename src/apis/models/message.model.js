const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;

const messageSchema = mongoose.Schema(
  {
    conversation: {
      type: ObjectId,
      required: true,
      ref: 'Conversation',
    },
    sender: {
      type: ObjectId,
      required: true,
      ref: 'User',
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

module.exports = mongoose.model('message', messageSchema);
