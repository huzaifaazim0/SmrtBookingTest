const mongoose = require('mongoose');
const { toJSON } = require('./plugins');
const { tokenTypes } = require('../../config/tokens');

/**
 * @api {object} Token Token
 * @apiDescription Token model representing a token entity.
 * @apiName Token
 * @apiGroup Models
 * @apiVersion 1.0.0
 * @apiPermission public
 *
 * @apiBody {String} token Token.
 * @apiBody {String} user User
 * @apiBody {String} type Token Type
 * @apiBody {Date} expires Token Expiry
 * @apiBody {Boolean} blacklisted if token is blacklisted or not
 */

const tokenSchema = mongoose.Schema(
  {
    token: {
      type: String,
      required: true,
      index: true,
    },
    user: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'User',
      required: true,
    },
    type: {
      type: String,
      enum: [tokenTypes.REFRESH, tokenTypes.RESET_PASSWORD, tokenTypes.VERIFY_EMAIL],
      required: true,
    },
    expires: {
      type: Date,
      required: true,
    },
    blacklisted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
tokenSchema.plugin(toJSON);

/**
 * @typedef Token
 */
const Token = mongoose.model('Token', tokenSchema);

module.exports = Token;