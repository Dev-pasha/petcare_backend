const {
    createReviewInStorage,
    getReviewsInStorage,
    getSingleReviewInStorage,
    updateReviewInStorage,
    deleteReviewInStorage,
    } = require("../../storage/review/index");


async function createReview(req, res) {
  try {
    const review = await createReviewInStorage({ data });
    res.status(200).json({
      message: "review created successfully",
      review,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

async function getReviews(req, res) {
  try {
    const reviews = await getReviewsInStorage();
    res.status(200).json({
      message: "reviews fetched successfully",
      reviews,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

async function getSingleReview(req, res) {
  const { reviewId } = req.query;
  try {
    const review = await getSingleReviewInStorage({ reviewId });
    res.status(200).json({
      message: "review fetched successfully",
      review,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

async function updateReview(req, res) {
  try {
    const review = await updateReviewInStorage({ data });
    res.status(200).json({
      message: "review updated successfully",
      review,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

async function deleteReview(req, res) {
  const { reviewId } = req.query;
  try {
    const review = await deleteReviewInStorage({ reviewId });
    res.status(200).json({
      message: "review deleted successfully",
      review,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

module.exports = {
  createReview,
  getReviews,
  getSingleReview,
  updateReview,
  deleteReview,
};
