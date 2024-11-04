const express = require("express");
const { searchOpportunities, getOpportunityById } = require('../controllers/OpportunitiesController');
const router = express.Router();
router.get('/', (req, res, next) => {
    console.log('Received a GET request at /opportunities');
    console.log('Query parameters:', req.query);
    next(); // Pass control to the next middleware or route handler
}, searchOpportunities);
router.get('/:id', getOpportunityById);
module.exports = router;