const Joi = require('joi');
const httpStatus = require('http-status');
const ApiError = require('../errors/api-error');
const pick = require('../utils/pick');

exports.validate = (schema) => (req, res, next) => {
  const validSchema = pick(schema, ['params', 'query', 'body']);
  const object = pick(req, Object.keys(validSchema));
  const { value, error } = Joi.compile(validSchema)
    .prefs({ errors: { label: 'key' }, abortEarly: false })
    .validate(object);

  if (error) {
    const apiError = new ApiError({
      status: httpStatus.BAD_REQUEST,
      message: error.message,
      errors: error,
      stack: error.stack || error,
    });
    return next(apiError);
  }
  Object.assign(req, value);
  return next();
};
