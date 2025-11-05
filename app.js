require('dotenv').config();
const express = require("express");
const validateEnv = require("./config/validateEnv");
const connectDB = require("./config/connectDB");
const methodOverride = require("method-override");
const auth_Routes = require("./routes/authRoutes.js");
const list_Routes = require("./routes/listRoutes.js");
const setupSession = require('./config/session');
const setupFlash = require('./config/flash');
const ExpressError = require('./utils/ExpressError');

// Validate environment variables before starting
validateEnv();

const app = express();

// Connect to MongoDB
connectDB();

// View engine
app.set("view engine", "ejs");

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));
app.use(methodOverride("_method"));

// Sessions
setupSession(app);

// Flash messages
setupFlash(app);

// Routes
app.get("/", (req, res) => {
  res.send("Welcome to SpareRoom Clone! <a href='/list/listing'>View Listings</a>");
});
app.use("/list", list_Routes);
app.use("/auth", auth_Routes);

// 404 handler if no routes matches
app.all(/.*/, (req, res, next) => {
  next(new ExpressError(404, 'Page not found'));
});

// Global error handler to render the error ejs
app.use((err, req, res, next) => {
  const { statusCode = 500, message = 'Something went wrong' } = err;
  res.status(statusCode).render('error', {err});
});

// Start server
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`🚀 Server listening on port ${PORT}`);
});
