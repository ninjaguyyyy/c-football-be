const pick = require('../../utils/pick-keys');
const { messagesService } = require('../services');

exports.getByConversation = async (req, res) => {
  const filter = { conversation: req.params.conversationId };

  // this for paginate feature

  // const options = pick(req.query, ['limit', 'page']);
  // options.sortBy = 'createdAt:desc';
  // const result = await messagesService.queryMessages(filter, options);

  const results = await messagesService.getAllByFilter(filter);
  res.status(200).json({ results });
};

exports.createMessage = async (req, res) => {
  const message = await messagesService.createMessage(req.body);
  res.status(201).json({ message });
};
