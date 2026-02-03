const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');
const authMiddleware = require('../middleware/authMiddleware'); 

// --- KIỂM TRA LỖI (Debug) ---
// Nếu server chạy lên mà thấy dòng nào in ra "undefined" hoặc "object" thì là lỗi ở đó
console.log("Check AuthMiddleware:", typeof authMiddleware); // Phải là 'function'
console.log("Check createOrder:", typeof orderController.createOrder); // Phải là 'function'
console.log("Check getMyOrders:", typeof orderController.getMyOrders); // Phải là 'function'

// Định nghĩa Route
// Cấu trúc chuẩn: router.post('đường_dẫn', hàm_middleware, hàm_controller)
router.post('/', authMiddleware, orderController.createOrder);
router.get('/history', authMiddleware, orderController.getMyOrders);

module.exports = router;