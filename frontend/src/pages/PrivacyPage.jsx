import { useEffect } from 'react';

const PrivacyPage = () => {
    useEffect(() => { window.scrollTo(0, 0); }, []);

    return (
        <div className="pt-28 pb-20 min-h-screen bg-white">
            <div className="container mx-auto px-6 max-w-4xl">
                <div className="bg-white rounded-[2rem] p-10 md:p-14 shadow-xl border border-gray-100">
                    <h1 className="text-3xl md:text-4xl font-extrabold text-dark mb-2">Chính sách bảo mật</h1>
                    <p className="text-gray-500 mb-10">Hiệu lực từ: 01/01/2026</p>

                    <div className="prose prose-lg text-gray-600 max-w-none space-y-8">
                        <section>
                            <h3 className="text-xl font-bold text-dark mb-3">1. Thu thập thông tin</h3>
                            <p>Chúng tôi thu thập các thông tin sau để phục vụ việc học tập:</p>
                            <ul className="list-disc pl-5 space-y-2">
                                <li>Họ tên, Email, Số điện thoại (khi đăng ký).</li>
                                <li>Tiến độ học tập, kết quả bài kiểm tra.</li>
                                <li>Lịch sử thanh toán (qua cổng VNPAY/Momo).</li>
                            </ul>
                        </section>

                        <section>
                            <h3 className="text-xl font-bold text-dark mb-3">2. Sử dụng thông tin</h3>
                            <p>Thông tin của bạn chỉ được sử dụng cho các mục đích:</p>
                            <ul className="list-disc pl-5 space-y-2">
                                <li>Cấp quyền truy cập khóa học và cấp chứng chỉ.</li>
                                <li>Gửi thông báo về bài học mới, cập nhật hệ thống.</li>
                                <li>Hỗ trợ kỹ thuật và giải quyết khiếu nại.</li>
                            </ul>
                        </section>

                        <section>
                            <h3 className="text-xl font-bold text-dark mb-3">3. Bảo mật dữ liệu</h3>
                            <p>Dữ liệu của bạn được lưu trữ trên máy chủ bảo mật, mã hóa mật khẩu một chiều (Hashing). Chúng tôi cam kết không bán hoặc chia sẻ thông tin cá nhân cho bên thứ ba vì mục đích thương mại.</p>
                        </section>

                        <section>
                            <h3 className="text-xl font-bold text-dark mb-3">4. Cookie & Tracking</h3>
                            <p>Website sử dụng Cookie để lưu trạng thái đăng nhập và ghi nhớ sở thích của bạn nhằm mang lại trải nghiệm tốt nhất.</p>
                        </section>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PrivacyPage;