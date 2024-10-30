const express = require("express");
const { searchOpportunities } = require('../controllers/MatchOpportunities');
const router = express.Router();
router.get('/', (req, res, next) => {
    console.log('Received a GET request at /api/match');
    console.log('Query parameters:', req.query);
    next(); // Pass control to the next middleware or route handler
}, searchOpportunities);
module.exports = router;