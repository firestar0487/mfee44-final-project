const express = require('express');
const userController = require('../controllers/userController');
const authController = require('../controllers/authController')
const authenticateToken = require('../middleware/authenticateToken')

const router = express.Router();

router.post('/api/register', userController.register);
router.post('/api/verify', userController.verify);
router.post('/api/login', authController.login);

router.get('/api/profile', authenticateToken, userController.getProfile);

module.exports = router;
