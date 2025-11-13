const flash = require('connect-flash');

function setupFlash(app) {
  // Initialize connect-flash
  app.use(flash());

  // Make flash messages available globally to all views
  app.use((req, res, next) => {
    res.locals.success = req.flash("success");
    res.locals.error = req.flash("error");

    // ✅ true/false - convenience for templates
    res.locals.isLoggedIn = Boolean(req.session.userId);


    // ✅ actual logged-in user ID (used for comparisons)
    res.locals.userId = req.session.userId || null;
    next();
  });
}

module.exports = setupFlash;
