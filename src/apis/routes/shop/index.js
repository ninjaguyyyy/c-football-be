const express = require('express');

const authRoute = require('./auth.route');
const productsRoute = require('./products.route');
const { authUser } = require('../../../middlewares/auth');

const router = express.Router();

const definedRoutes = [
  { path: '/auth', route: authRoute, isAuth: false },
  { path: '/products', route: productsRoute, isAuth: true },
];

definedRoutes.forEach(({ path, route, isAuth }) =>
  router.use(path, isAuth ? authUser : route, route)
);

module.exports = router;
