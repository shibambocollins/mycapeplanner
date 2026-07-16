const express = require('express');
const router = express.Router();
const chatController = require('../controllers/chatController');
const authMiddleware = require('../middleware/authMiddleware');

// Guest chat: allow unauthenticated users to call chat.
// If an Authorization header is provided, authMiddleware can validate it.
// For now, we keep chat working in both modes.
router.post('/', (req, res, next) => {
  const authHeader = req.headers.authorization || '';
  const hasBearer = authHeader.startsWith('Bearer ');
  if (!hasBearer) return chatController.sendMessage(req, res, next);
  return authMiddleware(req, res, () => chatController.sendMessage(req, res, next));
});

module.exports = router;

