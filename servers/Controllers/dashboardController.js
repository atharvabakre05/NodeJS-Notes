// servers/Controllers/dashboardController.js

// Get Dashboard
exports.dashboard = async (req, res) => {
    const title = "Dashboard";
    const description = "Free NodeJs Notes app";

    res.render('dashboard/index', {
        title,
        description,
        layout: 'layouts/dashboard'  // ✅ layout path must be relative to /views
    });
};
