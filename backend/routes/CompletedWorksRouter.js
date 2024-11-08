const express = require('express');
const router = express.Router();
const { 
    SaveCompletedWorks, 
    GetUserCompletedWorks,
    DeleteCompletedWork 
} = require('../controllers/CompletedWorksController');

// Route to save completed works
router.post('/', SaveCompletedWorks);

// Route to get user's completed works
router.get('/:userId', GetUserCompletedWorks);

// Route to delete a completed work
router.delete('/:userId/:workId', DeleteCompletedWork);

module.exports = router;