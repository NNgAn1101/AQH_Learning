import { useContext, useState } from 'react';
import { CartContext } from '../context/CartContext';
import { AuthContext } from '../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import { FaTrash, FaCreditCard, FaArrowRight, FaTag, FaShieldAlt, FaUndo, FaLock } from 'react-icons/fa';
// [QUAN TRỌNG] Import axiosClient để có Token
import axiosClient from '../api/axiosClient'; 
import { toast } from 'react-toastify'; 

const CartPage = () => {
    const { cart, removeFromCart, cartTotal, clearCart } = useContext(CartContext);
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    // Format tiền tệ
    const formatMoney = (amount) => 
        new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount);

    // --- XỬ LÝ THANH TOÁN (ĐÃ SỬA) ---
    const handleCheckout = async () => {
        // 1. Kiểm tra đăng nhập
        if (!user) {
            toast.info("Vui lòng đăng nhập để thanh toán! 🔒");
            navigate('/login');
            return;
        }

        // 2. Kiểm tra giỏ hàng
        if (cart.length === 0) {
            toast.warn("Giỏ hàng đang trống!");
            return;
        }

        setLoading(true);
        try {
            // 3. GỌI API (Dùng axiosClient để tự động kẹp Token)
            // Backend cần biết: Mua cái gì? Tổng tiền bao nhiêu?
            const res = await axiosClient.post('/orders', {
                orderItems: cart,         // Gửi toàn bộ danh sách giỏ hàng
                totalPrice: cartTotal,    // Tổng tiền
                paymentMethod: 'COD'      // Mặc định phương thức thanh toán
            });
            
            // 4. Thành công
            console.log("Order created:", res.data);
            clearCart(); // Xóa giỏ hàng sau khi mua thành công
            toast.success("Thanh toán thành công! 🎉");
            
            // Chuyển hướng đến trang cảm ơn (hoặc lịch sử mua hàng)
            navigate('/'); 
            
        } catch (error) {
            console.error("Lỗi thanh toán:", error);
            // Lấy thông báo lỗi từ Backend trả về (nếu có)
            const message = error.response?.data?.message || "Thanh toán thất bại. Vui lòng thử lại!";
            toast.error(message);
        } finally {
            setLoading(false);
        }
    };

    // --- GIAO DIỆN KHI GIỎ HÀNG TRỐNG ---
    if (cart.length === 0) return (
        <div className="pt-28 pb-20 min-h-screen bg-gray-50 flex items-center justify-center">
            <div className="text-center">
                <div className="w-64 h-64 mx-auto mb-6 bg-blue-50 rounded-full flex items-center justify-center">
                    <img 
                        src="https://cdn-icons-png.flaticon.com/512/11329/11329060.png" 
                        alt="Empty Cart" 
                        className="w-40 h-40 opacity-80 object-contain"
                    />
                </div>
                <h2 className="text-3xl font-extrabold text-gray-800 mb-3">Giỏ hàng của bạn đang trống</h2>
                <p className="text-gray-500 mb-8 max-w-md mx-auto">
                    Có vẻ như bạn chưa thêm khóa học nào. Hãy quay lại và tìm kiếm kiến thức phù hợp nhé!
                </p>
                <Link 
                    to="/" 
                    className="inline-flex items-center gap-2 px-8 py-4 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 transition shadow-lg shadow-blue-500/30 transform hover:-translate-y-1"
                >
                    Khám phá khóa học <FaArrowRight />
                </Link>
            </div>
        </div>
    );

    // --- GIAO DIỆN CHÍNH ---
    return (
        <div className="pt-32 pb-20 min-h-screen bg-gray-50 relative overflow-hidden">
            
            {/* Background Blobs */}
            <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden">
                <div className="absolute top-20 -left-20 w-96 h-96 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30"></div>
                <div className="absolute top-40 right-0 w-96 h-96 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30"></div>
            </div>

            <div className="container mx-auto px-6 relative z-10">
                <h1 className="text-3xl font-extrabold text-gray-800 mb-8 flex items-center gap-3">
                    Giỏ hàng <span className="text-lg font-medium text-gray-500 bg-white px-3 py-1 rounded-full shadow-sm border border-gray-100">{cart.length} khóa học</span>
                </h1>
                
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 items-start">
                    
                    {/* === CỘT TRÁI: DANH SÁCH SẢN PHẨM === */}
                    <div className="lg:col-span-2 space-y-6">
                        {cart.map((item) => (
                            <div key={item._id} className="group bg-white p-4 sm:p-6 rounded-3xl shadow-sm border border-gray-100 hover:shadow-md hover:border-blue-200 transition-all duration-300 flex flex-col sm:flex-row gap-6 items-center">
                                {/* Ảnh khóa học */}
                                <Link to={`/course/${item._id}`} className="shrink-0 overflow-hidden rounded-2xl w-full sm:w-40 h-28 relative">
                                    <img 
                                        src={item.HinhAnh} 
                                        alt={item.TenKhoaHoc} 
                                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" 
                                    />
                                </Link>

                                {/* Thông tin */}
                                <div className="flex-1 w-full text-center sm:text-left">
                                    <div className="flex flex-col sm:flex-row justify-between items-start gap-2 mb-2">
                                        <Link to={`/course/${item._id}`} className="font-bold text-gray-800 text-lg hover:text-blue-600 transition line-clamp-2">
                                            {item.TenKhoaHoc}
                                        </Link>
                                        <button 
                                            onClick={() => removeFromCart(item._id)} 
                                            className="hidden sm:block text-gray-400 hover:text-red-500 hover:bg-red-50 p-2 rounded-full transition"
                                            title="Xóa khóa học"
                                        >
                                            <FaTrash size={14} />
                                        </button>
                                    </div>

                                    <div className="text-sm text-gray-500 mb-3 flex items-center justify-center sm:justify-start gap-2">
                                        <span className="bg-blue-50 text-blue-600 px-2 py-0.5 rounded text-xs font-bold">Online</span>
                                        <span>• Trọn đời</span>
                                    </div>

                                    <div className="flex items-center justify-between mt-auto">
                                        <div className="flex items-center gap-3">
                                            <span className="text-xl font-extrabold text-blue-600">
                                                {formatMoney(item.HocPhi)}
                                            </span>
                                            {/* Giả lập giá gốc cao hơn chút cho đẹp */}
                                            <span className="text-sm text-gray-400 line-through decoration-gray-400">
                                                {formatMoney(item.HocPhi * 1.2)}
                                            </span>
                                        </div>
                                        
                                        <button 
                                            onClick={() => removeFromCart(item._id)} 
                                            className="sm:hidden text-gray-400 hover:text-red-500 flex items-center gap-1 text-sm font-medium"
                                        >
                                            <FaTrash /> Xóa
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}

                        <div className="mt-6 flex justify-between items-center">
                            <Link to="/" className="text-blue-600 font-bold hover:underline flex items-center gap-2">
                                <FaArrowRight className="rotate-180" /> Tiếp tục xem khóa học
                            </Link>
                        </div>
                    </div>

                    {/* === CỘT PHẢI: SUMMARY (STICKY) === */}
                    <div className="lg:col-span-1">
                        <div className="bg-white p-6 rounded-[2rem] shadow-xl border border-gray-100 sticky top-28">
                            <h3 className="text-xl font-extrabold text-gray-800 mb-6">Thông tin thanh toán</h3>
                            
                            {/* Mã giảm giá */}
                            <div className="mb-6">
                                <label className="block text-xs font-bold text-gray-500 uppercase mb-2">Mã ưu đãi</label>
                                <div className="flex gap-2">
                                    <div className="relative flex-1">
                                        <FaTag className="absolute left-3 top-3.5 text-gray-400" />
                                        <input 
                                            type="text" 
                                            placeholder="Nhập mã giảm giá" 
                                            className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:border-blue-600 focus:ring-2 focus:ring-blue-100 outline-none transition text-sm font-medium"
                                        />
                                    </div>
                                    <button className="px-4 py-3 bg-gray-800 text-white font-bold rounded-xl text-sm hover:bg-gray-700 transition">
                                        Áp dụng
                                    </button>
                                </div>
                            </div>

                            <hr className="border-dashed border-gray-200 my-6" />

                            {/* Chi tiết giá */}
                            <div className="space-y-3 mb-6">
                                <div className="flex justify-between text-gray-600">
                                    <span>Tạm tính:</span>
                                    <span className="font-medium">{formatMoney(cartTotal)}</span>
                                </div>
                                <div className="flex justify-between text-gray-600">
                                    <span>Giảm giá:</span>
                                    <span className="font-medium text-green-500">- 0đ</span>
                                </div>
                            </div>

                            {/* Tổng cộng */}
                            <div className="flex justify-between items-end mb-8">
                                <span className="text-lg font-bold text-gray-800">Tổng thanh toán:</span>
                                <span className="text-3xl font-extrabold text-blue-600">
                                    {formatMoney(cartTotal)}
                                </span>
                            </div>

                            {/* Nút thanh toán */}
                            <button 
                                onClick={handleCheckout}
                                disabled={loading}
                                className={`w-full py-4 rounded-xl text-lg font-bold flex items-center justify-center gap-2 shadow-lg transition-all transform active:scale-95 ${
                                    loading 
                                    ? 'bg-gray-300 text-gray-500 cursor-not-allowed' 
                                    : 'bg-gradient-to-r from-blue-600 to-blue-500 text-white hover:to-blue-700 shadow-blue-500/30'
                                }`}
                            >
                                {loading ? (
                                    <span>Đang xử lý...</span>
                                ) : (
                                    <>
                                        <FaCreditCard /> Thanh toán ngay
                                    </>
                                )}
                            </button>
                            
                            {/* Trust Badges */}
                            <div className="mt-6 space-y-3">
                                <div className="flex items-center gap-3 text-sm text-gray-500">
                                    <FaLock className="text-green-500" />
                                    <span>Thanh toán bảo mật SSL 100%</span>
                                </div>
                                <div className="flex items-center gap-3 text-sm text-gray-500">
                                    <FaUndo className="text-blue-500" />
                                    <span>Hoàn tiền trong 7 ngày nếu không hài lòng</span>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CartPage;