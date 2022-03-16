const { OAuth2Client } = require('google-auth-library');
const usersService = require('./users.service');
const ApiError = require('../../utils/api-error');
const oAuth2Client = new OAuth2Client(process.env.GoogleClientId);

exports.loginWithUsername = async (username, password) => {
  const user = await usersService.getByUsername(username);

  if (!user) {
    throw new ApiError(401, 'Incorrect username.');
  }

  if (!(await user.isPasswordMatch(password))) {
    throw new ApiError(401, 'Incorrect password.');
  }

  return user;
};

exports.loginWithGoogle = async (idToken) => {
  try {
    const ticket = await oAuth2Client.verifyIdToken({
      idToken,
      audience: process.env.GoogleClientId,
    });

    const { email_verified, email, name, picture } = ticket.payload;

    if (!email_verified) {
      throw new ApiError(400, 'Token is not valid.');
    }

    return await usersService.upsertByEmail(email, {
      email,
      name,
      avatar: picture,
    });
  } catch (err) {
    console.log(err);
    throw new ApiError(400, 'Token is not valid.');
  }
};
