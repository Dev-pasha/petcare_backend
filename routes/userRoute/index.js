const express = require("express");
const router = express.Router();
const {
  createProfile,
  getProfiles,
  getSingleProfile,
  updateProfile,
  deleteProfile,
  createUser,
} = require("./handlers");

router.post("/createUser", createUser);
router.post("/createProfile", createProfile);
router.get("/getProfiles", getProfiles);
router.get("/getSingleProfile", getSingleProfile);
router.put("/updateProfile", updateProfile);
router.delete("/deleteProfile", deleteProfile);

module.exports = router;
