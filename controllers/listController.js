const listService = require('../services/listService');

const listController = {
  getAllListings: async (req, res) => {
    const listings = await listService.getAllListings();
    res.render('listings/listings', { listings });
  },

  // Get a single listing by ID
  showListingDetails: async (req, res) => {
    const list = await listService.getListingById(req.params.id);
    res.render('listings/listingDetail', { list });
  },

  // Render "Create listing" form
  newListing: (req, res) => {
    res.render('listings/createlisting');
  },

  // Create new listing
  createListing: async (req, res) => {
    const { title, image, address, price, description } = req.body;
    await listService.createListing({
      title,
      image,
      address,
      price,
      description,
      owner: req.session.userId,
    });

    req.flash("success", "Listing created successfully!");
    res.redirect('/list/listing');
  },

  // Render "Update listing" form
  editListing: async (req, res) => {
    const requestedList = await listService.getListingById(req.params.id);
    res.render('listings/updatelisting', { requestedList });
  },

  // Update listing
  updateListing: async (req, res) => {
    const { title, image, address, price, description } = req.body;
    await listService.updateListing(req.params.id, {
      title,
      image,
      address,
      price,
      description,
    });
    req.flash("success", "Listing updated successfully!");
    res.redirect(`/list/${req.params.id}`);
  },

  // Delete listing
  deleteListing: async (req, res) => {
    await listService.deleteListing(req.params.id);
    req.flash("success", "Listing deleted successfully!");
    res.redirect('/list/listing');
  },
};


module.exports = listController;
