const { Message } = require('../models');

exports.createMessage = async (message) => {
  const createdMessage = await Message.create(message);
  return createdMessage.populate('sender');
};

exports.queryMessages = async (filter, options) => {
  return Message.paginate(filter, { ...options, populate: 'sender,conversation' });
};

exports.getAllByFilter = async (filter) => {
  return Message.find({ filter }).populate('conversation').populate('sender').exec();
};
