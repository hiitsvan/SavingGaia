const express = require("express");
const { SaveToLikes } = require('../controllers/SaveToLikes');
const router = express.Router();
router.post('/', SaveToLikes);
module.exports = router;