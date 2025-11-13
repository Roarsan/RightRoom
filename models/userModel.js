const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true, trim: true },
  email: { type: String, required: true, unique: true, lowercase: true, trim: true },
  password: { type: String, required: true },
  role: {
    type: String,
    enum: ['tenant', 'landlord'],
    required: [true, 'Role is required.'],
  },
  avgRating: { type: Number, default: 0 },
  reviewCount: { type: Number, default: 0 },
  comment:{type:String}
}, { timestamps: true });


const UserModel= mongoose.model("User", userSchema);
module.exports = UserModel;