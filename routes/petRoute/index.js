const express = require("express");
const router = express.Router();
const {
  addPet,
  updatePet,
  deletePet,
  getPets,
  getSinglePet,
} = require("./handlers");

router.post("/addPet", addPet);
router.post("/updatePet", updatePet);
router.post("/deletePet", deletePet);
router.get("/getPets", getPets);
router.get("/getSinglePet", getSinglePet);

module.exports = router;
