const expressLoader = require('../loaders/expressLoader');
const socketIOLoader = require('../loaders/socketIOLoader');

require('dotenv').config();

const run = () => {
  const { httpServer } = expressLoader();
  socketIOLoader(httpServer);
};

run();
