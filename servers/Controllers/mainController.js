// Get Homepage
exports.homepage = async (req, res) => {
    const title = "NodeJs Notes";
    const description = "Free NodeJs Notes app";

    res.render('index', {
        title,
        description,
        layout: '../views/layouts/front-page'
    });
};


// Get About
exports.about = async (req, res) => {
    res.render('about', {
        title: "About - NodeJs Notes",
        description: "Free NodeJs Notes app"
    });
}; 
