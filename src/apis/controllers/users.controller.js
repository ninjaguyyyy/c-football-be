const { usersService } = require('../services');

exports.getAll = async (req, res) => {
  const result = await usersService.queryUsers();
  res.status(200).json(result);
};
