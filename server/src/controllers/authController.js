const { createToken } = require("../services");
const { User } = require("../models");
const { MAX_DEVISE } = require("../constants");
const { BadRequestError, LogInError } = require("../errors");
module.exports.singnUp = async (req, res, next) => {
  try {
    const { body } = req;
    const user = await User.create(body);
    if (user) {
      const pairTokens = await createToken(user);
      await user.createRefreshToken({token: pairTokens.refresh});
      user.password = undefined;
      return res.status(200).send({data: {user, pairTokens}});
    }
    next(new BadRequestError()); //error
  } catch (error) {
    next(error);
  }
};

module.exports.singnIn = async (req, res, next) => {
  try {
    const {
      body: { email, password },
    } = req;
    const user = await User.findOne({ where: { email } });
    if (user && (await user.comparePassword(password))) {

      const pairTokens = await createToken(user);
      if(await user.countRefreshTokens >= MAX_DEVISE) {
        const [oldestToken] = await user.getRefreshTokens({
          order: [['updateAt', 'ASC']],
        })
        await oldestToken.update({ token: pairTokens.refresh });
      } else {
        await user.createRefreshToken({token: pairTokens.refresh});
      }
      user.password = undefined;
      return res.status(200).send({data: {user, pairTokens}});
    }
    next(new LogInError());
  } catch (error) {
    next(error);
  }
};

module.exports.refresh = async (req, res, next) => {
  try {
  } catch (error) {
    next(error);
  }
};
