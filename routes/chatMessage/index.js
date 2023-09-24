const express = require("express");
const router = express.Router();
const {
    addChatMessage,
    getChatFromChatId
} = require("./handlers");


router.post("/addChatMessage", addChatMessage);
router.get("/getChatFromChatId", getChatFromChatId);

module.exports = router;
