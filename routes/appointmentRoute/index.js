const express = require("express");
const router = express.Router();

const {
  createAppointment,
  getAppointments,
  getSingleAppointments,
  updateAppointment,
  deleteAppointment,
} = require("./handlers");

router.post("/createAppointment", createAppointment);
router.get("/getAppointments", getAppointments);
router.get("/getSingleAppointments", getSingleAppointments);
router.post("/updateAppointment", updateAppointment);
router.get("/deleteAppointment", deleteAppointment);

module.exports = router;
