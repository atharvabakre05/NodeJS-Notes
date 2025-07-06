// servers/Controllers/dashboardController.js
const Note = require('../models/Notes');
const mongoose = require('mongoose');
// Get Dashboard
exports.dashboard = async (req, res) => {
    const title = "Dashboard";
    const description = "Free NodeJs Notes app";

    res.render('dashboard/index', {
        username: req.user.firstName,
        description,
        layout: 'layouts/dashboard'  // ✅ layout path must be relative to /views
    });
};
