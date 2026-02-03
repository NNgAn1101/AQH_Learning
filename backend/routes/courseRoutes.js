const express = require('express');
const router = express.Router();
// Import đúng tên hàm getCourseById vừa sửa
const { getAllCourses, getCourseById, createCourse, addLesson } = require('../controllers/courseController');

// Định nghĩa các route
router.get('/', getAllCourses);         // Lấy tất cả
router.get('/:id', getCourseById);      // Lấy chi tiết 1 cái
router.post('/', createCourse);         // Tạo khóa học
router.post('/lesson', addLesson);      // Thêm bài học

module.exports = router;