const httpStatus = require('http-status');
const passport = require('passport');
const ApiError = require('../errors/api-error');
const Joi = require('joi');
const pick = require('../utils/pick');


const verifyCallback = (req, resolve, reject, requiredRights) => async (err, user, info) => {
    // console.log("4")
    if (err || info || !user) {
        // console.log("5")
      return reject(new ApiError({status : httpStatus.UNAUTHORIZED, message : 'Please authenticate'}));
    }
    req.user = user;
  
    // console.log("12")
    resolve();
};

  
exports.authorize = (...requiredRights) => async (req, res, next) => {
    // console.log("0")
    return new Promise((resolve, reject) => {
        // console.log("1")
      passport.authenticate('jwt', { session: false }, verifyCallback(req, resolve, reject))(req, res, next);
    })
    .then(() => {next()})
    .catch((err) => {next(err)});
};



exports.oAuth = (service) => passport.authenticate(service, { session: false });
