const jwt = require('jsonwebtoken');
const CONSTANTS = require('../constants');
const TokenError = require('../errors/TokenError');
const userQueries =require('../controllers/queries/userQueries');
const LogInError = require('../errors/LogInError');

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
    const foundUser = await userQueries.findUser({ id: tokenData.userId });
    foundUser.password = undefined;
    return res.status(200).send({data: foundUser});
  } catch (err) {
    next(new TokenError());
  }
};


