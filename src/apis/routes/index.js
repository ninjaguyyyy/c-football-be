const express = require('express');

const { authUser } = require('../../middlewares/auth');
const userRoute = require('./user');
const shopRoute = require('./shop');
const adminRoute = require('./admin');

const router = express.Router();

const definedRoutes = [
  { path: '/user', route: userRoute },
  { path: '/shop', route: shopRoute, isAuth: true },
  { path: '/admin', route: adminRoute, isAuth: true },
];

definedRoutes.forEach(({ path, route, isAuth }) =>
  router.use(path, isAuth ? authUser : route, route)
);

module.exports = router;
