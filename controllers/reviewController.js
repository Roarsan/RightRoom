const reviewService = require('../services/reviewService');

const reviewController = {
  // Render "Create reviews" form
  renderReviews: async (req, res) => {
    const review = await reviewService.getReviews(req.params.id);
    res.render('profile/reviewProfile',{review});
  },
  
  submitReviews:async(req,res)=>{
    const{rating,comment } = req.body;
    await reviewService.submitReviews({
      reviewer: req.session.userId,
      reviewedUser: req.params.id,
      rating,
      comment,
    });
    req.flash("success", "Reviews submitted successfully!");
    res.redirect(`/profile/${req.params.id}`);
  }
};
module.exports = reviewController;

