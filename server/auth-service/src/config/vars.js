const path = require('path');

// import .env variables
require('dotenv-safe').config({
  path: path.join(__dirname, '../../.env'),
  example: path.join(__dirname, '../../.env.example'),
});

module.exports = {
  env: process.env.NODE_ENV,
  port: process.env.PORT,
  jwt: {
      secret: process.env.JWT_SECRET,
      accessExpirationMinutes: process.env.JWT_ACCESS_EXPIRATION_MINUTES,
      refreshExpirationDays: process.env.JWT_REFRESH_EXPIRATION_DAYS,
  },
  mongo: {
    uri: process.env.NODE_ENV === 'test' ? process.env.MONGO_URI_TESTS : process.env.MONGO_URI,
    options: {
      // useCreateIndex: true,
      useNewUrlParser: true,
      useUnifiedTopology: true,
    },
  },
  // logs: process.env.NODE_ENV === 'production' ? 'combined' : 'dev',
  // email: {
  //     smtp : {
  //         host: process.env.SMTP_HOST,
  //         port: process.env.SMTP_PORT,
  //         username: process.env.SMTP_USERNAME,
  //         password: process.env.SMTP_PASSWORD,
  //     }
  // },
};
