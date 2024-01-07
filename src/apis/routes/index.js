const express = require('express');

const userRoute = require('./user');
const shopRoute = require('./shop');
const adminRoute = require('./admin');

const router = express.Router();

const definedRoutes = [
  { path: '/shop', route: shopRoute },
  { path: '/user', route: userRoute },
  { path: '/admin', route: adminRoute },
];

definedRoutes.forEach(({ path, route }) => router.use(path, route));

module.exports = router;
