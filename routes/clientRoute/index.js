const express = require("express");
const router = express.Router();
const { authenticateAndAuthorize } = require("../../middleware/authenticate");

const {
  getAllPets,
  getPet,
  createPet,
  updatePet,
  deletePet,
  getMyAppoinments,
  getClient,
  getAppoinment,
  createAppoinment,
  createReview,
  createClient,
  updateClient,
  slotStatusPending,
  slotStatusUnavailable,
  slotStatusAvailable,
  createRequest,
  getAllBlogs,
  getBlog,
  getCategoryBlog,
  getAllBlogsByCategory,
  

} = require("./handler");

// router.use();

router.get("/get-all-pets", authenticateAndAuthorize("CLIENT"), getAllPets);
router.get("/get-pet", authenticateAndAuthorize("CLIENT"), getPet);
router.post("/create-pet", authenticateAndAuthorize("CLIENT"), createPet);
router.post("/update-pet", authenticateAndAuthorize("CLIENT"), updatePet);
router.get("/delete-pet", authenticateAndAuthorize("CLIENT"), deletePet);

// slots working 
router.get("/slot-status-pending", authenticateAndAuthorize("CLIENT"), slotStatusPending);
router.get("/slot-status-unavailable", authenticateAndAuthorize("CLIENT"), slotStatusUnavailable);
router.get("/slot-status-available", authenticateAndAuthorize("CLIENT"), slotStatusAvailable);

router.get(
  "/get-my-appoinments",
  authenticateAndAuthorize("CLIENT"),
  getMyAppoinments
);
router.get(
  "/get-appoinment",
  authenticateAndAuthorize("CLIENT"),
  getAppoinment
);
router.post(
  "/create-appoinment",
  authenticateAndAuthorize("CLIENT"),
  createAppoinment
);

router.post("/create-review", authenticateAndAuthorize("CLIENT"), createReview);

router.post("/create-client", createClient);
router.get('/get-client', authenticateAndAuthorize("CLIENT"), getClient )
router.post("/update-client", authenticateAndAuthorize("CLIENT"), updateClient);

// request route public

router.post('/create-request', createRequest)

// public blog route

router.get('/get-blog-category', getCategoryBlog)
router.get('/get-all-blogs-by-category', getAllBlogsByCategory)
router.get('/get-all-public-blogs', getAllBlogs)
router.get('/get-single-blog', getBlog)


module.exports = router;
