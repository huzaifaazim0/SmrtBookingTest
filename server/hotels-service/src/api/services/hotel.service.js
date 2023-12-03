const httpStatus = require('http-status');
const { Hotel } = require('../models');
const ApiError = require('../errors/api-error');

/**
 * Create a hotel
 * @param {Object} hotelBody
 * @returns {Promise<Hotel>}
 */
const createHotel = async (hotelBody) => {  
  return Hotel.create({...hotelBody});
};

/**
 * Query for hotels
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<QueryResult>}
 */
const queryHotels = async (filter, options) => {
  const hotels = await Hotel.paginate(filter, options);
  return hotels;
};

/**
 * Get hotel by id
 * @param {ObjectId} id
 * @returns {Promise<Hotel>}
 */
const getHotelById = async (id) => {
  return Hotel.findById(id);
};


/**
 * Update hotel by id
 * @param {ObjectId} hotelId
 * @param {Object} updateBody
 * @returns {Promise<Hotel>}
 */
const updateHotelById = async (hotelId, updateBody) => {
  const hotel = await getHotelById(hotelId);
  if (!hotel) {
    throw new ApiError({message : 'Hotel not found',status : httpStatus.NOT_FOUND});
  }

  Object.assign(hotel, updateBody);
  await hotel.save();
  return {...hotel._doc};
};

/**
 * Delete hotel by id
 * @param {ObjectId} hotelId
 * @returns {Promise<Hotel>}
 */
const deleteHotelById = async (hotelId) => {
  const hotel = await getHotelById(hotelId);
  if (!hotel) {
    throw new ApiError({message : 'Hotel not found',status : httpStatus.NOT_FOUND});
  }
  return await Hotel.findByIdAndDelete(hotelId);;
};

module.exports = {
  createHotel,
  queryHotels,
  getHotelById,
  updateHotelById,
  deleteHotelById,
};
