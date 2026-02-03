const NguoiDung = require('../models/NguoiDung'); 
const jwt = require('jsonwebtoken');
const { getNextId } = require('../utils/helper'); 

// Hàm tạo Token
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '30d',
    });
};

// 1. Đăng ký tài khoản
exports.registerUser = async (req, res) => {
    try {
        const { HoTen, Email, MatKhau } = req.body;

        // Kiểm tra user tồn tại
        const userExists = await NguoiDung.findOne({ Email });
        if (userExists) {
            return res.status(400).json({ message: 'Email này đã được sử dụng' });
        }

        // Lấy ID tiếp theo
        const newId = await getNextId(NguoiDung);

        // Tạo user mới
        const user = await NguoiDung.create({
            _id: newId,
            HoTen,
            Email,
            MatKhau, 
            VaiTro: 'HocVien'
        });

        if (user) {
            res.status(201).json({
                _id: user._id,
                HoTen: user.HoTen,
                Email: user.Email,
                Token: generateToken(user._id),
                VaiTro: user.VaiTro
            });
        } else {
            res.status(400).json({ message: 'Dữ liệu không hợp lệ' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Lỗi Server' });
    }
};

// 2. Đăng nhập
exports.loginUser = async (req, res) => {
    try {
        const { Email, MatKhau } = req.body;

        // Tìm user theo Email
        const user = await NguoiDung.findOne({ Email });

        // Kiểm tra mật khẩu
        if (user && user.MatKhau === MatKhau) {
            res.json({
                _id: user._id,
                HoTen: user.HoTen,
                Email: user.Email,
                Token: generateToken(user._id),
                VaiTro: user.VaiTro
            });
        } else {
            res.status(401).json({ message: 'Email hoặc mật khẩu không đúng' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Lỗi Server' });
    }
};

// 3. Lấy thông tin cá nhân (Profile) -> ĐÃ SỬA
exports.getUserProfile = async (req, res) => {
    try {
        // 1. Dùng req.user._id (do AuthMiddleware cung cấp)
        // 2. Dùng .populate('courses') để lấy chi tiết khóa học từ mảng ID
        const user = await NguoiDung.findById(req.user._id)
            .populate('courses') 
            .select('-MatKhau'); // Loại bỏ mật khẩu khỏi kết quả trả về cho an toàn

        if (user) {
            res.json({
                _id: user._id,
                HoTen: user.HoTen,
                Email: user.Email,
                VaiTro: user.VaiTro,
                courses: user.courses // Đây là mảng khóa học đầy đủ (Tên, Ảnh, Giá...)
            });
        } else {
            res.status(404).json({ message: 'Không tìm thấy người dùng' });
        }
    } catch (error) {
        console.error("Lỗi Get Profile:", error);
        res.status(500).json({ message: 'Lỗi Server: ' + error.message });
    }
};