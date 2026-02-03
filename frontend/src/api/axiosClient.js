import axios from 'axios';

const axiosClient = axios.create({
    baseURL: 'http://localhost:5000/api',
    headers: {
        'Content-Type': 'application/json',
    },
});

// --- PHẦN QUAN TRỌNG NHẤT: INTERCEPTOR ---
// Trước khi gửi bất kỳ request nào đi, đoạn này sẽ chạy
axiosClient.interceptors.request.use(async (config) => {
    // 1. Lấy token từ bộ nhớ (lúc đăng nhập xong đã lưu vào đây)
    const token = localStorage.getItem('token');
    
    // 2. Nếu có token, kẹp nó vào Header "Authorization"
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    
    return config;
}, (error) => {
    return Promise.reject(error);
});

export default axiosClient;