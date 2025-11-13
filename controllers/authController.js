const authService = require("../services/authService");

const authController = {
  renderRegister: (req, res) => {
     res.render("auth/register");
  },

  registerUser: async (req, res) => {
    const user = await authService.registerUser(req.body);
    req.session.userId = user._id;
    req.flash("success", "Welcome!");
    res.redirect("/list/listing");
  },

  renderLogin:  (req, res) => {
     res.render("auth/login");
  },

  loginUser: async (req, res) => {
    const user = await authService.authenticateUser(req.body);
    req.session.userId = user._id;
    req.flash("success", "Welcome back!");
    res.redirect("/list/listing");
  },

  logout: (req, res) => {
    req.flash("success", "You have been logged out");
   req.session.destroy(() => res.redirect("/"));
  }
};

module.exports = authController;