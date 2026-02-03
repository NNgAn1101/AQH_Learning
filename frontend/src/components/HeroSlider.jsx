import Slider from "react-slick";
import { Link } from "react-router-dom";
import { FaArrowRight, FaChevronLeft, FaChevronRight } from "react-icons/fa";

const HeroSlider = () => {
    // Cấu hình cho Slider (Giữ nguyên)
    const settings = {
        dots: true,
        infinite: true,
        speed: 800,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 5000,
        pauseOnHover: true,
        fade: true,
        cssEase: "cubic-bezier(0.7, 0, 0.3, 1)",
        nextArrow: <SampleNextArrow />,
        prevArrow: <SamplePrevArrow />,
        appendDots: dots => (
            <div style={{ bottom: "30px" }}>
                <ul className="m-0 p-0"> {dots} </ul>
            </div>
        )
    };

    // --- 1. SỬA DATA SLIDE ---
    const slides = [
        {
            id: 1,
            image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=2070&auto=format&fit=crop",
            title: "Khởi đầu sự nghiệp Lập trình viên",
            subtitle: "Học từ con số 0 đến chuyên gia. Lộ trình bài bản, thực chiến dự án thực tế.",
            cta: "Xem lộ trình",
            link: "#courses-section", // <--- ĐỔI THÀNH ID ĐỂ SCROLL
            color: "text-white"
        },
        {
            id: 2,
            image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=1771&auto=format&fit=crop",
            title: "Học nhóm & Kết nối Doanh nghiệp",
            subtitle: "Không chỉ là học code, bạn còn học cách làm việc nhóm và tư duy giải quyết vấn đề.",
            cta: "Tham gia ngay",
            link: "/register", // Link thường (Chuyển trang)
            color: "text-white"
        },
        {
            id: 3,
            image: "https://images.unsplash.com/photo-1531482615713-2afd69097998?q=80&w=2070&auto=format&fit=crop",
            title: "Nâng cấp kỹ năng - Tăng thu nhập",
            subtitle: "Các khóa học nâng cao về React, Node.js, AI dành cho người đi làm.",
            cta: "Tìm khóa học",
            link: "#courses-section", // <--- ĐỔI THÀNH ID ĐỂ SCROLL
            color: "text-white"
        }
    ];

    // --- 2. HÀM XỬ LÝ SCROLL MƯỢT ---
    const handleButtonClick = (e, link) => {
        if (link.startsWith('#')) {
            e.preventDefault();
            const element = document.querySelector(link);
            if (element) {
                element.scrollIntoView({ behavior: 'smooth' });
            }
        }
    };

    return (
        <div className="w-full overflow-hidden bg-gray-900 group">
            <Slider {...settings}>
                {slides.map((slide) => (
                    <div key={slide.id} className="relative w-full h-[500px] md:h-[600px] outline-none">
                        
                        {/* Background Image */}
                        <div 
                            className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-transform duration-[5000ms] ease-linear transform hover:scale-105"
                            style={{ backgroundImage: `url(${slide.image})` }}
                        >
                            <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent"></div>
                        </div>

                        {/* Nội dung chữ */}
                        <div className="relative h-full container mx-auto px-6 flex flex-col justify-center items-start z-10">
                            <div className="max-w-2xl animate-fade-in-up">
                                <span className="inline-block py-1 px-3 rounded-full bg-primary/20 text-blue-300 border border-blue-400/30 text-sm font-bold mb-4 backdrop-blur-sm">
                                </span>
                                <h2 className="text-4xl md:text-6xl font-extrabold text-white mb-6 leading-tight tracking-tight drop-shadow-lg">
                                    {slide.title}
                                </h2>
                                <p className="text-lg md:text-xl text-gray-200 mb-8 font-light max-w-lg leading-relaxed drop-shadow-md">
                                    {slide.subtitle}
                                </p>
                                
                                {/* --- 3. LOGIC NÚT BẤM (LINK hoặc SCROLL) --- */}
                                {slide.link.startsWith('#') ? (
                                    <button 
                                        onClick={(e) => handleButtonClick(e, slide.link)}
                                        className="inline-flex items-center gap-2 px-8 py-4 bg-primary hover:bg-blue-600 text-white font-bold rounded-full transition-all transform hover:-translate-y-1 hover:shadow-lg hover:shadow-blue-500/40"
                                    >
                                        {slide.cta} <FaArrowRight />
                                    </button>
                                ) : (
                                    <Link 
                                        to={slide.link}
                                        className="inline-flex items-center gap-2 px-8 py-4 bg-primary hover:bg-blue-600 text-white font-bold rounded-full transition-all transform hover:-translate-y-1 hover:shadow-lg hover:shadow-blue-500/40"
                                    >
                                        {slide.cta} <FaArrowRight />
                                    </Link>
                                )}
                                {/* ------------------------------------------- */}
                            </div>
                        </div>
                    </div>
                ))}
            </Slider>
        </div>
    );
};

// Component nút Next
function SampleNextArrow(props) {
    const { onClick } = props;
    return (
        <div 
            className="absolute top-1/2 -translate-y-1/2 right-4 z-20 w-12 h-12 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/30 backdrop-blur-md text-white cursor-pointer transition-all duration-300 opacity-0 group-hover:opacity-100 hover:scale-110"
            onClick={onClick}
        >
            <FaChevronRight size={20} />
        </div>
    );
}

// Component nút Prev
function SamplePrevArrow(props) {
    const { onClick } = props;
    return (
        <div 
            className="absolute top-1/2 -translate-y-1/2 left-4 z-20 w-12 h-12 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/30 backdrop-blur-md text-white cursor-pointer transition-all duration-300 opacity-0 group-hover:opacity-100 hover:scale-110"
            onClick={onClick}
        >
            <FaChevronLeft size={20} />
        </div>
    );
}

export default HeroSlider;