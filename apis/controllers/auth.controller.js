const { authService, usersService } = require('../services');

exports.register = async (req, res) => {
  const user = await usersService.createUser(req.body);

  res.status(201).json({ user });
};

exports.loginWithGoogle = async (req, res) => {
  const { isSuccess, tokens, message } = await authService.loginWithGoogle(req.body.idToken);

  isSuccess && res.status(200).json({ tokens });
  !isSuccess && res.status(401).json({ message });
};
