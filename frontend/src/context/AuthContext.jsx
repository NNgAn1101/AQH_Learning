import { createContext, useState, useEffect } from 'react';
import { jwtDecode } from "jwt-decode";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    // Kiểm tra đăng nhập mỗi khi F5 trang
    useEffect(() => {
        // [SỬA 1] Dùng đúng tên key 'token' để khớp với axiosClient
        const token = localStorage.getItem('token');
        
        if (token) {
            try {
                const decoded = jwtDecode(token);
                
                // [MỚI] Kiểm tra hết hạn token
                const currentTime = Date.now() / 1000;
                if (decoded.exp < currentTime) {
                    console.warn("Token hết hạn -> Đăng xuất");
                    localStorage.removeItem('token');
                    setUser(null);
                } else {
                    // [SỬA 2] MongoDB trả về _id, lưu ý lấy đúng trường
                    setUser({ 
                        _id: decoded._id, // Quan trọng: phải là _id
                        Role: decoded.Role 
                    });
                }
            } catch (error) {
                console.error("Token lỗi:", error);
                localStorage.removeItem('token');
                setUser(null);
            }
        }
        setLoading(false);
    }, []);

    // Hàm Login
    const login = (token, userData) => {
        // [SỬA 3] Lưu đúng key 'token'
        localStorage.setItem('token', token);
        setUser(userData); 
    };

    // Hàm Logout
    const logout = () => {
        // [SỬA 4] Xóa đúng key 'token'
        localStorage.removeItem('token');
        setUser(null);
        window.location.href = '/login';
    };

    return (
        <AuthContext.Provider value={{ user, login, logout, loading }}>
            {children}
        </AuthContext.Provider>
    );
};