const KhoaHoc = require('../models/KhoaHoc');
const BaiHoc = require('../models/BaiHoc');
const { getNextId } = require('../utils/helper'); 

// Load các Model liên quan để populate hoạt động (Bắt buộc)
require('../models/GiangVien'); 
require('../models/LoaiKhoaHoc');

// 1. Lấy danh sách tất cả khóa học
const getAllCourses = async (req, res) => {
    try {
        const courses = await KhoaHoc.find()
            .populate('MaGiangVien', 'TenGiangVien ChuyenMon')
            .populate('MaLoai', 'TenLoai');
        res.json(courses);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// 2. Lấy chi tiết 1 khóa học theo ID
// (Đã sửa lại để trả về đúng object course cho Frontend)
const getCourseById = async (req, res) => {
    try {
        // Tìm khóa học và populate thông tin giảng viên + loại
        const course = await KhoaHoc.findById(req.params.id)
            .populate('MaGiangVien', 'TenGiangVien ChuyenMon')
            .populate('MaLoai', 'TenLoai');

        if (!course) {
            return res.status(404).json({ msg: 'Không tìm thấy khóa học' });
        }

        // Nếu muốn lấy thêm bài học sau này thì bỏ comment dòng dưới
        // const lessons = await BaiHoc.find({ MaKhoaHoc: req.params.id });
        
        // TRẢ VỀ: Trả về trực tiếp object course để Frontend dễ dùng (course.TenKhoaHoc)
        res.json(course); 
    } catch (err) {
        console.error(err);
        if (err.kind === 'ObjectId') {
            return res.status(404).json({ msg: 'ID khóa học không hợp lệ' });
        }
        res.status(500).json({ error: err.message });
    }
};

// 3. Tạo khóa học mới
const createCourse = async (req, res) => {
    try {
        const newId = await getNextId(KhoaHoc);
        const newCourse = await KhoaHoc.create({ _id: newId, ...req.body });
        res.status(201).json({ msg: 'Tạo khóa học thành công', data: newCourse });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// 4. Thêm bài học vào khóa học
const addLesson = async (req, res) => {
    try {
        const newId = await getNextId(BaiHoc);
        const newLesson = await BaiHoc.create({ _id: newId, ...req.body });
        res.status(201).json({ msg: 'Thêm bài học thành công', data: newLesson });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

module.exports = { getAllCourses, getCourseById, createCourse, addLesson };