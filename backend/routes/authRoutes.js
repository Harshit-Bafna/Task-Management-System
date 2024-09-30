const express = require('express');
const { register, login, logout, getAllUsers, getUserRole} = require('../controllers/authController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.post('/logout', authMiddleware, logout);
router.get('/admin/users', authMiddleware, getAllUsers);
router.get('/user/role', authMiddleware, getUserRole);

module.exports = router;
