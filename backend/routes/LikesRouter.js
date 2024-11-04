const express = require('express');
const router = express.Router();
const { SaveToLikes, CheckIfLiked, RemoveFromLikes } = require('../controllers/LikesController');

// Route to save an opportunity to likes
router.post('/', SaveToLikes);

// Route to check if an opportunity is liked
router.get('/:userId/:opportunityId', CheckIfLiked);

// Route to remove an opportunity from likes
router.delete('/:userId/:opportunityId', RemoveFromLikes);

module.exports = router;
