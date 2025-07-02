// servers/Controllers/mainController.js

// Get Homepage
exports.homepage = async (req, res) => {
    const title = "NodeJs Notes";
    const description = "Free NodeJs Notes app";

    res.render('index', {
        title,
        description,
        layout: 'layouts/front-page'  // ✅ fixed: path is relative to 'views' folder
    });
};

// Get About
exports.about = async (req, res) => {
    res.render('about', {
        title: "About - NodeJs Notes",
        description: "Free NodeJs Notes app",
        layout: 'layouts/main' // Optional: use default or explicitly set it
    });
};
