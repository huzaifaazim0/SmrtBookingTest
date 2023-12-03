const Joi = require('joi');
const { password, objectId } = require('./custom.validation');

module.exports = {
    // POST /v1/auth/login
    login: {
        body: Joi.object().keys({
            email: Joi.string().email().required(),
            password: Joi.string().required().max(128),
        }),
    },

    // POST /v1/auth/logout
    logout : {
        body: Joi.object().keys({
          refreshToken: Joi.string().required(),
        }),
    },

    // POST /v1/auth/refresh-token
    refreshTokens : {
        body: Joi.object().keys({
          refreshToken: Joi.string().required(),
        }),
    },
};
