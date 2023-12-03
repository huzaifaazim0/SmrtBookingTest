const httpStatus = require('http-status');
const moment = require('moment-timezone');
const { jwtExpirationInterval } = require('../../config/vars');
const catchAsync = require('../utils/catchAsync');
const { authService, userService, tokenService, } = require('../services');


/**
 * Returns a formated object with tokens
 * @private
 */
function generateTokenResponse(user, accessToken) {
    const tokenType = 'Bearer';
    const refreshToken = tokenService.generateToken(user).token;
    const expiresIn = moment().add(jwtExpirationInterval, 'minutes');
    return {
        tokenType,
        accessToken,
        refreshToken,
        expiresIn,
    };
}


/**
 * Returns jwt token if valid username and password is provided
 * @public
 */
exports.login = catchAsync(async (req, res) => {
    console.log("in login")
    const { email, password } = req.body;
    const user = await authService.loginUserWithEmailAndPassword(email, password);
    const tokens = await tokenService.generateAuthTokens(user);
    console.log("here")
    res.send({ user, tokens });
});

/**
 * Returns a new jwt when given a valid refresh token
 * @public
 */
exports.refreshTokens = catchAsync(async (req, res) => {
    const tokens = await authService.refreshAuth(req.body.refreshToken);
    res.send({ ...tokens });
});

/**
 * Returns an empty response upon success
 * @public
 */
exports.logout = catchAsync(async (req, res) => {
    await authService.logout(req.body.refreshToken);
    res.status(httpStatus.NO_CONTENT).send();
});
