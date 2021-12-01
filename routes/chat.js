const router = require("express").Router();
const { verifyToken } = require("../middlewares/authenticated");
const chatController = require("../controllers/chat");

//Post chat message
router.post("/", verifyToken, chatController.postChatMessage);

// Get chat messages
router.get("/", verifyToken, chatController.getChatMessages);

module.exports = router;
