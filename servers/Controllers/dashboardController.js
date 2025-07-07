const Note = require("../models/Notes");
const mongoose = require("mongoose");

/**
 * GET /
 * Dashboard with pagination
 */
exports.dashboard = async (req, res) => {
  const perPage = 12;
  const page = parseInt(req.query.page) || 1;

  const locals = {
    title: "Dashboard",
    description: "Free NodeJS Notes App.",
  };

  try {
    const notes = await Note.aggregate([
      { $match: { user: new mongoose.Types.ObjectId(req.user.id) } },
      { $sort: { updatedAt: -1 } },
      {
        $project: {
          title: { $substr: ["$title", 0, 30] },
          body: { $substr: ["$body", 0, 100] },
        },
      }
    ])
    .skip(perPage * (page - 1))
    .limit(perPage)
    .exec();

    const count = await Note.countDocuments({ user: req.user.id });

    res.render("dashboard/index", {
      userName: req.user.firstName,
      locals,
      notes,
      layout: "../views/layouts/dashboard",
      current: page,
      pages: Math.ceil(count / perPage),
    });
  } catch (error) {
    console.error("Dashboard error:", error);
    res.render("error", {
      message: "Failed to load dashboard",
      layout: false,
    });
  }
};

/**
 * GET /
 * View Specific Note
 */
exports.dashboardViewNote = async (req, res) => {
  try {
    const note = await Note.findOne({ _id: req.params.id, user: req.user.id }).lean();

    if (note) {
      res.render("dashboard/view-note", {
        noteID: req.params.id,
        note,
        layout: "../views/layouts/dashboard",
      });
    } else {
      res.send("Note not found.");
    }
  } catch (error) {
    console.error(error);
    res.send("Error retrieving note.");
  }
};

/**
 * PUT /
 * Update Specific Note
 */
exports.dashboardUpdateNote = async (req, res) => {
  try {
    await Note.findOneAndUpdate(
      { _id: req.params.id, user: req.user.id },
      {
        title: req.body.title,
        body: req.body.body,
        updatedAt: Date.now(),
      }
    );
    res.redirect("/dashboard");
  } catch (error) {
    console.error(error);
    res.send("Error updating note.");
  }
};

/**
 * DELETE /
 * Delete Note
 */
exports.dashboardDeleteNote = async (req, res) => {
  try {
    await Note.deleteOne({ _id: req.params.id, user: req.user.id });
    res.redirect("/dashboard");
  } catch (error) {
    console.error(error);
    res.send("Error deleting note.");
  }
};

/**
 * GET /
 * Add Note Page
 */
exports.dashboardAddNote = async (req, res) => {
  res.render("dashboard/add", {
    layout: "../views/layouts/dashboard",
  });
};

/**
 * POST /
 * Add New Note
 */
exports.dashboardAddNoteSubmit = async (req, res) => {
  try {
    req.body.user = req.user.id;
    await Note.create(req.body);
    res.redirect("/dashboard");
  } catch (error) {
    console.error(error);
    res.send("Error adding note.");
  }
};

/**
 * GET /
 * Search Page
 */
exports.dashboardSearch = async (req, res) => {
  try {
    res.render("dashboard/search", {
      searchResults: "",
      layout: "../views/layouts/dashboard",
    });
  } catch (error) {
    console.error(error);
    res.send("Search page error.");
  }
};

/**
 * POST /
 * Search Results
 */
exports.dashboardSearchSubmit = async (req, res) => {
  try {
    const searchTerm = req.body.searchTerm.replace(/[^a-zA-Z0-9 ]/g, "");
    const searchResults = await Note.find({
      user: req.user.id,
      $or: [
        { title: { $regex: new RegExp(searchTerm, "i") } },
        { body: { $regex: new RegExp(searchTerm, "i") } },
      ],
    }).lean();

    res.render("dashboard/search", {
      searchResults,
      layout: "../views/layouts/dashboard",
    });
  } catch (error) {
    console.error(error);
    res.send("Search failed.");
  }
};
