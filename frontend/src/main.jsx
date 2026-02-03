import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

// 1. Import đầy đủ 2 Provider
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';

// 2. Chỉ gọi render MỘT LẦN duy nhất
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* Bọc AuthProvider ở ngoài cùng để quản lý đăng nhập */}
    <AuthProvider>
      {/* Bọc CartProvider ở trong để quản lý giỏ hàng */}
      <CartProvider>
          <App />
      </CartProvider>
    </AuthProvider>
  </React.StrictMode>,
)