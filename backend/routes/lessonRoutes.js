const express = require('express');
const router = express.Router();
const lessonController = require('../controllers/lessonController');
// Sửa cách import middleware cho khớp với file authMiddleware.js
const protect = require('../middleware/authMiddleware'); 

// --- DEBUG ---
console.log("Check getLessonContent:", typeof lessonController.getLessonContent);

// 1. Lấy danh sách bài học (Public - Ai cũng xem được list bài)
router.get('/course/:courseId', lessonController.getLessonsByCourseId);

// 2. Xem nội dung bài học (PROTECT - Phải đăng nhập & Đã mua)
// Route này dùng cho trang LearningPage
router.get('/:id', protect, lessonController.getLessonContent);

// 3. Tạo bài học (Tạm thời để Public test cho dễ, sau này thêm protect)
router.post('/', lessonController.createLesson);

module.exports = router;