const { authService } = require('../services');

exports.loginWithGoogle = async (req, res) => {
  const { isSuccess, accessToken, message } = await authService.loginWithGoogle(
    req.body.idToken
  );

  isSuccess && res.status(200).json({ accessToken });
  !isSuccess && res.status(401).json({ message });
};
