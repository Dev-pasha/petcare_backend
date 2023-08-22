const express = require("express");
const router = express.Router();

const {
  createSlot,
  getSlot,
  getSlotById,
  updateSlot,
  deleteSlot,
} = require("./handlers");

router.post("/createSlot", createSlot);
router.get("/getSlot", getSlot);
router.get("/getSlotById", getSlotById);
router.post("/updateSlot", updateSlot);
router.get("/deleteSlot", deleteSlot);

module.exports = router;
