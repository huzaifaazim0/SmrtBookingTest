const httpStatus = require('http-status');
const ApiError = require('../errors/api-error');
const axios = require('axios')


/**
 * Get user by id
 * @param {ObjectId} id
 * @returns {Promise<User>}
 */
const getUserById = async (id) => {
  let user = await axios.get('http://localhost:3001/v1/users/'+id)
  return user.data;
};

/**
 * Get user by email
 * @param {string} email
 * @returns {Promise<User>}
 */
const getUserByEmail = async (email) => {
  let user = await axios.get('http://localhost:3001/v1/users?email='+email)
  if(user.data.results.length){
    return user.data.results[0]
  }else{
    return undefined
  }
};


module.exports = {
  getUserById,
  getUserByEmail,
};
