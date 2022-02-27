const express = require('express');

const authRoute = require('./auth.route');
const usersRoute = require('./users.route');
const conversationsRoute = require('./conversations.route');
const messagesRoute = require('./messages.route');

const router = express.Router();

const definedRoutes = [
  { path: '/auth', route: authRoute },
  { path: '/users', route: usersRoute },
  { path: '/conversations', route: conversationsRoute },
  { path: '/messages', route: messagesRoute },
];

definedRoutes.forEach(({ path, route }) => router.use(path, route));

module.exports = router;
