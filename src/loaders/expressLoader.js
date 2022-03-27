require('express-async-errors');
const express = require('express');
const cors = require('cors');
const { createServer } = require('http');
const morgan = require('morgan');

const routeConfig = require('../apis/routes');
const { errorHandler, errorConverter } = require('../middlewares/error');

module.exports = () => {
  const app = express();
  const httpServer = createServer(app);

  app.use(morgan('dev'));

  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  app.use(cors());
  app.options('*', cors());

  app.use('/api', routeConfig);

  app.use(function (req, res, next) {
    res.status(404).json({
      error_message: 'Endpoint not found',
    });
  });

  app.use(errorConverter);
  app.use(errorHandler);

  httpServer.listen(process.env.PORT || 5000, () => {
    console.log('Server is running ...');
  });

  return { app, httpServer };
};
