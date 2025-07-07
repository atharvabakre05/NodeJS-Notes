require('dotenv').config();

const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const methodOverride = require('method-override');
const path = require('path');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const passport = require('passport');
const connectDB = require('./servers/config/db');

const app = express();
const port = process.env.PORT || 5000;

// MongoDB connection
connectDB();

// Body parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride("_method"));

// Session management
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  store: MongoStore.create({
    mongoUrl: process.env.MONGODB_URI
  }),
  // cookie: { maxAge: new Date (Date.now() + (36000000)) }
}));

// Passport setup
app.use(passport.initialize());
app.use(passport.session());

// Static files
app.use(express.static(path.join(__dirname, 'public')));

// View engine
app.use(expressLayouts);
app.set('layout', './layouts/main');
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Routes
app.use('/', require('./servers/routes/auth'));
app.use('/', require('./servers/routes/index'));
app.use('/', require('./servers/routes/dashboard'));

// 404 Page
app.use((req, res) => {
  res.status(404).render('404', {
    title: '404 - Page Not Found',
    description: 'This page does not exist.',
    layout: 'layouts/front-page'
  });
});

// Start server
app.listen(port, () => {
  console.log(`✅ App listening on port ${port}`);
});
