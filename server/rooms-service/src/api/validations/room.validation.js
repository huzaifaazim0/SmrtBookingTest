const Joi = require('joi');
const { password, objectId } = require('./custom.validation');

const createRoom = {
  body: Joi.object().keys({
    wifi: Joi.boolean().required(),
    beds: Joi.number().required(),
    breakfast: Joi.boolean().required(),
    price : Joi.number().required(),
  }),
};

const getRooms = {
  query: Joi.object().keys({
    wifi: Joi.boolean(),
    beds: Joi.number(),
    breakfast: Joi.boolean(),
    price : Joi.number(),
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

const getRoom = {
  params: Joi.object().keys({
    roomId: Joi.string().custom(objectId),
  }),
};

const updateRoom = {
  params: Joi.object().keys({
    roomId: Joi.required().custom(objectId),
  }),
  body: Joi.object()
    .keys({
      wifi: Joi.boolean(),
      beds: Joi.number(),
      breakfast: Joi.boolean(),
      price : Joi.number(),
    })
    .min(1),
};

const deleteRoom = {
  params: Joi.object().keys({
    roomId: Joi.string().custom(objectId),
  }),
};

module.exports = {
  createRoom,
  getRooms,
  getRoom,
  updateRoom,
  deleteRoom,
};
