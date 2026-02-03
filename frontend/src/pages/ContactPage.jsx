import { useEffect } from 'react';
import { FaMapMarkerAlt, FaPhoneAlt, FaEnvelope, FaPaperPlane } from 'react-icons/fa';

const ContactPage = () => {
    // Tự động cuộn lên đầu trang khi vào
    useEffect(() => { window.scrollTo(0, 0); }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        alert("Cảm ơn bạn đã liên hệ! Chúng tôi sẽ phản hồi sớm nhất.");
    };

    return (
        <div className="pt-28 pb-20 min-h-screen bg-gray-50 relative overflow-hidden">
             {/* Hiệu ứng nền nhẹ */}
             <div className="absolute top-0 right-0 w-96 h-96 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
             <div className="absolute bottom-0 left-0 w-96 h-96 bg-orange-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>

            <div className="container mx-auto px-6 relative z-10">
                <div className="text-center mb-16">
                    <h1 className="text-4xl font-extrabold text-dark mb-4">Liên hệ với AQH Learning</h1>
                    <p className="text-gray-500 max-w-2xl mx-auto">
                        Chúng tôi luôn sẵn sàng lắng nghe ý kiến đóng góp của bạn. Hãy gửi tin nhắn cho chúng tôi bất cứ lúc nào.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
                    {/* Cột Trái: Thông tin */}
                    <div className="space-y-8">
                        {/* Card Thông tin */}
                        <div className="bg-white p-8 rounded-[2rem] shadow-lg border border-gray-100">
                            <h3 className="text-2xl font-bold text-dark mb-6">Thông tin liên lạc</h3>
                            
                            <div className="space-y-6">
                                <div className="flex items-start gap-4">
                                    <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center text-primary text-xl shrink-0">
                                        <FaMapMarkerAlt />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-dark">Địa chỉ</h4>
                                        <p className="text-gray-500 text-sm mt-1">
                                            Tòa nhà AQH Tech, Khu Công nghệ cao,<br/>
                                            Thành phố Thủ Đức, TP. Hồ Chí Minh
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 bg-orange-50 rounded-xl flex items-center justify-center text-accent text-xl shrink-0">
                                        <FaPhoneAlt />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-dark">Hotline</h4>
                                        <p className="text-gray-500 text-sm mt-1">1900 6868 (8:00 - 17:30)</p>
                                    </div>
                                </div>

                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 bg-purple-50 rounded-xl flex items-center justify-center text-purple-600 text-xl shrink-0">
                                        <FaEnvelope />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-dark">Email</h4>
                                        <p className="text-gray-500 text-sm mt-1">support@aqh-learning.com</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Bản đồ (Ảnh demo hoặc iframe) */}
                        <div className="bg-gray-200 h-64 rounded-[2rem] overflow-hidden shadow-inner flex items-center justify-center text-gray-400">
                             {/* Bạn có thể thay bằng iframe Google Maps thật */}
                             <span className="font-bold">Khu vực hiển thị bản đồ Google Maps</span>
                        </div>
                    </div>

                    {/* Cột Phải: Form */}
                    <div className="bg-white p-10 rounded-[2rem] shadow-xl border border-gray-100">
                        <h3 className="text-2xl font-bold text-dark mb-6">Gửi tin nhắn trực tuyến</h3>
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-2">Họ tên</label>
                                    <input type="text" placeholder="Nguyễn Văn A" className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:bg-white focus:border-primary focus:ring-4 focus:ring-blue-500/10 transition outline-none" required />
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-2">Email</label>
                                    <input type="email" placeholder="email@example.com" className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:bg-white focus:border-primary focus:ring-4 focus:ring-blue-500/10 transition outline-none" required />
                                </div>
                            </div>
                            
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2">Chủ đề</label>
                                <select className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:bg-white focus:border-primary focus:ring-4 focus:ring-blue-500/10 transition outline-none">
                                    <option>Tư vấn khóa học</option>
                                    <option>Hỗ trợ kỹ thuật</option>
                                    <option>Hợp tác doanh nghiệp</option>
                                    <option>Khác</option>
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2">Nội dung</label>
                                <textarea rows="5" placeholder="Nhập nội dung tin nhắn..." className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:bg-white focus:border-primary focus:ring-4 focus:ring-blue-500/10 transition outline-none" required></textarea>
                            </div>

                            <button type="submit" className="w-full py-4 bg-primary text-white font-bold rounded-xl hover:bg-blue-600 transition shadow-lg shadow-blue-500/30 flex items-center justify-center gap-2">
                                <FaPaperPlane /> Gửi tin nhắn
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ContactPage;