const express = require("express");
const router = express.Router();
const {
  createProfile,
  getProfiles,
  getSingleProfile,
  updateProfile,
  deleteProfile,
  getUsers,
  getUser
} = require("./handlers");

router.post("/createProfile", createProfile);
router.get("/getProfiles", getProfiles);
router.get("/getSingleProfile", getSingleProfile);
router.put("/updateProfile", updateProfile);
router.get("/deleteProfile", deleteProfile);

router.get('/getUsers',getUsers)
router.get('/getUser',getUser)



module.exports = router;
