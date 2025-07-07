const Note = require("../models/Notes");

/**
 * GET /
 * Dashboard
 */
exports.dashboard = async (req, res) => {
  const locals = {
    title: "Dashboard",
    description: "Free NodeJS Notes App",
  };

  try {
    const notes = await Note.find({ user: req.user.id }).lean();

    res.render('dashboard/index', {
      userName: req.user.firstName,
      notes,
      current: 1,
      pages: 1,
      locals,
      layout: '../views/layouts/dashboard'
    });

  } catch (err) {
    console.error(err);
    res.render("error", { message: "Failed to load dashboard", layout: false });
  }
};
