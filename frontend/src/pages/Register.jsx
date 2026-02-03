import { useState } from 'react';
import axiosClient from '../api/axiosClient';
import { useNavigate, Link } from 'react-router-dom';
import { FaUser, FaEnvelope, FaLock, FaArrowLeft, FaRocket } from 'react-icons/fa';
import { toast } from 'react-toastify';

const Register = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            toast.warning("Mật khẩu nhập lại không khớp! ");
            return;
        }

        setLoading(true);
        try {
            await axiosClient.post('/users/register', {
                HoTen: name,
                Email: email,
                MatKhau: password
            });
            toast.success("Đăng ký thành công! Hãy đăng nhập ngay. ");
            navigate('/login');
        } catch (error) {
            const message = error.response?.data?.message || "Đăng ký thất bại.";
            toast.error(message + "Hãy thử lại!");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 relative overflow-hidden px-4 py-20">
            
            {/* Background Động */}
            <div className="absolute inset-0 w-full h-full pointer-events-none">
                <div className="absolute bottom-10 left-10 w-96 h-96 bg-green-300 rounded-full mix-blend-multiply filter blur-[100px] opacity-40 animate-blob"></div>
                <div className="absolute top-10 right-10 w-96 h-96 bg-yellow-300 rounded-full mix-blend-multiply filter blur-[100px] opacity-40 animate-blob animation-delay-2000"></div>
            </div>

            {/* Glassmorphism Card */}
            <div className="bg-white/80 backdrop-blur-xl p-8 md:p-12 rounded-[2.5rem] shadow-2xl w-full max-w-[500px] relative z-10 border border-white/50 transition-all duration-500 hover:shadow-orange-500/20">
                
                <Link to="/" className="absolute top-8 left-8 text-gray-400 hover:text-gray-800 transition transform hover:-translate-x-1">
                    <FaArrowLeft />
                </Link>

                <div className="text-center mb-8">
                    <div className="inline-block p-4 rounded-full bg-orange-50 text-accent mb-4 shadow-inner animate-pulse">
                         <FaRocket size={30} />
                    </div>
                    <h1 className="text-4xl font-extrabold text-gray-800 mb-2">Tạo tài khoản</h1>
                    <p className="text-gray-500 font-medium">Bắt đầu miễn phí. Không cần thẻ tín dụng.</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    
                    {/* --- INPUT NAME --- */}
                    <div className="relative group z-0">
                        <input
                            type="text"
                            id="name"
                            className="block py-4 px-12 w-full text-gray-900 bg-transparent border-2 border-gray-200 rounded-2xl appearance-none focus:outline-none focus:ring-0 focus:border-accent focus:bg-white/50 peer transition-all duration-300"
                            placeholder=" "
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                        <FaUser className="absolute top-5 left-4 text-gray-400 text-lg peer-focus:text-accent peer-focus:scale-110 transition-all duration-300" />
                        <label 
                            htmlFor="name" 
                            className="absolute text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white/0 px-2 peer-focus:px-2 peer-focus:text-accent peer-focus:bg-white peer-focus:rounded-full peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-placeholder-shown:left-10 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-6 peer-focus:left-3 font-bold"
                        >
                            Họ và tên
                        </label>
                    </div>

                    {/* --- INPUT EMAIL --- */}
                    <div className="relative group z-0">
                        <input
                            type="email"
                            id="email_reg"
                            className="block py-4 px-12 w-full text-gray-900 bg-transparent border-2 border-gray-200 rounded-2xl appearance-none focus:outline-none focus:ring-0 focus:border-accent focus:bg-white/50 peer transition-all duration-300"
                            placeholder=" "
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                        <FaEnvelope className="absolute top-5 left-4 text-gray-400 text-lg peer-focus:text-accent peer-focus:scale-110 transition-all duration-300" />
                        <label 
                            htmlFor="email_reg" 
                            className="absolute text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white/0 px-2 peer-focus:px-2 peer-focus:text-accent peer-focus:bg-white peer-focus:rounded-full peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-placeholder-shown:left-10 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-6 peer-focus:left-3 font-bold"
                        >
                            Địa chỉ Email
                        </label>
                    </div>

                    {/* --- INPUT PASSWORD --- */}
                    <div className="relative group z-0">
                        <input
                            type="password"
                            id="pass_reg"
                            className="block py-4 px-12 w-full text-gray-900 bg-transparent border-2 border-gray-200 rounded-2xl appearance-none focus:outline-none focus:ring-0 focus:border-accent focus:bg-white/50 peer transition-all duration-300"
                            placeholder=" "
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                        <FaLock className="absolute top-5 left-4 text-gray-400 text-lg peer-focus:text-accent peer-focus:scale-110 transition-all duration-300" />
                        <label 
                            htmlFor="pass_reg" 
                            className="absolute text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white/0 px-2 peer-focus:px-2 peer-focus:text-accent peer-focus:bg-white peer-focus:rounded-full peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-placeholder-shown:left-10 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-6 peer-focus:left-3 font-bold"
                        >
                            Mật khẩu
                        </label>
                    </div>

                    {/* --- INPUT CONFIRM PASSWORD --- */}
                    <div className="relative group z-0">
                        <input
                            type="password"
                            id="confirm_pass"
                            className="block py-4 px-12 w-full text-gray-900 bg-transparent border-2 border-gray-200 rounded-2xl appearance-none focus:outline-none focus:ring-0 focus:border-accent focus:bg-white/50 peer transition-all duration-300"
                            placeholder=" "
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                        />
                        <FaLock className="absolute top-5 left-4 text-gray-400 text-lg peer-focus:text-accent peer-focus:scale-110 transition-all duration-300" />
                        <label 
                            htmlFor="confirm_pass" 
                            className="absolute text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white/0 px-2 peer-focus:px-2 peer-focus:text-accent peer-focus:bg-white peer-focus:rounded-full peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-placeholder-shown:left-10 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-6 peer-focus:left-3 font-bold"
                        >
                            Xác nhận mật khẩu
                        </label>
                    </div>

                    <button 
                        type="submit" 
                        disabled={loading}
                        className={`w-full py-4 rounded-2xl text-white font-bold text-lg shadow-xl shadow-orange-500/30 transition-all transform hover:-translate-y-1 active:scale-95 ${
                            loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-gradient-to-r from-orange-500 to-red-500 hover:to-orange-600'
                        }`}
                    >
                        {loading ? 'Đang tạo tài khoản...' : 'Đăng ký ngay'}
                    </button>
                </form>

                <p className="mt-8 text-center text-gray-600 font-medium">
                    Đã là thành viên?{' '}
                    <Link to="/login" className="font-bold text-accent hover:underline hover:text-orange-600 transition">
                        Đăng nhập tại đây
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default Register;