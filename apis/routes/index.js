const express = require('express');

const authRoute = require('./auth.route');
const usersRoute = require('./users.route');

const router = express.Router();

const definedRoutes = [
  { path: '/auth', route: authRoute },
  { path: '/users', route: usersRoute },
];

definedRoutes.forEach(({ path, route }) => router.use(path, route));

module.exports = router;
