const { models } = require("../../models");

const createReviewInStorage = async ({ data }) => {
  try {
    const review = await models.Review.create(data);
    return review;
  } catch (error) {
    throw error;
  }
};

const getReviewsInStorage = async () => {
  try {
    const reviews = await models.Review.findAll();
    return reviews;
  } catch (error) {
    throw error;
  }
};

const getSingleReviewInStorage = async ({ reviewId }) => {
  try {
    const review = await models.Review.findOne({
      where: {
        reviewId: reviewId,
      },
    });
    return review;
  } catch (error) {
    throw error;
  }
};

const updateReviewInStorage = async ({ data }) => {
  const { reviewId } = data;
  try {
    const exsistingReview = await models.Review.findOne({
      where: {
        reviewId: reviewId,
      },
    });
    const updatedReview = await exsistingReview.update(data);
    return updatedReview;
  } catch (error) {
    console.log(error.message);
  }
};

const deleteReviewInStorage = async ({ reviewId }) => {
  try {
    const review = await models.Review.destroy({
      where: {
        reviewId: reviewId,
      },
    });
    return review;
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = {
  createReviewInStorage,
  getReviewsInStorage,
  getSingleReviewInStorage,
  updateReviewInStorage,
  deleteReviewInStorage,
};
