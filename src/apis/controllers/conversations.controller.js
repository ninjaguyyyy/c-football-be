const pick = require('../../utils/pick-keys');
const { conversationsService, messagesService } = require('../services');

exports.create = async (req, res) => {
  const conversation = await conversationsService.createConversation(req.body);
  res.status(201).json({ conversation });
};

exports.getByCurrentUser = async (req, res) => {
  const filter = {
    members: req.user.sub,
  };

  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const result = await conversationsService.queryConversations(filter, options);
  res.status(200).json(result);
};

exports.getByMembers = async (req, res) => {
  const conversation = await conversationsService.findByMembers(req.query.members);
  res.status(200).json({ conversation });
};
