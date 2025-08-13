// Authentication routes: register, login, logout, and profile
const express = require('express');

const { registerUser, loginUser, logoutUser, getUserProfile } = require('../controllers/authController');

const { protect } = require('../middleware/authMiddleware');


const router = express.Router();


router.post('/register', registerUser);

router.post('/login', loginUser);

router.get('/logout', logoutUser);

// Secured endpoint that returns current user info if cookie token is valid
router.get('/profile', protect, getUserProfile);


module.exports = router;