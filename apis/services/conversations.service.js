const Conversation = require('../models/conversation.model');

module.exports.createConversation = async (conversation) => {
  console.log(
    '🚀 ~ file: conversations.service.js ~ line 4 ~ module.exports.createConversation= ~ conversation',
    conversation
  );
  // no validate
  return Conversation.create(conversation);
};
