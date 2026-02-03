const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const path = require('path'); 
const authRoutes = require('./routes/auth');
require('dotenv').config(); 

// 1. Kết nối Database
connectDB();

const app = express();

// 2. Middleware
app.use(cors({
    origin: [
        "http://localhost:5173",                
        "https://aqh-learning.vercel.app"       
    ],
    credentials: true // Cho phép gửi cookie/token nếu có
}));
app.use(express.json()); 

// Cấu hình phục vụ file tĩnh (Frontend)
app.use(express.static(path.join(__dirname, '../frontend')));

// 3. Routes API
// --- User & Auth ---
app.use('/api/users', require('./routes/userRoutes'));

// --- Khóa học ---
app.use('/api/courses', require('./routes/courseRoutes'));

// --- Bài học ---
app.use('/api/lessons', require('./routes/lessonRoutes'));

// --- Đơn hàng & Thanh toán (MỚI THÊM) ---
// Đây là route quan trọng để chức năng Giỏ hàng & Lịch sử hoạt động
app.use('/api/orders', require('./routes/orderRoutes'));

// SỬA THÀNH:
app.use('/api/auth', authRoutes);
// 4. Route Trang chủ (Phục vụ file index.html của Frontend)
app.get('/', (req, res) => {
    res.status(200).send("<h1>Server AQH Learning đang chạy ngon lành! </h1>");
})

// Route Test
app.get('/test-api', (req, res) => {
    res.send("API Test đang hoạt động!");
});

// 5. Chạy Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    console.log(`Frontend is being served from: ${path.join(__dirname, '../frontend')}`);
    console.log(`Order API ready at: http://localhost:${PORT}/api/orders`);
});