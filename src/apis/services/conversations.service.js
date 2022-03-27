const Conversation = require('../models/conversation.model');

exports.createConversation = async (conversation) => {
  // no validate
  return Conversation.create(conversation);
};

exports.queryConversations = async (filter, options) => {
  return Conversation.paginate(filter, options);
};
