const httpStatus = require('http-status');
const passport = require('passport');
const ApiError = require('../errors/api-error');
const Joi = require('joi');
const pick = require('../utils/pick');


const verifyCallback = (req, resolve, reject, requiredRights) => async (err, user, info) => {
   
    if (err || info || !user) {
       
      return reject(new ApiError({status : httpStatus.UNAUTHORIZED, message : 'Please authenticate'}));
    }
    req.user = user;
  
    
    resolve();
};

  
exports.authorize = (...requiredRights) => async (req, res, next) => {
    
    return new Promise((resolve, reject) => {
        
      passport.authenticate('jwt', { session: false }, verifyCallback(req, resolve, reject))(req, res, next);
    })
    .then(() => {next()})
    .catch((err) => {next(err)});
};



exports.oAuth = (service) => passport.authenticate(service, { session: false });
