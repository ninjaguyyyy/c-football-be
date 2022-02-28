const Conversation = require('../models/conversation.model');

module.exports.createConversation = async (conversation) => {
  // no validate
  return Conversation.create(conversation);
};
