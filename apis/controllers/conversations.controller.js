const pick = require('../../utils/pick-keys');
const { conversationsService } = require('../services');

exports.create = async (req, res) => {
  const conversation = await conversationsService.createConversation(req.body);
  res.status(201).json({ conversation });
};

exports.getByUser = async (req, res) => {
  const filter = {};
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const result = await conversationsService.queryConversations(filter, options);
  res.status(200).json(result);
};
