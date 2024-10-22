const { User } = require('../models');

module.exports.singnUp = async (req, res, next) => {
  try {
    const { body } = req;
    const newUser = await User.create(body);
    if(newUser){

    }
    next();//error
  } catch (error) {
    next(error);
  }
};

module.exports.singnIn = async (req, res, next) => {
  try {
    const { body:{ email, password} } = req;
    const user = await User.findOne({ where: { email } });
    if(user){ //compare password

    }
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
