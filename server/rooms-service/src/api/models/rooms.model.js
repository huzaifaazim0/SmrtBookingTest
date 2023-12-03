const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const { env } = require('../../config/vars');
const { toJSON } = require('./plugins');
/**
 * @api {object} Rooms Rooms
 * @apiDescription Rooms model representing a Room entity.
 * @apiName Rooms
 * @apiGroup Models
 * @apiVersion 1.0.0
 * @apiPermission public
 *
 * @apiBody   {Boolean}    name  Room's Wifi
 * @apiBody   {Number}    beds Number of beds
 * @apiBody   {Boolean}    breakfast Breakfast
 * @apiBody   {Number}    price Price
*/

/**
 * Room Schema
 * @private
 */
const roomSchema = new mongoose.Schema(
  {
    wifi: {
      type: Boolean,
    },
    beds: {
      type : Number,
    },
    breakfast : Boolean,
    price : Number
  },
  {
    timestamps: true,
  },
);

// add plugin that converts mongoose to json
roomSchema.plugin(toJSON);

/**
 * Add your
 * - pre-save hooks
 * - validations
 * - virtuals
 */

/**
 * Methods
 */
/**
 * Statics
 */
roomSchema.statics = {
  /**
     * @typedef {Object} QueryResult
     * @property {Document[]} results - Results found
     * @property {number} page - Current page
     * @property {number} limit - Maximum number of results per page
     * @property {number} totalPages - Total number of pages
     * @property {number} totalResults - Total number of documents
   */
  /**
   * Query for documents with pagination
   * @param {Object} [filter] - Mongo filter
   * @param {Object} [options] - Query options
   * @param {string} [options.sortBy] - Sorting criteria using the format: sortField:(desc|asc). Multiple sorting criteria should be separated by commas (,)
   * @param {string} [options.populate] - Populate data fields. Hierarchy of fields should be separated by (.). Multiple populating criteria should be separated by commas (,)
   * @param {number} [options.limit] - Maximum number of results per page (default = 10)
   * @param {number} [options.page] - Current page (default = 1)
   * @returns {Promise<QueryResult>}
   */
  async paginate(filter, options) {
    let sort = '';
    if (options.sortBy) {
      const sortingCriteria = [];
      options.sortBy.split(',').forEach((sortOption) => {
        const [key, order] = sortOption.split(':');
        sortingCriteria.push((order === 'desc' ? '-' : '') + key);
      });
      sort = sortingCriteria.join(' ');
    } else {
      sort = 'createdAt';
    }

    const limit = options.limit && parseInt(options.limit, 10) > 0 ? parseInt(options.limit, 10) : 10;
    const page = options.page && parseInt(options.page, 10) > 0 ? parseInt(options.page, 10) : 1;
    const skip = (page - 1) * limit;

    const countPromise = this.countDocuments(filter).exec();
    let docsPromise = this.find(filter).sort(sort).skip(skip).limit(limit);

    if (options.populate) {
      options.populate.split(',').forEach((populateOption) => {
        docsPromise = docsPromise.populate(
          populateOption
            .split('.')
            .reverse()
            .reduce((a, b) => ({ path: b, populate: a })),
        );
      });
    }

    docsPromise = docsPromise.exec();

    return Promise.all([countPromise, docsPromise]).then((values) => {
      const [totalResults, results] = values;
      const totalPages = Math.ceil(totalResults / limit);
      const result = {
        results,
        page,
        limit,
        totalPages,
        totalResults,
      };
      return Promise.resolve(result);
    });
  },

};

/**
 * @typedef Room
 */
module.exports = mongoose.model('Room', roomSchema);
