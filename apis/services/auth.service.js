const { OAuth2Client } = require('google-auth-library');
const axios = require('axios');
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

exports.loginWithFacebook = async (userId, accessToken) => {
  try {
    const res = await axios.get(`https://graph.facebook.com/v2.11/${userId}/`, {
      params: { access_token: accessToken, fields: 'name,id,picture.type(large),email' },
    });

    const { name, id, picture, email } = res.data;
    return await usersService.upsertByFacebookId(id, {
      name,
      avatar: picture.data.url,
      email,
    });
  } catch (err) {
    console.log(err);
    throw new ApiError(400, 'Token is not valid.');
  }
};
