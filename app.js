require('dotenv').config();

const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const path = require('path');
const connectDB = require('./servers/config/db');
 
const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


//Connect to Database
connectDB();

// Static Files
app.use(express.static(path.join(__dirname, 'public')));

// Templating Engine
app.use(expressLayouts);
app.set('layout', './layouts/main'); // or 'front-page'
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Routes
const mainRoutes = require('./servers/routes/index');
app.use('/', mainRoutes);
app.use('/', require('./servers/routes/dashboard'));

// 404 Handler
app.use((req, res) => {
  res.status(404).render('404', {
    title: '404 - Page Not Found',
    description: 'This page does not exist.',
    layout: 'layouts/front-page'
  });
});

// Start Server
app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
