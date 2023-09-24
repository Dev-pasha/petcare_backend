const express = require("express");
const router = express.Router();
const {
  createProfile,
  getProfiles,
  getSingleProfile,
  updateProfile,
  deleteProfile,
} = require("./handlers");

router.post("/createProfile", createProfile);
router.get("/getProfiles", getProfiles);
router.get("/getSingleProfile", getSingleProfile);
router.put("/updateProfile", updateProfile);
router.get("/deleteProfile", deleteProfile);



module.exports = router;
