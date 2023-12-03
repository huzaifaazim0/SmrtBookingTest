const express = require('express');
const userValidation = require('../../validations/user.validation');
const userController = require('../../controllers/user.controller');
const { validate } = require('../../middlewares/validate');

const router = express.Router();

/**
 * @api {post} v1/users/ Create User
 * @apiDescription Creates a new user
 * @apiVersion 1.0.0
 * @apiName CreateUser
 * @apiGroup Users
 * @apiPermission public
 *
 *
 * @apiBody  {String}  name  User's Name
 * @apiBody  {String}  email  User's Email
 * @apiBody  {String}  password  User's Password
 *
 *
 * @apiSuccess (Created 201) {String} user.id User's id
 * @apiSuccess (Created 201) {String} user.name User's name
 * @apiSuccess (Created 201) {String} user.email User's email
 * @apiSuccess (Created 201) {Date} user.createdAt Timestamp
 * @apiSuccess (Created 201) {Date} user.updatedAt Timestamp
 *
 * @apiError (Bad Request 400) ValidationError Some parameters may contain invalid values
 */
router.post('/', validate(userValidation.createUser), userController.createUser);

/**
 * @api {get} v1/users/ Get Users
 * @apiDescription Get all users, search users
 * @apiVersion 1.0.0
 * @apiName GetUsers
 * @apiGroup Users
 * @apiPermission public
 *
* @apiQuery  {String}  name  Search User's Name
* @apiQuery  {String}  email  Search User's Email
* @apiQuery  {Number}  limit  Limit
* @apiQuery  {Number}  page  Page
* @apiQuery  {String}  sortBy  SortBy
 *
 * @apiSuccess (Created 200) {Array} UsersArray Users Array
 *
 * @apiError (Bad Request 400) ValidationError Some parameters may contain invalid values
 */
router.get('/', validate(userValidation.getUsers), userController.getUsers);

/**
 * @api {post} v1/users/:userId Get User
 * @apiDescription get user details
 * @apiVersion 1.0.0
 * @apiName GetUser
 * @apiGroup Users
 * @apiPermission public
 *
 * @apiParam  {String}  userId  User's id
 *
 * @apiSuccess (Created 200) {String} user.id User's id
 * @apiSuccess (Created 200) {String} user.name User's name
 * @apiSuccess (Created 200) {String} user.email User's email
 * @apiSuccess (Created 200) {Date} user.createdAt Timestamp
 * @apiSuccess (Created 200) {Date} user.updatedAt Timestamp
 *
 * @apiError (Bad Request 400) ValidationError Some parameters may contain invalid values
 */
router.get('/:userId', validate(userValidation.getUser), userController.getUser);

/**
 * @api {patch} v1/users/:userId Update User
 * @apiDescription update user
 * @apiVersion 1.0.0
 * @apiName UpdateUser
 * @apiGroup Users
 * @apiPermission public
 *
 *
 * @apiParam  {String}  userId  User's id
 *
 * @apiBody  {String}  name  User's Name
 * @apiBody  {String}  email  User's Email
 * @apiBody  {String}  password  User's Password
 *
 * @apiSuccess (Created 200) {String} OK User Updated
 * @apiSuccess (Created 200) {String} user.id User's id
 * @apiSuccess (Created 200) {String} user.name User's name
 * @apiSuccess (Created 200) {String} user.email User's email
 * @apiSuccess (Created 200) {Date} user.createdAt Timestamp
 * @apiSuccess (Created 200) {Date} user.updatedAt Timestamp
 *
 * @apiError (Bad Request 400) ValidationError Some parameters may contain invalid values
 * @apiError (NotFound 404) NotFound User not found
 */
router.patch('/:userId', validate(userValidation.updateUser), userController.updateUser);

/**
 * @api {post} v1/users/:userId Delete User
 * @apiDescription delete user
 * @apiVersion 1.0.0
 * @apiName DeleteUser
 * @apiGroup Users
 * @apiPermission public
 *
 * @apiParam  {String}  userId  User's id
 *
 * @apiSuccess (Created 204) {String} OK User Deleted
 *
 * @apiError (Bad Request 400) ValidationError Some parameters may contain invalid values
 * @apiError (NotFound 404) NotFound User not found
 */
router.delete('/:userId', validate(userValidation.deleteUser), userController.deleteUser);

module.exports = router;
