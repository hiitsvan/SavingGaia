const express = require("express");
const { registerUser, logoutUser, verifyToken } = require('../controllers/AuthController');
const router = express.Router();
router.post('/register', registerUser);
// router.post('/login',loginUser)
router.post('/logout', logoutUser)
router.post('/verify-token', verifyToken)
module.exports = router;