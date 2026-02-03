import { useEffect, useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import axiosClient from '../api/axiosClient';
import { AuthContext } from '../context/AuthContext';
import { FaBookOpen, FaPlayCircle, FaTrophy, FaSearch, FaArrowRight } from 'react-icons/fa';

const MyCoursesPage = () => {
    const { user } = useContext(AuthContext);
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState('all'); // all, active, completed

    // Hàm chọn ảnh thông minh (dự phòng)
    const getSmartImage = (courseName) => {
        const name = courseName?.toLowerCase() || "";
        if (name.includes('web nâng cao')) return '/lap-trinh-web-nang-cao.png';
        if (name.includes('web')) return '/lap-trinh-web-co-ban.png';
        if (name.includes('data')) return '/khoa-hoc-du-lieu.png';
        if (name.includes('python')) return '/python-co-ban.png';
        return '/lap-trinh-web-co-ban.png';
    };

    useEffect(() => {
        const fetchMyCourses = async () => {
            try {
                // Gọi API profile để lấy danh sách khóa học đã populate
                const res = await axiosClient.get('/users/profile');
                // Data trả về là res.data.courses
                const myCourses = res.data.courses.map(course => ({
                    ...course,
                    // Nếu ảnh lỗi hoặc null thì dùng ảnh thông minh
                    HinhAnh: (!course.HinhAnh || !course.HinhAnh.startsWith('http')) 
                             ? getSmartImage(course.TenKhoaHoc) 
                             : course.HinhAnh,
                    // Giả lập tiến độ học ngẫu nhiên (để UI đẹp hơn)
                    progress: Math.floor(Math.random() * 100) 
                }));
                setCourses(myCourses);
            } catch (error) {
                console.error("Lỗi lấy khóa học:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchMyCourses();
    }, []);

    if (loading) return (
        <div className="min-h-screen flex items-center justify-center pt-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        </div>
    );

    // --- EMPTY STATE (Chưa mua khóa nào) ---
    if (courses.length === 0) return (
        <div className="min-h-screen pt-32 pb-20 bg-gray-50 flex flex-col items-center justify-center text-center px-4">
            <div className="w-40 h-40 bg-blue-100 rounded-full flex items-center justify-center mb-6 animate-bounce-slow">
                <FaBookOpen className="text-6xl text-primary opacity-80" />
            </div>
            <h2 className="text-3xl font-extrabold text-gray-800 mb-3">Bạn chưa đăng ký khóa học nào</h2>
            <p className="text-gray-500 mb-8 max-w-md">
                Hành trình vạn dặm bắt đầu từ bước chân đầu tiên. Hãy khám phá thư viện khóa học ngay hôm nay!
            </p>
            <Link to="/courses" className="px-8 py-4 bg-primary text-white rounded-xl font-bold hover:bg-blue-700 transition shadow-lg shadow-blue-500/30 flex items-center gap-2">
                Tìm khóa học ngay <FaArrowRight />
            </Link>
        </div>
    );

    return (
        <div className="pt-28 pb-20 min-h-screen bg-gray-50">
            <div className="container mx-auto px-6">
                
                {/* Header Section */}
                <div className="flex flex-col md:flex-row justify-between items-end mb-10 gap-4">
                    <div>
                        <h1 className="text-3xl font-extrabold text-gray-800 mb-2">
                            Xin chào, {user?.HoTen}! 👋
                        </h1>
                        <p className="text-gray-500">Bạn đang sở hữu <strong className="text-primary">{courses.length}</strong> khóa học.</p>
                    </div>
                    
                    {/* Fake Search & Filter */}
                    <div className="flex gap-3">
                        <div className="relative hidden md:block">
                            <FaSearch className="absolute left-3 top-3 text-gray-400" />
                            <input type="text" placeholder="Tìm khóa học..." className="pl-10 pr-4 py-2 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-primary" />
                        </div>
                    </div>
                </div>

                {/* Filter Tabs (UI Only) */}
                <div className="flex gap-6 border-b border-gray-200 mb-8">
                    {['Tất cả', 'Đang học', 'Đã hoàn thành'].map((tab, idx) => (
                        <button 
                            key={idx}
                            onClick={() => setFilter(idx === 0 ? 'all' : 'other')}
                            className={`pb-3 text-sm font-bold transition relative ${
                                (idx === 0 && filter === 'all') 
                                ? 'text-primary' 
                                : 'text-gray-500 hover:text-gray-800'
                            }`}
                        >
                            {tab}
                            {(idx === 0 && filter === 'all') && (
                                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-primary rounded-t-full"></span>
                            )}
                        </button>
                    ))}
                </div>

                {/* Course Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {courses.map((course) => (
                        <div key={course._id} className="group bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col overflow-hidden transform hover:-translate-y-1">
                            
                            {/* Course Image */}
                            <div className="relative h-48 overflow-hidden">
                                <img 
                                    src={course.HinhAnh} 
                                    alt={course.TenKhoaHoc} 
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                    <Link to={`/learn/${course._id}`} className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-primary hover:scale-110 transition">
                                        <FaPlayCircle size={24} />
                                    </Link>
                                </div>
                            </div>

                            {/* Content */}
                            <div className="p-6 flex flex-col flex-1">
                                <h3 className="font-bold text-lg text-gray-800 mb-2 line-clamp-2 group-hover:text-primary transition">
                                    {course.TenKhoaHoc}
                                </h3>
                                
                                {/* Progress Bar */}
                                <div className="mt-auto">
                                    <div className="flex justify-between text-xs font-semibold text-gray-500 mb-1">
                                        <span>Đã hoàn thành</span>
                                        <span>{course.progress}%</span>
                                    </div>
                                    <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                                        <div 
                                            className="h-full bg-primary rounded-full transition-all duration-1000 ease-out"
                                            style={{ width: `${course.progress}%` }}
                                        ></div>
                                    </div>
                                </div>

                                <div className="mt-6 flex items-center justify-between">
                                    {course.progress === 100 ? (
                                        <span className="flex items-center gap-2 text-green-600 text-sm font-bold bg-green-50 px-3 py-1 rounded-full">
                                            <FaTrophy /> Đã nhận chứng chỉ
                                        </span>
                                    ) : (
                                        <span className="text-xs font-bold text-gray-400 bg-gray-100 px-3 py-1 rounded-full">
                                            Đang học
                                        </span>
                                    )}
                                    
                                    <Link 
                                        to={`/learn/${course._id}`} // Link đến trang Học
                                        className="px-4 py-2 bg-primary text-white text-sm font-bold rounded-lg hover:bg-blue-600 transition shadow-lg shadow-blue-500/20"
                                    >
                                        Vào học ngay
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default MyCoursesPage;