const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;
const DOCUMENT_NAME = 'team';

const teamSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    members: [
      {
        type: ObjectId,
        required: true,
        ref: 'User',
      },
    ],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model(DOCUMENT_NAME, teamSchema);
