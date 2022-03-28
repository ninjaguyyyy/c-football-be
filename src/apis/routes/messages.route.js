const express = require('express');
const { messagesController } = require('../controllers');
const router = express.Router();

router.post('/', messagesController.createMessage);
router.get('/by-conversation/:conversationId', messagesController.getByConversation);

module.exports = router;
