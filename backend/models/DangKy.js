const mongoose = require('mongoose');

const dangKySchema = new mongoose.Schema({
    _id: Number, 

    MaNguoiDung: { 
        type: Number, 
        required: true,
        ref: 'NguoiDung' 
    },
    
    MaKhoaHoc: { 
        type: Number, 
        required: true,
        ref: 'KhoaHoc' 
    },
    
    NgayDangKy: { 
        type: Date, 
        default: Date.now 
    },
    
    // [SỬA QUAN TRỌNG] Đổi thành String để lưu được chữ "DangHoc"
    TrangThai: { 
        type: String, 
        default: 'ChoDuyet'
    }
});

module.exports = mongoose.model('DangKy', dangKySchema);