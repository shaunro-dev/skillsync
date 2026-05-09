const express = require("express");
const { sendMessage, getMessages, markAsRead, getConversations } = require("../controllers/messageController");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/conversations", authMiddleware, getConversations);
router.get("/:taskId", authMiddleware, getMessages);
router.post("/", authMiddleware, sendMessage);
router.patch("/:taskId/read", authMiddleware, markAsRead);

module.exports = router;
