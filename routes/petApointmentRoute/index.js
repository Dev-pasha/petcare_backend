const express = require("express");
const router = express.Router();

const {
 createPetAppointment,
  getPetAppointment,
  singlePetAppointment,
  deletePetAppointment,
} = require("./handlers");

router.post("/createPetAppointment", createPetAppointment);
router.get("/petAppointment", getPetAppointment);
router.get("/singlePetAppointment", singlePetAppointment);
router.delete("/petAppointment", deletePetAppointment);

module.exports = router;
