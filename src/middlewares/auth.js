const { tokenService } = require('../apis/services');
const ApiError = require('../utils/api-error');

exports.authUser = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  console.log('🚀 ~ file: auth.js:7 ~ token:', token);

  if (!token) {
    throw new ApiError(401, 'You need to sign in.');
  }

  try {
    const decoded = tokenService.verifyToken(token);
    console.log('🚀 ~ file: auth.js:15 ~ decoded:', decoded);
    req.user = decoded;
    next();
  } catch (err) {
    console.log(err);
    throw new ApiError(401, err.message);
  }
};

exports.authRole = (role) => {
  return (req, res, next) => {
    if (req.user.role !== role) {
      throw new ApiError(401, 'Your role is not permission.');
    }

    next();
  };
};
