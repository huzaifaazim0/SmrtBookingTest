const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../errors/api-error');
const catchAsync = require('../utils/catchAsync');
const { roomService } = require('../services');

const createRoom = catchAsync(async (req, res) => {
  const room = await roomService.createRoom(req.body);
  res.status(httpStatus.CREATED).send(room);
});

const getRooms = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['wifi','breakfast','price','beds']);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const result = await roomService.queryRooms(filter, options);
  res.send(result);
});

const getRoom = catchAsync(async (req, res) => {
  const room = await roomService.getRoomById(req.params.roomId);
  if (!room) {
    throw new ApiError({ message: 'Rooms not found', status: httpStatus.NOT_FOUND });
  } else {
    return res.send(room);
  }
});

const updateRoom = catchAsync(async (req, res) => {
  const room = await roomService.updateRoomById(req.params.roomId, req.body);
  res.send({...room});
});

const deleteRoom = catchAsync(async (req, res) => {
  await roomService.deleteRoomById(req.params.roomId);
  res.status(httpStatus.NO_CONTENT).send();
});

module.exports = {
  createRoom,
  getRooms,
  getRoom,
  updateRoom,
  deleteRoom,
};
