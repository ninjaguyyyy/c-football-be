const pick = require('../../utils/pick-keys');
const { messagesService } = require('../services');

exports.getByConversation = async (req, res) => {
  const filter = { conversation: req.params.conversationId };
  const options = pick(req.query, ['sortBy', 'limit', 'page']);

  const result = await messagesService.queryMessages(filter, options);
  res.status(200).json(result);
};

exports.createMessage = async (req, res) => {
  const message = await messagesService.createMessage(req.body);
  res.status(201).json({ message });
};
