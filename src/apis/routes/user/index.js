const express = require('express');

const authRoute = require('./auth.route');
const usersRoute = require('./users.route');
const conversationsRoute = require('./conversations.route');
const messagesRoute = require('./messages.route');
const productsRoute = require('./products.route');
const cartRoute = require('./cart.route');

const { authUser } = require('../../../middlewares/auth');

const router = express.Router();

const definedRoutes = [
  { path: '/auth', route: authRoute, isAuth: false },
  { path: '/users', route: usersRoute, isAuth: true },
  { path: '/conversations', route: conversationsRoute, isAuth: true },
  { path: '/messages', route: messagesRoute, isAuth: true },
  { path: '/products', route: productsRoute, isAuth: true },
  { path: '/cart', route: cartRoute, isAuth: true },
];

definedRoutes.forEach(({ path, route, isAuth }) =>
  router.use(path, isAuth ? authUser : route, route)
);

module.exports = router;
