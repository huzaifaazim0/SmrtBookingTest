const express = require('express');
const hotelValidation = require('../../validations/hotel.validation');
const hotelController = require('../../controllers/hotel.controller');
const { authorize} = require('../../middlewares/auth');
const { validate } = require('../../middlewares/validate');

const router = express.Router();

/**
 * @api {post} v1/hotels/ Create Hotel
 * @apiDescription Creates a new hotel
 * @apiVersion 1.0.0
 * @apiName CreateHotel
 * @apiGroup Hotels
 * @apiPermission public
 *
 *
 * @apiBody  {String}  name  Hotel's Name
 * @apiBody  {Object}  location  Hotel's Location {longitude, latitude}
 *
 *
 * @apiSuccess (Created 201) {String} hotel.id Hotel's id
 * @apiSuccess (Created 201) {String} hotel.name Hotel's name
 * @apiSuccess (Created 201) {String} hotel.location Hotel's location
 * @apiSuccess (Created 201) {Date} hotel.createdAt Timestamp
 * @apiSuccess (Created 201) {Date} hotel.updatedAt Timestamp
 *
 * @apiError (Bad Request 400) ValidationError Some parameters may contain invalid values
 * @apiError (Unauthorized 401) Unauthorized Access Token Missing
 */
router.post('/',authorize(), validate(hotelValidation.createHotel), hotelController.createHotel);

/**
 * @api {get} v1/hotels/ Get Hotels
 * @apiDescription Get all hotels, search hotels
 * @apiVersion 1.0.0
 * @apiName GetHotels
 * @apiGroup Hotels
 * @apiPermission public
 *
* @apiQuery  {String}  name  Search Hotel's Name
* @apiQuery  {Object}  location  Search Hotel's Location
* @apiQuery  {Number}  limit  Limit
* @apiQuery  {Number}  page  Page
* @apiQuery  {String}  sortBy  SortBy
 *
 * @apiSuccess (Created 200) {Array} HotelsArray Hotels Array
 *
 * @apiError (Bad Request 400) ValidationError Some parameters may contain invalid values
 * @apiError (Unauthorized 401) Unauthorized Access Token Missing
 */
router.get('/',authorize(), validate(hotelValidation.getHotels), hotelController.getHotels);

/**
 * @api {post} v1/hotels/:hotelId Get Hotel
 * @apiDescription get hotel details
 * @apiVersion 1.0.0
 * @apiName GetHotel
 * @apiGroup Hotels
 * @apiPermission public
 *
 * @apiParam  {String}  hotelId  Hotel's id
 *
 * @apiSuccess (Created 200) {String} hotel.id Hotel's id
 * @apiSuccess (Created 200) {String} hotel.name Hotel's name
 * @apiSuccess (Created 200) {Object} hotel.location Hotel's location
 * @apiSuccess (Created 200) {Date} hotel.createdAt Timestamp
 * @apiSuccess (Created 200) {Date} hotel.updatedAt Timestamp
 *
 * @apiError (Bad Request 400) ValidationError Some parameters may contain invalid values
 * @apiError (Unauthorized 401) Unauthorized Access Token Missing
 */
router.get('/:hotelId',authorize(), validate(hotelValidation.getHotel), hotelController.getHotel);

/**
 * @api {patch} v1/hotels/:hotelId Update Hotel
 * @apiDescription update hotel
 * @apiVersion 1.0.0
 * @apiName UpdateHotel
 * @apiGroup Hotels
 * @apiPermission public
 *
 *
 * @apiParam  {String}  hotelId  Hotel's id
 *
 * @apiBody  {String}  name  Hotel's Name
 * @apiBody  {Object}  location  Hotel's location
 *
 * @apiSuccess (Created 200) {String} OK Hotel Updated
 * @apiSuccess (Created 200) {String} hotel.id Hotel's id
 * @apiSuccess (Created 200) {String} hotel.name Hotel's name
 * @apiSuccess (Created 200) {Object} hotel.location Hotel's location
 * @apiSuccess (Created 200) {Date} hotel.createdAt Timestamp
 * @apiSuccess (Created 200) {Date} hotel.updatedAt Timestamp
 *
 * @apiError (Bad Request 400) ValidationError Some parameters may contain invalid values
 * @apiError (Unauthorized 401) Unauthorized Access Token Missing
 * @apiError (NotFound 404) NotFound Hotel not found
 */
router.patch('/:hotelId',authorize(), validate(hotelValidation.updateHotel), hotelController.updateHotel);

/**
 * @api {post} v1/hotels/:hotelId Delete Hotel
 * @apiDescription delete hotel
 * @apiVersion 1.0.0
 * @apiName DeleteHotel
 * @apiGroup Hotels
 * @apiPermission public
 *
 * @apiParam  {String}  hotelId  Hotel's id
 *
 * @apiSuccess (Created 204) {String} OK Hotel Deleted
 *
 * @apiError (Bad Request 400) ValidationError Some parameters may contain invalid values
 * @apiError (Unauthorized 401) Unauthorized Access Token Missing
 * @apiError (NotFound 404) NotFound Hotel not found
 */
router.delete('/:hotelId',authorize(), validate(hotelValidation.deleteHotel), hotelController.deleteHotel);

module.exports = router;
