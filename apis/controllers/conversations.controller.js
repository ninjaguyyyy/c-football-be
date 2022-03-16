const pick = require('../../utils/pick-keys');
const { conversationsService } = require('../services');

exports.create = async (req, res) => {
  const conversation = await conversationsService.createConversation(req.body);
  res.status(201).send({ conversation });
};

exports.getByUser = async (req, res) => {
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  // const result = await userService.queryUsers(filter, options);
  const result = { a: 10 };
  res.status(200).json(result);
};
