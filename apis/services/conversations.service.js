const Conversation = require('../models/conversation.model');

exports.createConversation = async (conversation) => {
  // no validate
  return Conversation.create(conversation);
};

exports.queryConversations = async (filter, options) => {
  const users = await User.paginate(filter, options);
  return users;
};
