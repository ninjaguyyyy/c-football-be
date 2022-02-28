const { authService } = require('../services');

exports.loginWithGoogle = async (req, res) => {
  const { isSuccess, tokens, message } = await authService.loginWithGoogle(req.body.idToken);

  isSuccess && res.status(200).json({ tokens });
  !isSuccess && res.status(401).json({ message });
};
