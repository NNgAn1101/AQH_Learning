import { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
// Đảm bảo đường dẫn import axiosClient là đúng
import axiosClient from '../api/axiosClient'; 
import { FaEnvelope, FaLock, FaSignInAlt, FaGoogle, FaFacebookF, FaArrowLeft } from 'react-icons/fa';
import { toast } from 'react-toastify';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    
    // Lấy hàm login từ Context (Hàm này chỉ dùng để lưu state, không gọi API)
    const { login } = useContext(AuthContext);
    
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        
        try {
            // [QUAN TRỌNG] Gọi API tại đây để lấy Token từ Server
            // Lưu ý: Backend của bạn dùng field là 'Email' và 'MatKhau'
            const res = await axiosClient.post('/auth/login', { 
                Email: email, 
                MatKhau: password 
            });

            // Sau khi có kết quả từ Server (res.data chứa token và user)
            // Ta mới gọi hàm login của Context để lưu vào máy
            console.log("Login thành công:", res.data); // Log để kiểm tra
            
            login(res.data.token, res.data.user);

            toast.success("Đăng nhập thành công!");
            navigate('/'); // Chuyển hướng về trang chủ

        } catch (error) {
            console.error("Lỗi đăng nhập:", error);
            const message = error.response?.data?.message || "Đăng nhập thất bại. Vui lòng kiểm tra lại!";
            toast.error(message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 relative overflow-hidden px-4 py-20">
            {/* ... (Giữ nguyên phần giao diện HTML/CSS của bạn ở đây) ... */}
            {/* Chỉ cần đảm bảo phần <form onSubmit={handleSubmit}> là được */}
            
            <div className="bg-white/80 backdrop-blur-xl p-8 md:p-12 rounded-[2.5rem] shadow-2xl w-full max-w-[500px] relative z-10 border border-white/50">
                 <Link to="/" className="absolute top-8 left-8 text-gray-400 hover:text-gray-800 transition transform hover:-translate-x-1">
                    <FaArrowLeft />
                </Link>

                <div className="text-center mb-10">
                    <h1 className="text-4xl font-extrabold text-gray-800 mb-2">Đăng Nhập</h1>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Input Email */}
                    <div className="relative group z-0">
                        <input
                            type="email"
                            className="block py-4 px-12 w-full text-gray-900 bg-transparent border-2 border-gray-200 rounded-2xl appearance-none focus:outline-none focus:border-blue-600 focus:bg-white/50"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                        <FaEnvelope className="absolute top-5 left-4 text-gray-400 text-lg" />
                    </div>

                    {/* Input Password */}
                    <div className="relative group z-0">
                        <input
                            type="password"
                            className="block py-4 px-12 w-full text-gray-900 bg-transparent border-2 border-gray-200 rounded-2xl appearance-none focus:outline-none focus:border-blue-600 focus:bg-white/50"
                            placeholder="Mật khẩu"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                        <FaLock className="absolute top-5 left-4 text-gray-400 text-lg" />
                    </div>

                    <button 
                        type="submit" 
                        disabled={loading}
                        className={`w-full py-4 rounded-2xl text-white font-bold text-lg shadow-xl transition-all ${
                            loading ? 'bg-gray-400' : 'bg-blue-600 hover:bg-blue-700'
                        }`}
                    >
                        {loading ? 'Đang xử lý...' : 'Đăng nhập'}
                    </button>
                </form>
                
                <p className="mt-8 text-center text-gray-600">
                    Chưa có tài khoản? <Link to="/register" className="font-bold text-blue-600">Đăng ký ngay</Link>
                </p>
            </div>
        </div>
    );
};

export default Login;