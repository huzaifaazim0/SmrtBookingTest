const Joi = require('joi');
const { password, objectId } = require('./custom.validation');

const createHotel = {
  body: Joi.object().keys({
    name: Joi.string().required(),
    location: Joi.object().required(),
    rooms: Joi.array().required(),
  }),
};

const getHotels = {
  query: Joi.object().keys({
    name: Joi.string(),
    location: Joi.object().keys({
      longitude : Joi.string(),
      latitude : Joi.string(),
    }),
    rooms: Joi.array(),
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

const getHotel = {
  params: Joi.object().keys({
    hotelId: Joi.string().custom(objectId),
  }),
};

const updateHotel = {
  params: Joi.object().keys({
    hotelId: Joi.required().custom(objectId),
  }),
  body: Joi.object()
    .keys({
      location: Joi.object().keys({
        longitude : Joi.string(),
        latitude : Joi.string(),
      }),
      rooms: Joi.array(),
      name: Joi.string(),
    })
    .min(1),
};

const deleteHotel = {
  params: Joi.object().keys({
    hotelId: Joi.string().custom(objectId),
  }),
};

module.exports = {
  createHotel,
  getHotels,
  getHotel,
  updateHotel,
  deleteHotel,
};
