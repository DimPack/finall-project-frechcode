const express = require("express");
const validators = require('../middlewares/validators');
const AuthControler = require('../controllers/authController');
const authRouter = express.Router();


authRouter.post("/sing-up", validators.validateRegistrationData, AuthControler.singnUp);
authRouter.post("/sing-in", validators.validateLogin, AuthControler.singnIn);
authRouter.post("/refresh", AuthControler.refresh);

module.exports = authRouter;