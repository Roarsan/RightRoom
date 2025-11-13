const ListModel = require('../models/listModel');
const ExpressError = require('../utils/ExpressError');
const httpStatus = require('../utils/httpStatus');

const getAllListings = async () => {
  const listings = await ListModel.find();
  return listings;
};

// Get a single listing by ID
const getListingById = async (id) => {
  const listing = await ListModel.findById(id).populate('owner');
  if (!listing) {
    throw new ExpressError(httpStatus.NOT_FOUND.code, 'Listing not found.');
  }
  return listing;
};

// Save a new listing to the db and return it
const createListing = async (data) => {
  const newList = new ListModel(data);
  const saved = await newList.save();
  return saved;
};

// Update an existing listing
const updateListing = async (id, data) => {
  const updated = await ListModel.findByIdAndUpdate(id, data, { new: true });
  if (!updated) {
    throw new ExpressError(httpStatus.NOT_FOUND.code, 'Listing not found for update.');
  }
  return updated;
};

// Delete a listing
const deleteListing = async (id) => {
  const deleted = await ListModel.findByIdAndDelete(id);
  if (!deleted) {
    throw new ExpressError(httpStatus.NOT_FOUND.code, 'Listing not found for deletion.');
  }
  return deleted;
};

module.exports = {
  getAllListings,
  getListingById,
  createListing,
  updateListing,
  deleteListing,
};
