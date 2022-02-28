const { conversationsService } = require('../services');

exports.create = async (req, res) => {
  const conversation = await conversationsService.createConversation(req.body);
  res.status(201).send({ conversation });
};
