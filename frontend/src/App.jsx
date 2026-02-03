import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';

// --- 1. IMPORT THƯ VIỆN TOAST (Thông báo đẹp) ---
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// ------------------------------------------------

import Header from './components/Header';
import HomePage from './pages/HomePage';
import Login from './pages/Login';
import Register from './pages/Register';
import CourseDetail from './pages/CourseDetail';
import LearningPage from './pages/LearningPage';
import MyCoursesPage from './pages/MyCoursesPage';

import ContactPage from './pages/ContactPage';
import TermsPage from './pages/TermsPage';
import PrivacyPage from './pages/PrivacyPage';
import CartPage from './pages/CartPage';
import PaymentHistoryPage from './pages/PaymentHistoryPage';

// Component thông báo thanh toán thành công
const PaymentSuccess = () => (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 text-center px-4 pt-20">
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-6">
            <svg className="w-10 h-10 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
            </svg>
        </div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Thanh toán thành công!</h1>
        <p className="text-gray-600 mb-8 max-w-md">
            Chúc mừng bạn đã sở hữu khóa học. Hãy bắt đầu hành trình chinh phục kiến thức ngay bây giờ.
        </p>
        <Link to="/my-courses" className="px-6 py-3 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition shadow-lg shadow-blue-500/30">
            Vào học ngay
        </Link>
    </div>
);

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <Router>
          <div className="min-h-screen flex flex-col font-sans text-gray-800">
            
            <Header />

            {/* Class pt-24 giúp nội dung không bị Header che mất */}
            <main className="flex-1 pt-24 bg-gray-50">
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/courses" element={<HomePage />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                
                <Route path="/course/:id" element={<CourseDetail />} />
                <Route path="/learn/:id" element={<LearningPage />} />
                <Route path="/my-courses" element={<MyCoursesPage />} />
                
                <Route path="/cart" element={<CartPage />} />
                <Route path="/payment-history" element={<PaymentHistoryPage />} />
                <Route path="/payment-success" element={<PaymentSuccess />} />

                <Route path="/contact" element={<ContactPage />} />
                <Route path="/terms" element={<TermsPage />} />
                <Route path="/privacy" element={<PrivacyPage />} />
              </Routes>
            </main>

            <footer className="bg-white border-t border-gray-100 py-10 mt-auto">
              <div className="container mx-auto px-6 text-center">
                <div className="mb-6 flex justify-center items-center gap-2">
                   <span className="text-xl font-extrabold text-primary">AQH</span>
                   <span className="text-xl font-bold text-dark">Learning</span>
                </div>
                <p className="text-gray-500 mb-6 max-w-lg mx-auto">
                  Nền tảng học tập trực tuyến hàng đầu dành cho sinh viên và người đi làm.
                </p>
                <div className="flex flex-wrap justify-center gap-6 text-sm font-semibold text-gray-600 mb-8">
                  <Link to="/terms" className="hover:text-primary hover:underline transition">Điều khoản sử dụng</Link>
                  <Link to="/payment-history" className="hover:text-primary hover:underline transition">Lịch sử giao dịch</Link>
                  <Link to="/privacy" className="hover:text-primary hover:underline transition">Chính sách bảo mật</Link>
                  <Link to="/contact" className="hover:text-primary hover:underline transition">Liên hệ & Hỗ trợ</Link>
                </div>
                <div className="text-xs text-gray-400 border-t border-gray-100 pt-6">
                  &copy; 2026 <strong>AQH-Elearning</strong>. All rights reserved.
                </div>
              </div>
            </footer>

            {/* --- 2. KHAY CHỨA THÔNG BÁO --- */}
            {/* Đặt ở đây để nó hiện đè lên mọi thứ */}
            <ToastContainer 
                position="top-right"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />
            {/* ------------------------------- */}

          </div>
        </Router>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;