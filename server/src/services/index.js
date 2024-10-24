const { promisify } = require("util");
const jwt = require("jsonwebtoken");

const {
  ACCESS_JWT_SECRET,
  ACCESS_TOKEN_TIME,
  REFRESH_JWT_SECRET,
  REFRESH_TOKEN_TIME,
} = require("../constants");

const signJWTPromise = promisify(jwt.sign());
const verifyJWTPromise = promisify(jwt.verify);
/**
 * 
 * @param {object} payload - instance User
 * @param {string} secretKey 
 * @param {string | number} timeExp 

 * @returns {Promise}
 */

const createToken = (payload, { secretKey, timeExp }) => {
  return signJWTPromise(
    {
      userID: payload.id,
      email: payload.email,
      role: payload.role,
    },

    secretKey,
    {
      expiresIn: timeExp,
    }
  );
};

/**
 *
 * @param {object} payload
 * @returns {Promise}
 */
const createPairTokens = async (payload) => ({
  access: await createToken(payload, {
    secretKey: ACCESS_JWT_SECRET,
    timeExp: ACCESS_TOKEN_TIME,
  }),
  refresh: await createToken(payload, {
    secretKey: REFRESH_JWT_SECRET,
    timeExp: REFRESH_TOKEN_TIME,
  }),
});
