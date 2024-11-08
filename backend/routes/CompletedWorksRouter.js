const express = require('express');
const router = express.Router();
const { 
    SaveCompletedWorks, 
    GetUserCompletedWorks,
    DeleteCompletedWork 
} = require('../controllers/CompletedWorksController');

// POST /completed-works
router.post('/', SaveCompletedWorks);

// GET /completed-works/:userId
router.get('/:userId', GetUserCompletedWorks);

// DELETE /completed-works/:userId/:workId
router.delete('/:userId/:workId', DeleteCompletedWork);

module.exports = router;