const mongoose = require('mongoose');
const config = require('../../../config/vars');

const setupTestDB = () => {
  beforeAll(async () => {
    await mongoose.connect(config.mongo.uri, config.mongo.options);
  });

  beforeEach(async () => {
    await Promise.all(Object.values(mongoose.connection.collections).map(async (collection) => collection.deleteMany()));
  });

  afterAll(async () => {
    await mongoose.disconnect();
  });
};

module.exports = setupTestDB;
