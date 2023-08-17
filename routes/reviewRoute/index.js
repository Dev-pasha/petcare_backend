const express = require("express");
const router = express.Router();

const {
  createReview,
  getReviews,
  getSingleReview,
  updateReview,
  deleteReview,
} = require("./handlers");

router.post("/createReview", createReview);
router.get("/getReviews", getReviews);
router.get("/getSingleReview", getSingleReview);
router.post("/updateReview", updateReview);
router.get("/deleteReview", deleteReview);

module.exports = router;
