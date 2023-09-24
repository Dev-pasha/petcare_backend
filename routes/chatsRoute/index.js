const express = require("express");
const router = express.Router();
const {
    getChatsOfUser,
    // getSingleChat,
    createChat,
    // deleteChat

} = require("./handlers");


router.post("/createChat", createChat);
router.get("/getChatsOfUser", getChatsOfUser);


// const express = require("express");
// const router = express.Router();
// router.get("/getSingleChat", getSingleChat);
// router.get('/deleteChat', deleteChat);

module.exports = router;
