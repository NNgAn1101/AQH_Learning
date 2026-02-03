const NguoiDung = require('../models/NguoiDung'); 
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs'); 

// --- HÀM ĐĂNG KÝ (Đã sửa logic tự tăng ID) ---
exports.register = async (req, res) => {
    try {
        const { HoTen, Email, MatKhau } = req.body;

        // 1. Kiểm tra xem email đã tồn tại chưa
        const existingUser = await NguoiDung.findOne({ Email });
        if (existingUser) {
            return res.status(400).json({ message: "Email này đã được sử dụng!" });
        }

        // 2. TỰ ĐỘNG TẠO ID SỐ (Fix lỗi của bạn ở đây)
        // Tìm người dùng có ID lớn nhất hiện tại
        const lastUser = await NguoiDung.findOne().sort({ _id: -1 });
        const newId = lastUser ? lastUser._id + 1 : 1; // Nếu có người thì +1, chưa có thì là 1

        // 3. Mã hóa mật khẩu
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(MatKhau, salt);

        // 4. Tạo user mới với ID vừa tạo
        const newUser = new NguoiDung({
            _id: newId, // Gán ID số vào đây
            HoTen,
            Email,
            MatKhau: hashedPassword,
            Role: 'HocVien', // Mặc định là Học viên
            VaiTro: 'HocVien' // Lưu cả 2 trường cho chắc (do database cũ của bạn dùng VaiTro)
        });

        await newUser.save();

        res.status(201).json({ message: "Đăng ký thành công! Hãy đăng nhập ngay." });

    } catch (error) {
        console.error("Lỗi đăng ký:", error);
        res.status(500).json({ message: "Lỗi server: " + error.message });
    }
};

// --- HÀM ĐĂNG NHẬP ---
exports.login = async (req, res) => {
    try {
        const { Email, MatKhau } = req.body;

        // 1. Tìm user theo Email
        const user = await NguoiDung.findOne({ Email });
        if (!user) {
            return res.status(400).json({ message: "Email hoặc mật khẩu không đúng!" });
        }

        // 2. Kiểm tra mật khẩu
        const isMatch = await bcrypt.compare(MatKhau, user.MatKhau);
        if (!isMatch) {
            return res.status(400).json({ message: "Email hoặc mật khẩu không đúng!" });
        }

        // 3. Tạo Token
        const token = jwt.sign(
            { _id: user._id, Role: user.VaiTro || user.Role }, // Lấy VaiTro hoặc Role
            'YOUR_SECRET_KEY', // Nhớ đổi thành key bí mật của bạn
            { expiresIn: '1d' }
        );

        // 4. Trả về kết quả
        res.json({
            token, 
            user: {
                _id: user._id,
                HoTen: user.HoTen,
                Email: user.Email,
                Role: user.VaiTro || user.Role
            }
        });

    } catch (error) {
        console.error("Lỗi đăng nhập:", error);
        res.status(500).json({ message: "Lỗi server: " + error.message });
    }
};