const expressLoader = require('../loaders/expressLoader');
const mongooseLoader = require('../loaders/mongooseLoader');
const socketIOLoader = require('../loaders/socketIOLoader');

require('dotenv').config();

const run = () => {
  mongooseLoader();
  const { httpServer } = expressLoader();
  socketIOLoader(httpServer);
};

run();
