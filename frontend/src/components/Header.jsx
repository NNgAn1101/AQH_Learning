import { useState, useContext, useEffect, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FaShoppingCart, FaBars, FaTimes, FaUserCircle, FaSignOutAlt, FaBookOpen, FaHistory } from 'react-icons/fa';
import { CartContext } from '../context/CartContext';
import { AuthContext } from '../context/AuthContext';

const Header = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    
    const { cart } = useContext(CartContext);
    const { user, logout } = useContext(AuthContext);
    
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        setIsMobileMenuOpen(false);
        setIsDropdownOpen(false);
    }, [location]);

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    // 1. CLICK LOGO / TRANG CHỦ: Cuộn lên đầu
    const handleScrollTop = (e) => {
        if (location.pathname === '/') {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    };

    // 2. CLICK KHÓA HỌC: Cuộn đến danh sách khóa học
    const handleScrollToCourses = (e) => {
        if (location.pathname === '/') {
            e.preventDefault();
            const section = document.getElementById('courses-section');
            if (section) {
                const headerOffset = 80;
                const elementPosition = section.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                window.scrollTo({ top: offsetPosition, behavior: "smooth" });
            }
        }
    };

    // 3. [MỚI] CLICK LIÊN HỆ: Cuộn xuống dưới cùng (Footer)
    const handleScrollToFooter = (e) => {
        if (location.pathname === '/') {
            e.preventDefault();
            window.scrollTo({
                top: document.body.scrollHeight, // Cuộn đến chiều cao tối đa của trang
                behavior: 'smooth'
            });
        }
    };

    return (
        <header 
            className={`fixed top-0 left-0 w-full z-40 transition-all duration-500 ${
                isScrolled || isMobileMenuOpen ? 'bg-white/90 backdrop-blur-md shadow-lg py-2' : 'bg-transparent py-4'
            }`}
        >
            <div className="container mx-auto px-6 relative">
                <nav className="relative flex justify-between items-center min-h-[64px]">

                    {/* === 1. LOGO (BÊN TRÁI) === */}
                    <Link 
                        to="/" 
                        onClick={handleScrollTop}
                        className="group relative z-50 flex items-center gap-3 no-underline focus:outline-none"
                    >
                        {/* Hitbox */}
                        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full min-w-[60px] min-h-[60px] group-hover:w-24 group-hover:h-24 bg-transparent z-50 rounded-full cursor-pointer transition-all duration-300"></div>

                        {/* Nền tròn */}
                        <div className="absolute left-0 w-14 h-14 bg-white rounded-full opacity-0 transition-all duration-500 ease-in-out group-hover:opacity-100 group-hover:shadow-lg -z-10"></div>

                        {/* Ảnh Logo */}
                        <img 
                            src="/logo.png" 
                            alt="AQH Logo" 
                            className="w-14 h-14 object-contain transition-transform duration-700 ease-[cubic-bezier(0.34,1.56,0.64,1)] group-hover:rotate-[360deg] group-hover:scale-110 drop-shadow-md z-20"
                        />

                        {/* Chữ */}
                        <div className="flex flex-col items-start overflow-hidden whitespace-nowrap transition-all duration-700 ease-in-out max-w-[200px] opacity-100 group-hover:max-w-0 group-hover:opacity-0 group-hover:-translate-x-5">
                            <h1 
                                className="text-5xl font-black leading-none tracking-tighter text-transparent bg-clip-text bg-gradient-to-br from-primary via-blue-600 to-blue-800 drop-shadow-lg"
                                style={{ textShadow: '0px 3px 8px rgba(0,0,0,0.15)' }}
                            >
                                AQH
                            </h1>
                            <span className="text-xs font-bold text-gray-500 tracking-[0.3em] uppercase ml-1">
                                Learning
                            </span>
                        </div>
                    </Link>


                    {/* === 2. MENU (CHÍNH GIỮA) === */}
                    <ul className="hidden md:flex absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 space-x-8 font-semibold text-gray-600">
                        <li>
                            <Link 
                                to="/" 
                                onClick={handleScrollTop}
                                className={`relative py-2 hover:text-primary transition-colors duration-300 before:absolute before:bottom-0 before:left-0 before:w-0 before:h-0.5 before:bg-primary before:transition-all before:duration-300 hover:before:w-full ${
                                    location.pathname === '/' ? 'text-primary before:w-full' : ''
                                }`}
                            >
                                Trang chủ
                            </Link>
                        </li>
                        
                        <li>
                            <Link 
                                to="/" 
                                onClick={handleScrollToCourses}
                                className="relative py-2 hover:text-primary transition-colors duration-300 before:absolute before:bottom-0 before:left-0 before:w-0 before:h-0.5 before:bg-primary before:transition-all before:duration-300 hover:before:w-full"
                            >
                                Khóa học
                            </Link>
                        </li>

                        {/* SỬA ĐỔI: LIÊN HỆ -> CUỘN XUỐNG DƯỚI CÙNG */}
                        <li>
                            <Link 
                                to="/" // Đổi to="/" thay vì "/contact" để ở lại trang chủ
                                onClick={handleScrollToFooter} // Gắn hàm cuộn xuống Footer
                                className="relative py-2 hover:text-primary transition-colors duration-300 before:absolute before:bottom-0 before:left-0 before:w-0 before:h-0.5 before:bg-primary before:transition-all before:duration-300 hover:before:w-full"
                            >
                                Liên hệ
                            </Link>
                        </li>
                    </ul>


                    {/* === 3. ICONS & MOBILE BTN (BÊN PHẢI) === */}
                    <div className="flex items-center space-x-5 z-40">
                        <Link to="/cart" className="relative group/cart p-2 hover:bg-blue-50 rounded-full transition">
                            <FaShoppingCart size={22} className="text-gray-600 group-hover/cart:text-primary transition" />
                            {cart.length > 0 && (
                                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full border-2 border-white shadow-sm animate-bounce-slow">
                                    {cart.length}
                                </span>
                            )}
                        </Link>

                        {user ? (
                             <div className="relative hidden md:block">
                                <button 
                                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                                    className="flex items-center gap-2 font-bold text-gray-700 hover:text-primary transition focus:outline-none bg-gray-100 hover:bg-blue-50 py-2 px-3 rounded-full"
                                >
                                    <FaUserCircle size={24} className="text-primary" />
                                    <span className="max-w-[100px] truncate">{user.HoTen}</span>
                                </button>
                                {isDropdownOpen && (
                                    <div className="absolute right-0 mt-4 w-60 bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden animate-fade-in-up transform origin-top-right z-50">
                                        <div className="p-4 border-b border-gray-50 bg-gray-50/50">
                                            <p className="text-sm text-gray-500">Xin chào,</p>
                                            <p className="font-bold text-gray-800 truncate">{user.HoTen}</p>
                                        </div>
                                        <div className="py-2">
                                            <Link to="/my-courses" className="flex items-center gap-3 px-4 py-3 text-gray-600 hover:bg-blue-50 hover:text-primary transition font-medium">
                                                <FaBookOpen /> Khóa học của tôi
                                            </Link>
                                            <Link to="/payment-history" className="flex items-center gap-3 px-4 py-3 text-gray-600 hover:bg-blue-50 hover:text-primary transition font-medium">
                                                <FaHistory /> Lịch sử giao dịch
                                            </Link>
                                            <div className="border-t border-gray-100 my-2"></div>
                                            <button onClick={handleLogout} className="w-full flex items-center gap-3 px-4 py-3 text-red-500 hover:bg-red-50 transition font-medium">
                                                <FaSignOutAlt /> Đăng xuất
                                            </button>
                                        </div>
                                    </div>
                                )}
                             </div>
                        ) : (
                            <div className="hidden md:flex items-center gap-3">
                                <Link to="/login" className="font-bold text-gray-600 hover:text-primary transition">Đăng nhập</Link>
                                <Link to="/register" className="px-5 py-2.5 bg-primary text-white font-bold rounded-full hover:bg-blue-600 transition shadow-lg shadow-blue-500/30 hover:-translate-y-0.5">
                                    Đăng ký
                                </Link>
                            </div>
                        )}

                        <button 
                            className="md:hidden p-2 text-gray-600 hover:text-primary hover:bg-blue-50 rounded-full transition"
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        >
                            {isMobileMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
                        </button>
                    </div>

                </nav>

                {/* Mobile Menu Overlay */}
                {isMobileMenuOpen && (
                    <div className="md:hidden absolute top-full left-0 w-full bg-white shadow-xl rounded-b-3xl border-t border-gray-100 animate-fade-in-up z-30">
                         <ul className="flex flex-col py-4 font-semibold text-gray-600">
                             <li>
                                <Link to="/" onClick={handleScrollTop} className="block py-3 px-6 hover:bg-blue-50 hover:text-primary">Trang chủ</Link>
                             </li>
                             <li>
                                <Link to="/" onClick={handleScrollToCourses} className="block py-3 px-6 hover:bg-blue-50 hover:text-primary">Khóa học</Link>
                             </li>
                             <li>
                                <Link to="/" onClick={handleScrollToFooter} className="block py-3 px-6 hover:bg-blue-50 hover:text-primary">Liên hệ</Link>
                             </li>
                            {!user && (
                                <li className="flex gap-4 px-6 mt-4 pb-2">
                                    <Link to="/login" className="flex-1 text-center py-2 border border-gray-200 rounded-lg font-bold">Đăng nhập</Link>
                                    <Link to="/register" className="flex-1 text-center py-2 bg-primary text-white rounded-lg font-bold">Đăng ký</Link>
                                </li>
                            )}
                         </ul>
                    </div>
                )}
            </div>
        </header>
    );
};

export default Header;