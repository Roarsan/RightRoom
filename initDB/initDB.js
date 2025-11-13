// Load environment variables
require('dotenv').config();

//connecting the db and seeding the sample data
const sampleData = require("../models/sampleData/sampleData.js");
const User = require("../models/userModel");
const List = require("../models/listModel");
const Review = require("../models/reviewModel");

// Import database connection
const connectDB = require("../config/connectDB.js");

// Connect to database
connectDB();

async function initDB(){
    await User.deleteMany({});
    await List.deleteMany({});
    await Review.deleteMany({});
    // Create users
    const [landlord, tenant1, tenant2] = await User.insertMany(sampleData.users);

    // Create listings for the landlord
    const listingsToInsert = sampleData.listings.map((listing) => ({
      ...listing,
      owner: landlord._id,
    }));
    await List.insertMany(listingsToInsert);

    // Create reviews (tenants reviewing landlord)
    const reviewsToInsert = [
      { ...sampleData.reviews[0], reviewer: tenant1._id, reviewedUser: landlord._id },
      { ...sampleData.reviews[1], reviewer: tenant2._id, reviewedUser: landlord._id },
    ];
    await Review.insertMany(reviewsToInsert);
    console.log("✅ Database seeded successfully!");
}

initDB();