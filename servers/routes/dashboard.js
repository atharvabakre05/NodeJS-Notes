const express = require('express');
const router = express.Router();
const dashboardController = require('../Controllers/dashboardController');


//Dashboard Routes
router.get('/dashboard', dashboardController.dashboard);


module.exports = router;