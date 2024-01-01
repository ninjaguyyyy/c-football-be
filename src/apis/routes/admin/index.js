const express = require('express');

const { authUser } = require('../../../middlewares/auth');

const router = express.Router();

const definedRoutes = [];

definedRoutes.forEach(({ path, route, isAuth }) =>
  router.use(path, isAuth ? authUser : route, route)
);

module.exports = router;
