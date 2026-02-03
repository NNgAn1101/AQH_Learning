import { useEffect } from 'react';

const TermsPage = () => {
    useEffect(() => { window.scrollTo(0, 0); }, []);

    return (
        <div className="pt-28 pb-20 min-h-screen bg-white">
            <div className="container mx-auto px-6 max-w-4xl">
                <div className="bg-white rounded-[2rem] p-10 md:p-14 shadow-xl border border-gray-100">
                    <h1 className="text-3xl md:text-4xl font-extrabold text-dark mb-2">Điều khoản sử dụng</h1>
                    <p className="text-gray-500 mb-10">Cập nhật lần cuối: 02/02/2026</p>

                    <div className="prose prose-lg text-gray-600 max-w-none space-y-8">
                        <section>
                            <h3 className="text-xl font-bold text-dark mb-3">1. Giới thiệu chung</h3>
                            <p>Chào mừng bạn đến với <strong>AQH Learning</strong>. Khi truy cập và sử dụng dịch vụ của chúng tôi, bạn đồng ý tuân thủ các điều khoản được quy định dưới đây. Nếu không đồng ý, vui lòng ngừng sử dụng dịch vụ.</p>
                        </section>

                        <section>
                            <h3 className="text-xl font-bold text-dark mb-3">2. Tài khoản người dùng</h3>
                            <ul className="list-disc pl-5 space-y-2">
                                <li>Bạn chịu trách nhiệm bảo mật thông tin tài khoản và mật khẩu của mình.</li>
                                <li>Không được chia sẻ tài khoản cho người khác sử dụng chung. Hệ thống có cơ chế phát hiện và khóa tài khoản vi phạm.</li>
                                <li>Bạn phải cung cấp thông tin chính xác khi đăng ký (Email, Họ tên) để đảm bảo quyền lợi khi cấp chứng chỉ.</li>
                            </ul>
                        </section>

                        <section>
                            <h3 className="text-xl font-bold text-dark mb-3">3. Quyền sở hữu trí tuệ</h3>
                            <p>Tất cả nội dung khóa học (Video, tài liệu, mã nguồn, bài tập) đều thuộc bản quyền của AQH Learning. Nghiêm cấm mọi hành vi sao chép, phát tán, bán lại nội dung khi chưa có sự cho phép bằng văn bản.</p>
                        </section>

                        <section>
                            <h3 className="text-xl font-bold text-dark mb-3">4. Chính sách hoàn tiền</h3>
                            <p>Chúng tôi cam kết hoàn tiền <strong>100% trong vòng 7 ngày</strong> kể từ khi thanh toán nếu bạn không hài lòng về chất lượng khóa học và chưa học quá 20% thời lượng video.</p>
                        </section>

                        <div className="bg-blue-50 p-6 rounded-2xl border border-blue-100">
                            <p className="font-bold text-primary mb-1">Mọi thắc mắc về điều khoản?</p>
                            <p className="text-sm">Vui lòng liên hệ hotline: <span className="text-dark font-bold">1900 6868</span></p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TermsPage;