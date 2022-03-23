const { authService, usersService, tokenService } = require('../services');

exports.register = async (req, res) => {
  const user = await usersService.createUser(req.body);
  res.status(201).json({ user });
};

exports.loginWithUsername = async (req, res) => {
  const { username, password } = req.body;
  const user = await authService.loginWithUsername(username, password);
  const tokens = await tokenService.generateAuthTokens(user);

  res.status(200).json({ user, tokens });
};

exports.loginWithGoogle = async (req, res) => {
  const user = await authService.loginWithGoogle(req.body.idToken);
  const tokens = await tokenService.generateAuthTokens(user);

  res.status(200).json({ user, tokens });
};

exports.loginWithFacebook = async (req, res) => {
  const user = await authService.loginWithFacebook(req.body.userId, req.body.accessToken);
  const tokens = await tokenService.generateAuthTokens(user);

  res.status(200).json({ user, tokens });
};
