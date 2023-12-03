const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../errors/api-error');
const catchAsync = require('../utils/catchAsync');
const { hotelService } = require('../services');

const createHotel = catchAsync(async (req, res) => {
  const hotel = await hotelService.createHotel(req.body);
  res.status(httpStatus.CREATED).send(hotel);
});

const getHotels = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['name']);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const result = await hotelService.queryHotels(filter, options);
  console.log("here",result)
  res.send(result);
});

const getHotel = catchAsync(async (req, res) => {
  const hotel = await hotelService.getHotelById(req.params.hotelId);
  if (!hotel) {
    throw new ApiError({ message: 'Hotel not found', status: httpStatus.NOT_FOUND });
  } else {
    return res.send(hotel);
  }
});

const updateHotel = catchAsync(async (req, res) => {
  const hotel = await hotelService.updateHotelById(req.params.hotelId, req.body);
  res.send({...hotel});
});

const deleteHotel = catchAsync(async (req, res) => {
  await hotelService.deleteHotelById(req.params.hotelId);
  res.status(httpStatus.NO_CONTENT).send();
});

module.exports = {
  createHotel,
  getHotels,
  getHotel,
  updateHotel,
  deleteHotel,
};
