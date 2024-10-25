const jwt = require('jsonwebtoken');
const CONSTANTS = require('../constants');
const TokenError = require('../errors/TokenError');
const userQueries =require('../controllers/queries/userQueries');
const LogInError = require('../errors/LogInError');
const UserNotFoundError = require('../errors/UserNotFoundError');
const { verifyAccessToken } = require('../services');

module.exports.checkAuth = async (req, res, next) => {

  try {
    const {
      headers: { authorization },
    } = req;
    if (!authorization) {
      return next(new LogInError('need log'));
    }

    const [, accessToken] = authorization.split(" ");
    const tokenData = await verifyAccessToken(accessToken);
    if(!tokenData) {
      return next(new TokenError('access token not verify'));
    }
    const foundUser = await userQueries.findUser({ id: tokenData.userId });
    if(!foundUser) {
      return next(new UserNotFoundError());
    }
    foundUser.password = undefined;
    return res.status(200).send({data: foundUser});
  } catch (err) {
    next(err);
  }
};


