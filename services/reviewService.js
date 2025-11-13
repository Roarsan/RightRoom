const ReviewModel = require("../models/reviewModel");
const ExpressError = require('../utils/ExpressError');
const httpStatus = require('../utils/httpStatus');

const reviewService = {
  getReviews: async (id) => {
    // stores revieweduser and passes the reviewer details
    const userDetails = await ReviewModel.find({ reviewedUser: id })
      .populate("reviewer")
      .sort({ createdAt: -1 });

    if (!userDetails) {
      throw new ExpressError(httpStatus.NOT_FOUND.code, "User Not Found");
    }

    const reviewCount = userDetails.length;

    let total = 0;
    for (let r of userDetails) {
      total += r.rating || 0;
    }
    //fallback when reviewCount is 0
    const avgRating = reviewCount > 0 ? total / reviewCount : 0;

    return {
      userDetails,
      reviewCount,
      avgRating,
    };
  },

  submitReviews: async (data) => {
    const newReview = new ReviewModel(data);
    return await newReview.save();
  },
};

module.exports = reviewService;
