import { useEffect, useState } from 'react';
import axiosClient from '../api/axiosClient';
import { Link } from 'react-router-dom';
import { FaArrowRight, FaStar } from 'react-icons/fa';

// 1. IMPORT SLIDER (Component bạn vừa tạo)
import HeroSlider from '../components/HeroSlider';

const HomePage = () => {
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);

    // --- GIỮ NGUYÊN LOGIC CŨ CỦA BẠN ---
    // Hàm thông minh: Chọn ảnh dựa trên tên khóa học
    const getSmartImage = (courseName) => {
        const name = courseName?.toLowerCase() || ""; // Thêm ?. để tránh lỗi nếu tên null

        // 1. Nhóm Lập trình Web
        if (name.includes('web nâng cao')) return '/lap-trinh-web-nang-cao.png';
        if (name.includes('web')) return '/lap-trinh-web-co-ban.png';
        
        // 2. Nhóm Dữ liệu & SQL
        if (name.includes('data') || name.includes('dữ liệu')) return '/khoa-hoc-du-lieu.png';
        if (name.includes('sql') || name.includes('cơ sở dữ liệu')) return '/sql-server-co-ban.png';

        // 3. Nhóm Thiết kế
        if (name.includes('ux') || name.includes('ui')) return '/thiet-ke-ux-ui.png';
        if (name.includes('photoshop') || name.includes('thiết kế')) return '/thiet-ke-photoshop.png';

        // 4. Nhóm Marketing & Kỹ năng
        if (name.includes('marketing')) return '/marketing-ky-thuat-so.png';
        if (name.includes('thuyết trình') || name.includes('giao tiếp')) return '/ky-nang-thuyet-trinh.png';
        if (name.includes('kỹ năng') || name.includes('soft')) return '/ky-nang-mem.png';

        // 5. Ngôn ngữ lập trình cụ thể
        if (name.includes('python')) return '/python-co-ban.png';
        
        // Mặc định
        return '/lap-trinh-web-co-ban.png';
    };

    useEffect(() => {
        const fetchCourses = async () => {
            try {
                const res = await axiosClient.get('/courses');
                
                // Duyệt qua từng khóa học và gán ảnh đúng chủ đề
                const coursesWithImages = res.data.map((course) => {
                    const imagePath = course.HinhAnh && course.HinhAnh.startsWith('http') 
                        ? course.HinhAnh 
                        : getSmartImage(course.TenKhoaHoc);
                        
                    return { ...course, HinhAnh: imagePath };
                });
                setCourses(coursesWithImages);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };
        fetchCourses();
    }, []);

    const formatMoney = (amount) => 
        new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount);

    const scrollToCourses = () => {
        const section = document.getElementById('courses-section');
        if (section) section.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <div className="relative min-h-screen pb-20 overflow-hidden bg-white">
            
            {/* === 2. THAY THẾ HERO SECTION CŨ BẰNG SLIDER MỚI === */}
            <div className="mb-16">
                <HeroSlider />
            </div>
            {/* =================================================== */}

            {/* === HIỆU ỨNG NỀN (Giữ lại cho đẹp phần dưới) === */}
            <div className="absolute inset-0 w-full h-full pointer-events-none z-0">
                <div className="absolute top-[500px] left-0 w-96 h-96 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
                <div className="absolute top-[600px] right-0 w-96 h-96 bg-yellow-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
            </div>

            {/* === DANH SÁCH KHÓA HỌC === */}
            <div id="courses-section" className="container mx-auto px-6 relative z-10">
                
                {/* Tiêu đề section */}
                <div className="flex justify-between items-end mb-10 border-b border-gray-100 pb-4">
                    <div>
                        <span className="text-primary font-bold text-sm uppercase tracking-wider">Khám phá</span>
                        <h2 className="text-3xl font-extrabold text-dark mt-1">Khóa học nổi bật</h2>
                    </div>
                    <button onClick={scrollToCourses} className="text-accent font-bold flex items-center gap-2 hover:gap-4 transition-all bg-transparent border-none cursor-pointer outline-none group">
                        Xem tất cả <FaArrowRight className="group-hover:translate-x-1 transition-transform"/>
                    </button>
                </div>

                {loading ? (
                    <div className="flex justify-center py-20">
                         <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {courses.map((course) => (
                            <Link to={`/course/${course._id}`} key={course._id} className="group bg-white rounded-[2rem] border border-gray-100 shadow-lg hover:shadow-2xl hover:shadow-blue-500/10 transition-all duration-500 overflow-hidden flex flex-col h-full cursor-pointer hover:-translate-y-2">
                                
                                {/* Image Area */}
                                <div className="h-56 overflow-hidden relative">
                                    <img 
                                        src={course.HinhAnh} 
                                        alt={course.TenKhoaHoc} 
                                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
                                    />
                                    {/* Giá tiền nổi bật */}
                                    <div className="absolute top-4 right-4 bg-white/95 backdrop-blur px-3 py-1.5 rounded-xl text-sm font-extrabold text-primary shadow-sm border border-blue-50">
                                        {formatMoney(course.HocPhi)}
                                    </div>
                                    {/* Overlay khi hover */}
                                    <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                </div>

                                {/* Content Area */}
                                <div className="p-8 flex-1 flex flex-col">
                                    <div className="flex items-center gap-2 mb-3">
                                        <div className="flex text-yellow-400 text-xs gap-0.5">
                                            {[...Array(5)].map((_, i) => <FaStar key={i} />)}
                                        </div>
                                        <span className="text-xs text-gray-400 font-bold">(5.0)</span>
                                    </div>

                                    <h3 className="text-xl font-extrabold text-gray-800 mb-3 line-clamp-2 leading-snug group-hover:text-primary transition-colors">
                                        {course.TenKhoaHoc}
                                    </h3>
                                    
                                    <div className="mt-auto pt-6 flex items-center justify-between border-t border-gray-50">
                                        <div className="flex -space-x-3">
                                            {[1,2,3].map(i => <div key={i} className="w-8 h-8 rounded-full bg-gray-200 border-2 border-white"></div>)}
                                            <div className="w-8 h-8 rounded-full bg-gray-100 border-2 border-white flex items-center justify-center text-[10px] font-bold text-gray-500">+99</div>
                                        </div>
                                        <div className="w-10 h-10 rounded-full bg-blue-50 text-primary flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-all duration-300 shadow-sm">
                                            <FaArrowRight size={14} />
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default HomePage;