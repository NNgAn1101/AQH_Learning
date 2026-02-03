const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authMiddleware = require('../middleware/authMiddleware'); // Middleware bảo vệ

// --- KIỂM TRA LỖI (Debug) ---
// Nếu dòng này in ra "undefined" thì file controller chưa export đúng
console.log("Check registerUser:", typeof userController.registerUser);
console.log("Check loginUser:", typeof userController.loginUser);
console.log("Check getUserProfile:", typeof userController.getUserProfile);

// 1. Đăng ký
router.post('/register', userController.registerUser);

// 2. Đăng nhập
router.post('/login', userController.loginUser);

router.get('/profile', authMiddleware, userController.getUserProfile);

module.exports = router;