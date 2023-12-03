const httpStatus = require('http-status');
const { Room } = require('../models');
const ApiError = require('../errors/api-error');

/**
 * Create a room
 * @param {Object} roomBody
 * @returns {Promise<Room>}
 */
const createRoom = async (roomBody) => {  
  return Room.create({...roomBody});
};

/**
 * Query for rooms
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<QueryResult>}
 */
const queryRooms = async (filter, options) => {
  const rooms = await Room.paginate(filter, options);
  return rooms;
};

/**
 * Get room by id
 * @param {ObjectId} id
 * @returns {Promise<Room>}
 */
const getRoomById = async (id) => {
  return Room.findById(id);
};


/**
 * Update room by id
 * @param {ObjectId} roomId
 * @param {Object} updateBody
 * @returns {Promise<Room>}
 */
const updateRoomById = async (roomId, updateBody) => {
  const room = await getRoomById(roomId);
  if (!room) {
    throw new ApiError({message : 'Room not found',status : httpStatus.NOT_FOUND});
  }

  Object.assign(room, updateBody);
  await room.save();
  return {...room._doc};
};

/**
 * Delete room by id
 * @param {ObjectId} roomId
 * @returns {Promise<Room>}
 */
const deleteRoomById = async (roomId) => {
  const room = await getRoomById(roomId);
  if (!room) {
    throw new ApiError({message : 'Room not found',status : httpStatus.NOT_FOUND});
  }
  return await Room.findByIdAndDelete(roomId);;
};

module.exports = {
  createRoom,
  queryRooms,
  getRoomById,
  updateRoomById,
  deleteRoomById,
};
