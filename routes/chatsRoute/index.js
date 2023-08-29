const express = require("express");
const router = express.Router();
const {
    getChats,
    getSingleChat,
    createChat,
    deleteChat
      
} = require("./handlers");

router.get("/chats", getChats);
router.get("/getSingleChat", getSingleChat);
router.post("/createChat", createChat);
router.get('/deleteChat', deleteChat);

module.exports = router;
