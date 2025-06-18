require('dotenv').config();

const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const path = require('path');

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Static Files
app.use(express.static(path.join(__dirname, 'public')));  // fixed path

// Templating engine
app.use(expressLayouts);
app.set('layout', './layouts/main'); // optional: remove if you’re not using layouts
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

//Routes
app.use('/', require('./servers/routes/index'));

// Start server
app.listen(port, () => {
    console.log(`App listening on port ${port}`);
});
