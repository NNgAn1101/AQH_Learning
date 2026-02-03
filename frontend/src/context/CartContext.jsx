import { createContext, useState, useEffect } from 'react';
// 1. IMPORT TOAST
import { toast } from 'react-toastify'; 

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
    // Lấy giỏ hàng từ LocalStorage khi khởi động
    const [cart, setCart] = useState(() => {
        const savedCart = localStorage.getItem('aqh_cart');
        return savedCart ? JSON.parse(savedCart) : [];
    });

    // Mỗi khi cart thay đổi, lưu ngay vào LocalStorage
    useEffect(() => {
        localStorage.setItem('aqh_cart', JSON.stringify(cart));
    }, [cart]);

    // Thêm vào giỏ
    const addToCart = (course) => {
        const isExist = cart.find(item => item._id === course._id);
        if (isExist) {
            // SỬA: Dùng toast warning
            toast.warning('Khóa học này đã có trong giỏ hàng rồi! ⚠️');
            return;
        }
        setCart([...cart, course]);
        // SỬA: Dùng toast success
        toast.success('Đã thêm vào giỏ hàng! 🛒');
    };

    // Xóa khỏi giỏ
    const removeFromCart = (courseId) => {
        setCart(cart.filter(item => item._id !== courseId));
        // Có thể thêm toast nếu muốn: toast.info("Đã xóa khóa học khỏi giỏ");
    };

    // Xóa sạch giỏ (sau khi thanh toán)
    const clearCart = () => setCart([]);

    // Tính tổng tiền
    const cartTotal = cart.reduce((total, item) => total + item.HocPhi, 0);

    return (
        <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart, cartTotal }}>
            {children}
        </CartContext.Provider>
    );
};