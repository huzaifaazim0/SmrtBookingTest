const express = require('express');
// const {validate} = require('express-validation');
const authController = require('../../controllers/auth.controller');
const oAuthLogin = require('../../middlewares/auth').oAuth;
const authValidation = require('../../validations/auth.validation');
const { authorize } = require('../../middlewares/auth');
const {validate} = require('../../middlewares/validate');
const auth = require('../../middlewares/auth').auth;


const router = express.Router();


/**
 * @api {post} v1/auth/login Login
 * @apiDescription Get an accessToken
 * @apiVersion 1.0.0
 * @apiName Login
 * @apiGroup Auth
 * @apiPermission public
 *
 * @apiBody  {String}         email     User's email
 * @apiBody  {String{..128}}  password  User's password
 *
 * @apiSuccess (Created 201) {String} tokens.access.token Authorization Token
 * @apiSuccess (Created 201) {String} tokens.access.expire Access Token's type
 * @apiSuccess (Created 201) {String} tokens.refresh.token Token to get a new accessToken after expiration time
 * @apiSuccess (Created 201) {Number} tokens.refresh.expire Refresh Token's expiration time
 *
 * @apiSuccess (Created 201) {String} user.id User's id
 * @apiSuccess (Created 201) {String} user.name User's name
 * @apiSuccess (Created 201) {String} user.email User's email
 * @apiSuccess (Created 201) {Date} user.createdAt Timestamp
 * @apiSuccess (Created 201) {Date} user.updatedAt Timestamp
 *
 * @apiError (Bad Request 400)  ValidationError  Some parameters may contain invalid values
 * @apiError (Unauthorized 401)  Unauthorized     Incorrect email or password
 */
router.post('/login', validate(authValidation.login), authController.login);

/**
 * @api {post} v1/auth/refresh-token Refresh Token
 * @apiDescription Refresh expired accessToken
 * @apiVersion 1.0.0
 * @apiName RefreshToken
 * @apiGroup Auth
 * @apiPermission public
 *
 * @apiBody  {String}  refreshToken  Refresh token aquired when user logged in
 *
 * @apiSuccess (Created 200) {String} access.token Authorization Token
 * @apiSuccess (Created 200) {String} access.expire Access Token's type
 * @apiSuccess (Created 200) {String} refresh.token Token to get a new accessToken after expiration time
 * @apiSuccess (Created 200) {Number} refresh.expire Refresh Token's expiration time
 *
 * @apiError (Bad Request 400)  ValidationError  Some parameters may contain invalid values
 * @apiError (Unauthorized 401)  Unauthorized     Incorrect email or refreshToken
 */
router.post('/refresh-token', validate(authValidation.refreshTokens), authController.refreshTokens);

/**
 * @api {post} v1/auth/logout Logout
 * @apiDescription Deletes the referesh token
 * @apiVersion 1.0.0
 * @apiName Logout
 * @apiGroup Auth
 * @apiPermission public
 *
 * @apiBody  {String}  refreshToken  Refresh token aquired when user logged in
 *
 * @apiSuccess  (Bad Request 204)  NoContent         No Content
 *
 * @apiError (Bad Request 400)  ValidationError  Some parameters may contain invalid values
 * @apiError (Not Found 404)  RefereshTokenNotFound     Incorrect refreshToken
 * @apiError (Not Found 404)  RefereshTokenBlackListed     RefreshToken Blocked / BlackListed
 */
router.post('/logout', validate(authValidation.logout), authController.logout);

module.exports = router;
