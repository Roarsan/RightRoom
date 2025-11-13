const bcrypt = require("bcrypt");
const userModel = require("../models/userModel");
const ExpressError = require('../utils/ExpressError');
const httpStatus = require('../utils/httpStatus');

const registerUser = async ({ username, email, password ,role}) => {
  const existingEmail = await userModel.findOne({ email });
  if (existingEmail) {
    throw new ExpressError(httpStatus.CONFLICT.code, 'Email is already registered.');
  }

  const hashedPassword = await bcrypt.hash(password, 12);
  const createdUser = await userModel.create({ username, email, password: hashedPassword, role: role?.trim().toLowerCase(), });

  if (!createdUser) {
    throw new ExpressError(httpStatus.INTERNAL_SERVER_ERROR.code, 'User registration failed.');
  }

  return createdUser;
};

const authenticateUser = async ({ email, password }) => {
  const user = await userModel.findOne({ email });
  if (!user) {
    throw new ExpressError(httpStatus.UNAUTHORIZED.code, 'Invalid email or password.');
  }

  const isValid = await bcrypt.compare(password, user.password);
  if (!isValid) {
    throw new ExpressError(httpStatus.UNAUTHORIZED.code, 'Invalid email or password.');
  }

  return user;
};

module.exports = { registerUser, authenticateUser };
