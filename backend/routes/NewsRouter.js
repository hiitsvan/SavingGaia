const express = require('express');
const { getAllNews } = require('../controllers/NewsController');
const router = express.Router();

// Define the route to get all news
router.get('/', getAllNews);

module.exports = router;
