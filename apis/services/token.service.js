const jwt = require('jsonwebtoken');
const moment = require('moment');
const jwtAccessExpired = 60;

const tokenTypes = {
  ACCESS: 'access',
  REFRESH: 'refresh',
};

exports.generateAuthTokens = async (user) => {
  const accessTokenExpires = moment().add(jwtAccessExpired, 'minutes');
  const accessToken = generateToken(user.id, accessTokenExpires, tokenTypes.ACCESS);

  return {
    access: {
      token: accessToken,
      expires: accessTokenExpires.toDate(),
    },
    refresh: {
      token: 'not yet develop',
      expires: 'not yet develop',
    },
  };
};

const generateToken = (userId, expires, type, secret = process.env.JWT_SECRET_KEY) => {
  const payload = {
    sub: userId,
    iat: moment().unix(),
    exp: expires.unix(),
    type,
  };
  return jwt.sign(payload, secret);
};

exports.tokenTypes = tokenTypes;

exports.verifyToken = (token) => {
  return jwt.verify(token, process.env.JWT_SECRET_KEY);
};
