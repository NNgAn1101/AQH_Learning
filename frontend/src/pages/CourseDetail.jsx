import { useEffect, useState, useContext } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import axiosClient from '../api/axiosClient';
import { AuthContext } from '../context/AuthContext';
import { CartContext } from '../context/CartContext'; // <--- IMPORT CART CONTEXT
import { FaStar, FaUserGraduate, FaClock, FaBookOpen, FaCheckCircle, FaPlayCircle, FaShoppingCart } from 'react-icons/fa';

const CourseDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { user } = useContext(AuthContext);
    const { addToCart } = useContext(CartContext); // <--- LẤY HÀM ADD TO CART
    const [course, setCourse] = useState(null);
    const [loading, setLoading] = useState(true);

    const getSmartImage = (courseName) => {
        const name = courseName?.toLowerCase() || "";
        if (name.includes('web nâng cao')) return '/lap-trinh-web-nang-cao.png';
        if (name.includes('web')) return '/lap-trinh-web-co-ban.png';
        if (name.includes('data') || name.includes('dữ liệu')) return '/khoa-hoc-du-lieu.png';
        if (name.includes('sql')) return '/sql-server-co-ban.png';
        if (name.includes('ux') || name.includes('ui')) return '/thiet-ke-ux-ui.png';
        if (name.includes('photoshop')) return '/thiet-ke-photoshop.png';
        if (name.includes('marketing')) return '/marketing-ky-thuat-so.png';
        if (name.includes('thuyết trình')) return '/ky-nang-thuyet-trinh.png';
        if (name.includes('kỹ năng')) return '/ky-nang-mem.png';
        if (name.includes('python')) return '/python-co-ban.png';
        return '/lap-trinh-web-co-ban.png';
    };

    useEffect(() => {
        const fetchCourseDetail = async () => {
            try {
                const res = await axiosClient.get(`/courses/${id}`);
                const data = res.data;
                if (!data.HinhAnh || !data.HinhAnh.startsWith('http')) {
                    data.HinhAnh = getSmartImage(data.TenKhoaHoc);
                }
                setCourse(data);
            } catch (error) {
                console.error("Lỗi lấy chi tiết khóa học:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchCourseDetail();
        window.scrollTo(0, 0);
    }, [id]);

    // --- LOGIC MỚI: Mua ngay ---
    const handleBuyNow = () => {
        addToCart(course); // Thêm vào giỏ trước
        navigate('/cart'); // Chuyển sang trang giỏ hàng để thanh toán
    };

    // --- LOGIC MỚI: Thêm vào giỏ ---
    const handleAddToCart = () => {
        addToCart(course);
    };

    const formatMoney = (amount) => 
        new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount);

    if (loading) return (
        <div className="min-h-screen flex items-center justify-center pt-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        </div>
    );

    if (!course) return (
        <div className="min-h-screen pt-32 text-center text-gray-500 font-bold text-xl">
            Không tìm thấy khóa học này.
        </div>
    );

    return (
        <div className="relative min-h-screen pt-28 pb-20 bg-gray-50 overflow-hidden">
            <div className="absolute inset-0 w-full h-full pointer-events-none">
                <div className="absolute top-20 right-0 w-96 h-96 bg-blue-100 rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-blob"></div>
                <div className="absolute bottom-0 left-0 w-96 h-96 bg-orange-100 rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-blob animation-delay-2000"></div>
            </div>

            <div className="container mx-auto px-6 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                    <div className="lg:col-span-2 space-y-8">
                        <div>
                            <span className="inline-block px-3 py-1 bg-blue-100 text-primary text-xs font-bold rounded-full uppercase tracking-wide mb-4">Khóa học Online</span>
                            <h1 className="text-3xl md:text-5xl font-extrabold text-dark mb-4 leading-tight">{course.TenKhoaHoc}</h1>
                            <p className="text-lg text-gray-500 mb-6 leading-relaxed">{course.MoTa || "Khóa học được thiết kế bài bản giúp bạn làm chủ kiến thức từ cơ bản đến nâng cao."}</p>
                            <div className="flex items-center gap-6 text-sm font-semibold text-gray-600">
                                <div className="flex items-center gap-1 text-yellow-500"><span className="text-lg font-bold mr-1">5.0</span><FaStar /><FaStar /><FaStar /><FaStar /><FaStar /></div>
                                <div className="flex items-center gap-2"><FaUserGraduate className="text-gray-400" /> 1,234 Học viên</div>
                                <div className="flex items-center gap-2"><FaClock className="text-gray-400" /> Cập nhật tháng 2/2026</div>
                            </div>
                        </div>

                        {/* Các phần Nội dung bài học và Bạn sẽ học được gì giữ nguyên */}
                        {/* ... (Code hiển thị nội dung giống cũ) ... */}

                    </div>

                    {/* === CARD MUA KHÓA HỌC (CẬP NHẬT LOGIC BUTTON) === */}
                    <div className="lg:col-span-1">
                        <div className="sticky top-28 bg-white p-6 rounded-[2.5rem] shadow-2xl shadow-blue-500/10 border border-gray-100 overflow-hidden">
                            <div className="relative h-48 rounded-2xl overflow-hidden mb-6 group">
                                <img src={course.HinhAnh} alt={course.TenKhoaHoc} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                                <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                    <FaPlayCircle className="text-white text-5xl drop-shadow-lg" />
                                </div>
                            </div>

                            <div className="flex items-end gap-3 mb-6">
                                <span className="text-4xl font-extrabold text-accent">{formatMoney(course.HocPhi)}</span>
                                <span className="text-gray-400 line-through text-lg font-medium mb-1">{formatMoney(course.HocPhi * 1.5)}</span>
                            </div>

                            <div className="space-y-4">
                                {/* NÚT MUA NGAY */}
                                <button 
                                    onClick={handleBuyNow}
                                    className="w-full py-4 bg-primary text-white font-bold rounded-xl text-lg hover:bg-blue-600 transition shadow-lg shadow-blue-500/30 flex items-center justify-center gap-2"
                                >
                                    Mua ngay
                                </button>
                                
                                {/* NÚT THÊM VÀO GIỎ */}
                                <button 
                                    onClick={handleAddToCart}
                                    className="w-full py-4 bg-orange-50 text-accent font-bold rounded-xl text-lg hover:bg-orange-100 transition border border-orange-100 flex items-center justify-center gap-2"
                                >
                                    <FaShoppingCart /> Thêm vào giỏ
                                </button>
                            </div>

                            {/* ... (Phần thông tin phụ giữ nguyên) ... */}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CourseDetail;