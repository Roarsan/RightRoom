const List = require("../models/listModel");

// Checks the session for userId to verify if user is logged in
module.exports.isLoggedIn = function isLoggedIn(req, res, next) {
    if (!req.session || !req.session.userId) {
      req.flash("error", "You must be signed in!");
      return res.redirect("/auth/login");
    }
    next();
};

// Verifies that the current user is the owner of the listing
module.exports.isOwner = async function isOwner(req, res, next) {
    const { id } = req.params;
    const list = await List.findById(id);

    // Check if listing exists
    if (!list) {
      req.flash("error", "Listing not found");
      return res.redirect('/list/listing');
    }

    // Check if user is the owner
    if (String(list.owner) !== String(req.session.userId)) {
      req.flash("error", "Not authorized to modify this listing");
      return res.redirect(`/list/${id}`);
    }
    // User is authorized, continue
    next();
};
