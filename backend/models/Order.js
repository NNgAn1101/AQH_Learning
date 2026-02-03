const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    MaUser: {
        type: Number, // Liên kết với ID người dùng
        required: true,
        ref: 'NguoiDung'
    },
    DanhSachKhoaHoc: [{
        type: Number, // Mảng ID các khóa học
        required: true,
        ref: 'KhoaHoc'
    }],
    TongTien: {
        type: Number,
        required: true
    },
    TrangThai: {
        type: String,
        default: 'DaThanhToan' // Mặc định là đã thanh toán vì đây là giả lập
    },
    PhuongThuc: {
        type: String,
        default: 'ChuyenKhoan'
    },
    NgayThanhToan: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Order', orderSchema);