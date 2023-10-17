const express = require("express");
const router = express.Router();

const {
  getNotifications,
  getNotification,
  createNotification,
  updateNotification,
  deleteNotification,
} = require("./handlers");

router.get("/notifications", getNotifications);
router.get("/notifications/:id", getNotification);
router.post("/notifications", createNotification);
router.put("/notifications/:id", updateNotification);
router.delete("/notifications/:id", deleteNotification);

module.exports = router;
