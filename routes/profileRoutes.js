const express = require("express");
const router = express.Router();
const profileController = require("../controllers/profileController");
const reviewController = require("../controllers/reviewController")
const wrapAsync = require("../utils/wrapAsync");
const { isLoggedIn} = require("../middleware/auth");
const validate = require("../middleware/validateSchema");
const {reviewSchema} = require("../joiSchemas/reviewSchema");

//Profile related routes

router.get('/:id', wrapAsync(profileController.renderProfile));
router.post('/reviews/:id',isLoggedIn, validate(reviewSchema), wrapAsync(reviewController.submitReviews));

module.exports = router;