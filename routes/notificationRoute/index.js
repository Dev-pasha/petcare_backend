const express = require("express");
const router = express.Router();

const {
  getNotifications,
  getNotification,
  createNotification,
  updateNotification,
  statusChangeNotification,
  deleteNotification,
} = require("./handlers");

router.get('/statusCange', statusChangeNotification)
router.get("/notifications", getNotifications);
router.get("/notifications/:id", getNotification);
router.post("/notification-create", createNotification);
router.get("/notifications-update", updateNotification);
router.delete("/notifications/:id", deleteNotification);

module.exports = router;
