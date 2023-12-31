const { countConnection } = require('./helpers/check-connection');
const expressLoader = require('./loaders/expressLoader');
const mongooseLoader = require('./loaders/mongooseLoader');
const socketIOLoader = require('./loaders/socketIOLoader');

require('dotenv').config();

const run = () => {
  mongooseLoader();
  mongooseLoader();

  countConnection();
  const { httpServer } = expressLoader();
  socketIOLoader(httpServer);
};

run();
