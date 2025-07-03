require('dotenv').config();

const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const path = require('path');
const connectDB = require('./servers/config/db');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const passport = require('passport'); // ✅ Required for passport.initialize()

const app = express();
const port = process.env.PORT || 5000;

app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  store: MongoStore.create({
    mongoUr1: process.env.MONGODB_URI
  })
}));


app.use(passport.initialize());
app.use(passport.session());
// Connect to MongoDB
connectDB();

// Middleware to parse request data
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Initialize Passport
app.use(passport.initialize());
// app.use(passport.session()); // Uncomment if using sessions

// Static Files
app.use(express.static(path.join(__dirname, 'public')));

// Templating Engine
app.use(expressLayouts);
app.set('layout', './layouts/main'); // or 'front-page'
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Routes
const mainRoutes = require('./servers/routes/index');
const authRoutes = require('./servers/routes/auth');
const dashboardRoutes = require('./servers/routes/dashboard');

app.use('/', authRoutes);
app.use('/', mainRoutes);
app.use('/', dashboardRoutes);

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
  console.log(`✅ App listening on port ${port}`);
});
