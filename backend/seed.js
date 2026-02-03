// backend/seed.js
const mongoose = require('mongoose');
const connectDB = require('./config/db');
const bcrypt = require('bcryptjs');
require('dotenv').config();

// Import các Models
const NguoiDung = require('./models/NguoiDung');
const GiangVien = require('./models/GiangVien');
const LoaiKhoaHoc = require('./models/LoaiKhoaHoc');
const KhoaHoc = require('./models/KhoaHoc');
const BaiHoc = require('./models/BaiHoc');
const DangKy = require('./models/DangKy');

// ==========================================================
// PHẦN DỮ LIỆU (GIỮ NGUYÊN)
// ==========================================================

const dataGiangVien = [
    { _id: 1, TenGiangVien: 'Lê Văn Cường', Email: 'c@gmail.com', DienThoai: '0909123456', ChuyenMon: 'Lập trình Web' },
    { _id: 2, TenGiangVien: 'Trần Thanh My', Email: 'm@gmail.com', DienThoai: '0909561628', ChuyenMon: 'Lập trình cơ bản' },
    { _id: 3, TenGiangVien: 'Phạm Gia Bảo', Email: 'b@gmail.com', DienThoai: '0982628456', ChuyenMon: 'Thiết kế đồ họa' },
    { _id: 4, TenGiangVien: 'Lý Văn Sinh', Email: 's@gmail.com', DienThoai: '0937158306', ChuyenMon: 'Lập trình java' },
    { _id: 5, TenGiangVien: 'Lý A Sùng', Email: 'asung@gmail.com', DienThoai: '0937158111', ChuyenMon: 'Toán cao cấp' },
    { _id: 6, TenGiangVien: 'Ngọc Xuân Quỳnh', Email: 'quynh@gmail.com', DienThoai: '0937158132', ChuyenMon: 'Kĩ năng thuyết trình' },
    { _id: 7, TenGiangVien: 'Lý Thái Tổ', Email: 'ThaiT@gmail.com', DienThoai: '0937158154', ChuyenMon: 'Kĩ năng làm việc nhóm' },
    { _id: 8, TenGiangVien: 'Phạm Thị Dung', Email: 'd@gmail.com', DienThoai: '0909987654', ChuyenMon: 'Cơ sở dữ liệu' },
    { _id: 9, TenGiangVien: 'Nguyễn Văn Hòa', Email: 'hoa@gmail.com', DienThoai: '0911222333', ChuyenMon: 'Lập trình Python' },
    { _id: 10, TenGiangVien: 'Đặng Thị Mai', Email: 'mai@gmail.com', DienThoai: '0922333444', ChuyenMon: 'Trí tuệ nhân tạo' }
];

const dataLoaiKhoaHoc = [
    { _id: 1, TenLoai: 'Công nghệ thông tin' },
    { _id: 2, TenLoai: 'Thiết kế' },
    { _id: 3, TenLoai: 'Kỹ năng mềm' },
    { _id: 4, TenLoai: 'Ngoại ngữ' },
    { _id: 5, TenLoai: 'Kinh doanh' },
    { _id: 6, TenLoai: 'Marketing' },
    { _id: 7, TenLoai: 'Kế toán' },
    { _id: 8, TenLoai: 'Tài chính' },
    { _id: 9, TenLoai: 'Phát triển bản thân' },
    { _id: 10, TenLoai: 'Tin học văn phòng' }
];

const dataKhoaHoc = [
    { _id: 1, TenKhoaHoc: 'Lập trình Web cơ bản', MaGiangVien: 1, MaLoai: 1, MoTa: 'Học HTML, CSS, JS', ThoiLuong: '30 giờ', HocPhi: 1500000, TrangThai: 'Đang mở' },
    { _id: 2, TenKhoaHoc: 'SQL Server từ cơ bản', MaGiangVien: 2, MaLoai: 1, MoTa: 'Học SQL Server', ThoiLuong: '25 giờ', HocPhi: 1200000, TrangThai: 'Đang mở' },
{ _id: 3, TenKhoaHoc: 'Python cơ bản', MaGiangVien: 3, MaLoai: 1, MoTa: 'Học Python từ đầu', ThoiLuong: '40 giờ', HocPhi: 1800000, TrangThai: 'Đang mở' },
    { _id: 4, TenKhoaHoc: 'Thiết kế Photoshop', MaGiangVien: 4, MaLoai: 2, MoTa: 'Học thiết kế ảnh', ThoiLuong: '35 giờ', HocPhi: 1600000, TrangThai: 'Đang mở' },
    { _id: 5, TenKhoaHoc: 'Kỹ năng thuyết trình', MaGiangVien: 6, MaLoai: 3, MoTa: 'Tự tin nói trước đám đông', ThoiLuong: '20 giờ', HocPhi: 900000, TrangThai: 'Đang mở' },
    { _id: 6, TenKhoaHoc: 'Java nâng cao', MaGiangVien: 4, MaLoai: 1, MoTa: 'Lập trình Java OOP', ThoiLuong: '45 giờ', HocPhi: 2000000, TrangThai: 'Đang mở' },
    { _id: 7, TenKhoaHoc: 'Tin học văn phòng', MaGiangVien: 8, MaLoai: 7, MoTa: 'Word Excel PowerPoint', ThoiLuong: '30 giờ', HocPhi: 1000000, TrangThai: 'Đang mở' },
    { _id: 8, TenKhoaHoc: 'Marketing Online', MaGiangVien: 2, MaLoai: 6, MoTa: 'Facebook & Google Ads', ThoiLuong: '25 giờ', HocPhi: 1400000, TrangThai: 'Đang mở' },
    { _id: 9, TenKhoaHoc: 'Kế toán căn bản', MaGiangVien: 8, MaLoai: 5, MoTa: 'Nguyên lý kế toán', ThoiLuong: '30 giờ', HocPhi: 1500000, TrangThai: 'Đang mở' },
    { _id: 10, TenKhoaHoc: 'Giao tiếp hiệu quả', MaGiangVien: 7, MaLoai: 3, MoTa: 'Kỹ năng mềm', ThoiLuong: '15 giờ', HocPhi: 800000, TrangThai: 'Đang mở' }
];

const dataBaiHoc = [
    { _id: 1, MaKhoaHoc: 3, TenBaiHoc: 'Cài đặt Python', VideoURL: 'video4.mp4', TaiLieu: 'python.pdf' },
    { _id: 2, MaKhoaHoc: 3, TenBaiHoc: 'Biến và kiểu dữ liệu', VideoURL: 'video5.mp4', TaiLieu: 'bien.pdf' },
    { _id: 3, MaKhoaHoc: 4, TenBaiHoc: 'Công cụ Photoshop', VideoURL: 'video6.mp4', TaiLieu: 'ps.pdf' },
    { _id: 4, MaKhoaHoc: 5, TenBaiHoc: 'Kỹ năng mở đầu', VideoURL: 'video7.mp4', TaiLieu: 'giaotiep.pdf' },
    { _id: 5, MaKhoaHoc: 6, TenBaiHoc: 'Giới thiệu Java OOP', VideoURL: 'video8.mp4', TaiLieu: 'java.pdf' },
    { _id: 6, MaKhoaHoc: 7, TenBaiHoc: 'Word cơ bản', VideoURL: 'video9.mp4', TaiLieu: 'word.pdf' },
    { _id: 7, MaKhoaHoc: 8, TenBaiHoc: 'Chiến lược marketing', VideoURL: 'video10.mp4', TaiLieu: 'marketing.pdf' }
];

const dataDangKy = [
    { _id: 1, MaNguoiDung: 1, MaKhoaHoc: 1, TrangThai: 'DangHoc' },
    { _id: 2, MaNguoiDung: 2, MaKhoaHoc: 2, TrangThai: 'DangHoc' },
    { _id: 3, MaNguoiDung: 3, MaKhoaHoc: 3, TrangThai: 'DangHoc' },
    { _id: 4, MaNguoiDung: 4, MaKhoaHoc: 4, TrangThai: 'DangHoc' },
    { _id: 5, MaNguoiDung: 5, MaKhoaHoc: 5, TrangThai: 'DangHoc' },
    { _id: 6, MaNguoiDung: 6, MaKhoaHoc: 6, TrangThai: 'DangHoc' },
    { _id: 7, MaNguoiDung: 7, MaKhoaHoc: 7, TrangThai: 'DangHoc' },
    { _id: 8, MaNguoiDung: 8, MaKhoaHoc: 8, TrangThai: 'DangHoc' }
];

// ==========================================================
// PHẦN LOGIC ĐÃ SỬA (GIỮ NGUYÊN ID SỐ)
// ==========================================================
const seedDB = async () => {
    try {
        await connectDB();
        console.log("🚀 Đã kết nối DB...");

        // Xóa sạch dữ liệu cũ
        await Promise.all([
            NguoiDung.deleteMany({}),
            GiangVien.deleteMany({}),
            LoaiKhoaHoc.deleteMany({}),
            KhoaHoc.deleteMany({}),
            BaiHoc.deleteMany({}),
            DangKy.deleteMany({})
        ]);
        console.log("🧹 Đã dọn dẹp sạch Database cũ.");

        // Tạo mật khẩu mã hóa
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash('123', salt);

        // --- BƯỚC 1: TẠO USER (GIỮ ID SỐ) ---
        const dataNguoiDung = [
            { _id: 1, HoTen: 'Nguyễn Thị Bé', Email: 'ntb@gmail.com', MatKhau: hashedPassword, VaiTro: 'HocVien' },
            { _id: 2, HoTen: 'Trần Văn An', Email: 'tva@gmail.com', MatKhau: hashedPassword, VaiTro: 'HocVien' },
            { _id: 3, HoTen: 'Phan Thị Thanh', Email: 'ptt@gmail.com', MatKhau: hashedPassword, VaiTro: 'HocVien' },
            { _id: 4, HoTen: 'Võ Thành Minh', Email: 'vtm@gmail.com', MatKhau: hashedPassword, VaiTro: 'HocVien' },
            { _id: 5, HoTen: 'Lê Khánh', Email: 'lk@gmail.com', MatKhau: hashedPassword, VaiTro: 'HocVien' },
            { _id: 6, HoTen: 'Trần Bảo', Email: 'tb@gmail.com', MatKhau: hashedPassword, VaiTro: 'HocVien' },
            { _id: 7, HoTen: 'Nguyễn Nam', Email: 'nn@gmail.com', MatKhau: hashedPassword, VaiTro: 'HocVien' },
            { _id: 8, HoTen: 'Chí Tâm', Email: 'tam@gmail.com', MatKhau: hashedPassword, VaiTro: 'Admin' },
            { _id: 9, HoTen: 'Hoàng Minh Đức', Email: 'hmd@gmail.com', MatKhau: hashedPassword, VaiTro: 'HocVien' },
            { _id: 10, HoTen: 'Nguyễn Thảo Vy', Email: 'ntv@gmail.com', MatKhau: hashedPassword, VaiTro: 'HocVien' },
            { _id: 11, HoTen: 'Phạm Quốc Huy', Email: 'pqh@gmail.com', MatKhau: hashedPassword, VaiTro: 'HocVien' },
            { _id: 12, HoTen: 'Lê Mỹ Linh', Email: 'lml@gmail.com', MatKhau: hashedPassword, VaiTro: 'HocVien' },
            { _id: 13, HoTen: 'Bùi Anh Tuấn', Email: 'bat@gmail.com', MatKhau: hashedPassword, VaiTro: 'HocVien' },
            { _id: 14, HoTen: 'Admin', Email: 'admin@gmail.com', MatKhau: hashedPassword, VaiTro: 'Admin' }
        ];

        // Lưu trực tiếp mảng (bao gồm cả _id)
        await NguoiDung.insertMany(dataNguoiDung);
        console.log("✅ Đã tạo Users (ID số)");

        // --- BƯỚC 2: TẠO GIẢNG VIÊN & LOẠI (GIỮ ID SỐ) ---
        await GiangVien.insertMany(dataGiangVien);
        await LoaiKhoaHoc.insertMany(dataLoaiKhoaHoc);
        console.log("✅ Đã tạo Giảng viên & Loại (ID số)");

        // --- BƯỚC 3: TẠO KHÓA HỌC (Mapping FK) ---
        // Ta cần đổi tên trường để khớp với Schema (ví dụ: MaGiangVien -> giangVien)
const khoaHocDaXuLy = dataKhoaHoc.map(item => {
            return {
                _id: item._id, // Giữ ID số
                TenKhoaHoc: item.TenKhoaHoc,
                MoTa: item.MoTa,
                ThoiLuong: item.ThoiLuong,
                HocPhi: item.HocPhi,
                TrangThai: item.TrangThai,
                // Giả sử trong Schema bạn đặt tên là giangVien và loaiKhoaHoc
                // Và kiểu dữ liệu là Number (ref)
                giangVien: item.MaGiangVien, 
                loaiKhoaHoc: item.MaLoai
            };
        });
        await KhoaHoc.insertMany(khoaHocDaXuLy);
        console.log("✅ Đã tạo Khóa học (ID số)");

        // --- BƯỚC 4: TẠO BÀI HỌC ---
        const baiHocDaXuLy = dataBaiHoc.map(item => {
            return {
                _id: item._id,
                TenBaiHoc: item.TenBaiHoc,
                VideoURL: item.VideoURL,
                TaiLieu: item.TaiLieu,
                // Giả sử Schema BaiHoc bạn đặt tên là khoaHoc hoặc MaKhoaHoc
                khoaHoc: item.MaKhoaHoc // Lưu số ID khóa học (ví dụ: 3)
            };
        });
        await BaiHoc.insertMany(baiHocDaXuLy);
        console.log("✅ Đã tạo Bài học (ID số)");

        // --- BƯỚC 5: TẠO ĐĂNG KÝ ---
       const dangKyDaXuLy = dataDangKy.map(item => {
            return {
                _id: item._id,
                
                // [SỬA LẠI TÊN CHO KHỚP MODEL]
                // Bên Model là MaNguoiDung, thì ở đây phải là MaNguoiDung
                MaNguoiDung: item.MaNguoiDung, 
                
                // Bên Model là MaKhoaHoc, thì ở đây phải là MaKhoaHoc
                MaKhoaHoc: item.MaKhoaHoc,
                
                // Sửa thành chữ Hoa TrangThai cho khớp model (nếu model bạn sửa thành String)
                TrangThai: item.TrangThai, 
                
                // Các trường phụ không có trong Model thì nên bỏ đi hoặc phải thêm vào Model
                // baiHocDaHoanThanh: [], 
                // tienDo: 0
            };
        });
        await DangKy.insertMany(dangKyDaXuLy);
        console.log("✅ Đã tạo Đăng Ký (ID số)");

        console.log("🎉 Đã nhập FULL dữ liệu thành công!");
        process.exit();
    } catch (err) {
        console.error("❌ Lỗi:", err);
        process.exit(1);
    }
};

seedDB();