const express = require("express");
const router = express.Router();
const { authenticateAndAuthorize } = require("../../middleware/authenticate");

const {
  createScheduleOfDoctor,
  updateScheduleOfDoctor,
  getScheduleOfDoctor,
  deleteScheduleOfDoctor,
  createDoctor,
  updateDoctor,
  getAllAppointmentsOfDoctor,
  getSingleAppointmentOfDoctor,
  getScheduleDatesOfDoctor,
  getSingleSlotOfDoctor,
  doctorByCategories,
  getDoctorsByCategory,
  getSingleDoctor,
  getPublicScheduleDatesOfDoctor,
  getTimeSlotsOfDoctor

} = require("./handler");

router.post(
  "/create-schedule",
  authenticateAndAuthorize("DOCTOR"),
  createScheduleOfDoctor
);
router.post(
  "/update-schedule",
  authenticateAndAuthorize("DOCTOR"),
  updateScheduleOfDoctor
);
router.get(
  "/get-schedule",
  authenticateAndAuthorize("DOCTOR"),
  getScheduleOfDoctor
);

router.get('/get-single-slot', authenticateAndAuthorize('DOCTOR'), getSingleSlotOfDoctor);

router.get('/get-schedule-dates', authenticateAndAuthorize('DOCTOR'), getScheduleDatesOfDoctor);
router.get(
  "/delete-schedule",
  authenticateAndAuthorize("DOCTOR"),
  deleteScheduleOfDoctor
);

router.post("/create-doctor", createDoctor);
router.post("/update-doctor", authenticateAndAuthorize("DOCTOR"), updateDoctor);

router.get(
  "/get-appointments",
  authenticateAndAuthorize("DOCTOR"),
  getAllAppointmentsOfDoctor
);
router.get(
  "/get-single-appointment",
  authenticateAndAuthorize("DOCTOR"),
  getSingleAppointmentOfDoctor
);

router.get('/getSingleDoctor', getSingleDoctor)
router.get('/doctor-categories', doctorByCategories)
router.get('/list-doctors-by-category', getDoctorsByCategory)
router.get('/get-public-schedule', getPublicScheduleDatesOfDoctor)
router.get('/get-public-schudle-times', getTimeSlotsOfDoctor)

module.exports = router;
