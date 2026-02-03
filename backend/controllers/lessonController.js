const BaiHoc = require('../models/BaiHoc');
const NguoiDung = require('../models/NguoiDung'); 
const { getNextId } = require('../utils/helper'); 

// 1. Lấy danh sách bài học theo ID Khóa học (Dùng cho trang Course Detail)
exports.getLessonsByCourseId = async (req, res) => {
    try {
        const courseId = req.params.courseId;
        // Chỉ trả về tên bài, mô tả, thời lượng (không trả VideoURL để bảo mật nhẹ)
        const lessons = await BaiHoc.find({ MaKhoaHoc: courseId })
                                    .select('-VideoURL -NoiDungChiTiet'); 
        res.json(lessons);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Lỗi lấy danh sách bài học' });
    }
};

// 2. Lấy nội dung chi tiết bài học (Có CHECK QUYỀN đã mua chưa)
exports.getLessonContent = async (req, res) => {
    try {
        const { id } = req.params;
        const userId = req.user.id; // Lấy từ token

        // a. Tìm bài học
        const lesson = await BaiHoc.findById(id);
        if (!lesson) {
            return res.status(404).json({ message: "Không tìm thấy bài học" });
        }

        // b. Lấy thông tin User để xem danh sách khóa học đã mua
        const user = await NguoiDung.findById(userId);

        // c. Kiểm tra: Bài học này thuộc khóa học nào -> User đã có khóa học đó trong mảng 'courses' chưa?
        // Lưu ý: lesson.MaKhoaHoc và item trong user.courses có thể khác kiểu (String vs Number), nên dùng == hoặc ép kiểu
        const isRegistered = user.courses.some(courseId => courseId == lesson.MaKhoaHoc);

        // d. Logic trả về
        if (isRegistered) {
            // ĐÃ MUA: Trả về Full nội dung (Video, Tài liệu...)
            return res.json({
                success: true,
                lesson
            });
        } else {
            // CHƯA MUA: Chặn lại
            return res.status(403).json({
                success: false,
                message: "Bạn cần mua khóa học để xem nội dung này",
                // Chỉ trả về thông tin cơ bản
                lesson: {
                    _id: lesson._id,
                    TenBaiHoc: lesson.TenBaiHoc,
                    MaKhoaHoc: lesson.MaKhoaHoc
                }
            });
        }

    } catch (error) {
        console.error("Lỗi lấy bài học:", error);
        res.status(500).json({ message: "Lỗi server" });
    }
};

// 3. Tạo bài học mới
exports.createLesson = async (req, res) => {
    try {
        const newId = await getNextId(BaiHoc);
        const newLesson = await BaiHoc.create({ _id: newId, ...req.body });
        res.status(201).json({ message: 'Tạo bài học thành công', data: newLesson });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};