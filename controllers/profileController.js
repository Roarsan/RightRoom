const profileService = require('../services/profileService');
const reviewService = require('../services/reviewService');

const profileController = {
  renderProfile: async (req, res) => {
    const profile = await profileService.getProfile(req.params.id);
    const reviews = await reviewService.getReviews(req.params.id);
    res.render('profile/profile', { profile,reviews});
  },
};
module.exports = profileController;

