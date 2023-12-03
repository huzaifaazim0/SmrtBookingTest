const express = require('express');
const roomValidation = require('../../validations/room.validation');
const roomController = require('../../controllers/rooms.controller');
const { authorize} = require('../../middlewares/auth');
const { validate } = require('../../middlewares/validate');

const router = express.Router();

/**
 * @api {post} v1/rooms/ Create Room
 * @apiDescription Creates a new room
 * @apiVersion 1.0.0
 * @apiName CreateRoom
 * @apiGroup Rooms
 * @apiPermission public
 *
 *
 * @apiBody   {Boolean}    name  Room's Wifi
 * @apiBody   {Number}    beds Number of beds
 * @apiBody   {Boolean}    breakfast Breakfast
 * @apiBody   {Number}    price Price
 *
 *
 * @apiSuccess (Created 201) {String} room.id Room's id
 * @apiSuccess   {Boolean}    name  Room's Wifi
 * @apiSuccess   {Number}    beds Number of beds
 * @apiSuccess   {Boolean}    breakfast Breakfast
 * @apiSuccess   {Number}    price Price
 * @apiSuccess (Created 201) {Date} room.createdAt Timestamp
 * @apiSuccess (Created 201) {Date} room.updatedAt Timestamp
 *
 * @apiError (Bad Request 400) ValidationError Some parameters may contain invalid values
 * @apiError (Unauthorized 401) Unauthorized Access Token Missing
 */
router.post('/',authorize(), validate(roomValidation.createRoom), roomController.createRoom);

/**
 * @api {get} v1/rooms/ Get Rooms
 * @apiDescription Get all rooms, search rooms
 * @apiVersion 1.0.0
 * @apiName GetRooms
 * @apiGroup Rooms
 * @apiPermission public
 *
 * @apiQuery   {Boolean}    name  Room's Wifi
 * @apiQuery   {Number}    beds Number of beds
 * @apiQuery   {Boolean}    breakfast Breakfast
 * @apiQuery   {Number}    price Price
* @apiQuery  {Number}  limit  Limit
* @apiQuery  {Number}  page  Page
* @apiQuery  {String}  sortBy  SortBy
 *
 * @apiSuccess (Created 200) {Array} RoomsArray Rooms Array
 *
 * @apiError (Bad Request 400) ValidationError Some parameters may contain invalid values
 * @apiError (Unauthorized 401) Unauthorized Access Token Missing
 */
router.get('/',authorize(), validate(roomValidation.getRooms), roomController.getRooms);

/**
 * @api {post} v1/rooms/:roomId Get Room
 * @apiDescription get room details
 * @apiVersion 1.0.0
 * @apiName GetRoom
 * @apiGroup Rooms
 * @apiPermission public
 *
 * @apiParam  {String}  roomId  Room's id
 *
 * @apiSuccess (Created 200) {String} room.id Room's id
 * @apiSuccess (Created 200) {String} room.name Room's name
 * @apiSuccess (Created 200) {Object} room.location Room's location
 * @apiSuccess (Created 200) {Date} room.createdAt Timestamp
 * @apiSuccess (Created 200) {Date} room.updatedAt Timestamp
 *
 * @apiError (Bad Request 400) ValidationError Some parameters may contain invalid values
 * @apiError (Unauthorized 401) Unauthorized Access Token Missing
 */
router.get('/:roomId',authorize(), validate(roomValidation.getRoom), roomController.getRoom);

/**
 * @api {patch} v1/rooms/:roomId Update Room
 * @apiDescription update room
 * @apiVersion 1.0.0
 * @apiName UpdateRoom
 * @apiGroup Rooms
 * @apiPermission public
 *
 *
 * @apiParam  {String}  roomId  Room's id
 *
 * @apiBody   {Boolean}    name  Room's Wifi
 * @apiBody   {Number}    beds Number of beds
 * @apiBody   {Boolean}    breakfast Breakfast
 * @apiBody   {Number}    price Price
 *
 * @apiSuccess (Created 200) {String} OK Room Updated
 * @apiSuccess (Created 200) {String} room.id Room's id
 * @apiSuccess   {Boolean}    name  Room's Wifi
 * @apiSuccess   {Number}    beds Number of beds
 * @apiSuccess   {Boolean}    breakfast Breakfast
 * @apiSuccess   {Number}    price Price
 * @apiSuccess (Created 200) {Date} room.createdAt Timestamp
 * @apiSuccess (Created 200) {Date} room.updatedAt Timestamp
 *
 * @apiError (Bad Request 400) ValidationError Some parameters may contain invalid values
 * @apiError (Unauthorized 401) Unauthorized Access Token Missing
 * @apiError (NotFound 404) NotFound Room not found
 */
router.patch('/:roomId',authorize(), validate(roomValidation.updateRoom), roomController.updateRoom);

/**
 * @api {post} v1/rooms/:roomId Delete Room
 * @apiDescription delete room
 * @apiVersion 1.0.0
 * @apiName DeleteRoom
 * @apiGroup Rooms
 * @apiPermission public
 *
 * @apiParam  {String}  roomId  Room's id
 *
 * @apiSuccess (Created 204) {String} OK Room Deleted
 *
 * @apiError (Bad Request 400) ValidationError Some parameters may contain invalid values
 * @apiError (Unauthorized 401) Unauthorized Access Token Missing
 * @apiError (NotFound 404) NotFound Room not found
 */
router.delete('/:roomId',authorize(), validate(roomValidation.deleteRoom), roomController.deleteRoom);

module.exports = router;
