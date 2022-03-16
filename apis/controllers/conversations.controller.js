const pick = require('../../utils/pick-keys');
const { Conversation } = require('../models');
const ObjectId = require('mongoose').Types.ObjectId;
const { conversationsService } = require('../services');

exports.create = async (req, res) => {
  req.body.members.push(req.user.sub);
  const conversation = await conversationsService.createConversation(req.body);
  res.status(201).json({ conversation });
};

exports.getByCurrentUser = async (req, res) => {
  console.log(req.user.sub);
  const filter = {
    members: { $in: [req.user.sub] },
  };

  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const result = await conversationsService.queryConversations(filter, options);
  res.status(200).json(result);
};
