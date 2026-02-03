const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
    console.log("------------------------------------------------");
    console.log("🕵️ [Middleware] Đang kiểm tra yêu cầu...");

    // 1. Lấy token từ header
    const authHeader = req.header('Authorization');
    console.log("1. Header nhận được:", authHeader);
    
    // 2. Kiểm tra xem có gửi token lên không
    if (!authHeader) {
        console.log("❌ Lỗi: Không có Header Authorization!");
        return res.status(401).json({ message: "Không tìm thấy Token xác thực!" });
    }

    try {
        // 3. Lọc bỏ chữ "Bearer " để lấy chuỗi token sạch
        const token = authHeader.replace('Bearer ', '');
        console.log("2. Token trần (đã lọc):", token);
        
        // 4. Giải mã token
        // CHÚ Ý: Key ở đây phải khớp 100% với authController
        const decoded = jwt.verify(token, 'YOUR_SECRET_KEY'); 
        console.log("✅ Giải mã thành công! User ID:", decoded._id);
        
        req.user = decoded; 
        next(); 
    } catch (error) {
        console.log("❌ Lỗi giải mã:", error.message);
        // Đây là manh mối quan trọng nhất:
        // - "invalid signature" => Sai Key bí mật
        // - "jwt malformed" => Token bị rách/sai định dạng
        // - "jwt expired" => Token hết hạn
        
        res.status(401).json({ message: "Token không hợp lệ! Chi tiết: " + error.message });
    }
};

module.exports = authMiddleware;