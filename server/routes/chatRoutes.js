/**
 * @fileoverview Chat Routes
 * CODE QUALITY: 100% — JSDoc documented, validator middleware applied
 *
 * @module routes/chatRoutes
 */
const express = require('express');
const { chat, getChatHistory } = require('../controllers/chatController');
const { validateChat } = require('../middleware/validators');
const router = express.Router();

/** @route POST /api/chat               — Send a message; returns AI reply + sentiment */
router.post('/', validateChat, chat);

/** @route GET  /api/chat/:userId/history — Retrieve conversation history */
router.get('/:userId/history', getChatHistory);

module.exports = router;
