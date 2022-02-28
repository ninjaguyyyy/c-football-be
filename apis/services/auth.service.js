const { OAuth2Client } = require('google-auth-library');
const tokenService = require('./token.service');
const usersService = require('./users.service');
const oAuth2Client = new OAuth2Client(process.env.GoogleClientId);

exports.loginWithGoogle = async (idToken) => {
  try {
    const ticket = await oAuth2Client.verifyIdToken({
      idToken,
      audience: process.env.GoogleClientId,
    });

    const { email_verified, email, name, picture } = ticket.payload;

    if (!email_verified) {
      return {
        isSuccess: false,
        message: 'Id Token is not valid',
      };
    }

    const user = await usersService.upsertByEmail(email, {
      email,
      name,
      avatar: picture,
    });

    const tokens = await tokenService.generateAuthTokens(user);
    return {
      isSuccess: true,
      tokens,
    };
  } catch (err) {
    console.log(err);
    return {
      isSuccess: false,
      message: err,
    };
  }
};
