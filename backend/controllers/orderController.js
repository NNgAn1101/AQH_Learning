const Order = require('../models/Order');
const NguoiDung = require('../models/NguoiDung');

// 1. Tạo đơn hàng
exports.createOrder = async (req, res) => {
    try {
        // [QUAN TRỌNG] Frontend gửi: { orderItems, totalPrice }
        // Nên ta phải lấy đúng tên biến đó
        const { orderItems, totalPrice, paymentMethod } = req.body;
        
        // Kiểm tra User từ Token (Middleware đã gắn vào req.user)
        // Lưu ý: Token thường giải mã ra _id (có dấu gạch dưới)
        if (!req.user || !req.user._id) {
            return res.status(401).json({ message: 'User chưa xác thực (Token lỗi)' });
        }

        // Kiểm tra dữ liệu đầu vào
        if (!orderItems || orderItems.length === 0) {
            return res.status(400).json({ message: 'Không có sản phẩm nào để thanh toán' });
        }

        // Tách lấy mảng ID các khóa học từ orderItems
        // Ví dụ: orderItems = [{_id: 1, Ten...}, {_id: 2, Ten...}]
        // => courseIds = [1, 2]
        const courseIds = orderItems.map(item => item._id);

        // BƯỚC 1: Tạo đơn hàng mới
        const newOrder = new Order({
            MaUser: req.user._id,        // Lấy ID người dùng
            DanhSachKhoaHoc: courseIds,  // Lưu danh sách ID khóa học
            TongTien: totalPrice,     
            PhuongThuc: paymentMethod || 'COD',
            NgayThanhToan: new Date(),
            TrangThai: 'DaThanhToan'     // Mặc định là đã thanh toán (vì là COD hoặc giả lập)
        });
        
        await newOrder.save();

        // BƯỚC 2: Cập nhật khóa học vào tài khoản User
        // (Để sau này User vào xem "Khóa học của tôi")
        await NguoiDung.findByIdAndUpdate(req.user._id, {
            $addToSet: { 
                courses: { $each: courseIds } // Thêm mảng ID vào field courses
            } 
        });

        res.status(201).json({ message: 'Thanh toán thành công', order: newOrder });

    } catch (error) {
        console.error("Lỗi Create Order:", error);
        res.status(500).json({ message: 'Lỗi server khi thanh toán', error: error.message });
    }
};

// 2. Lấy lịch sử mua hàng
exports.getMyOrders = async (req, res) => {
    try {
        // Tìm đơn hàng theo ID người dùng (req.user._id)
        const orders = await Order.find({ MaUser: req.user._id })
            .populate('DanhSachKhoaHoc', 'TenKhoaHoc HinhAnh HocPhi') // Lấy chi tiết khóa học
            .sort({ NgayThanhToan: -1 }); // Mới nhất lên đầu
            
        res.json(orders);
    } catch (error) {
        console.error("Lỗi Get History:", error);
        res.status(500).json({ message: 'Lỗi lấy lịch sử đơn hàng' });
    }
};