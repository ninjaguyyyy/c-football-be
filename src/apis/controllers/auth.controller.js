const { authService, usersService, tokenService, shopService } = require('../services');

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

exports.registerShop = async (req, res) => {
  const shop = await shopService.createShop(req.body);
  res.status(201).json({ shop });
};

exports.loginShop = async (req, res) => {
  const { email, password } = req.body;
  const shop = await authService.loginShop(email, password);
  const tokens = await tokenService.generateAuthTokens(shop);

  res.status(200).json({ shop, tokens });
};
