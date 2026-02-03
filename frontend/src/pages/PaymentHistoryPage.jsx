import { useEffect, useState } from 'react';
import axiosClient from '../api/axiosClient';

const PaymentHistoryPage = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const res = await axiosClient.get('/orders/history');
                setOrders(res.data);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };
        fetchOrders();
    }, []);

    const formatMoney = (amount) => new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount);
    const formatDate = (dateString) => new Date(dateString).toLocaleDateString('vi-VN');

    return (
        <div className="pt-28 pb-20 min-h-screen bg-gray-50">
            <div className="container mx-auto px-6 max-w-4xl">
                <h1 className="text-3xl font-extrabold text-dark mb-8">Lịch sử giao dịch</h1>
                {loading ? (
                    <div>Đang tải...</div>
                ) : orders.length === 0 ? (
                    <div className="text-center text-gray-500">Chưa có giao dịch nào.</div>
                ) : (
                    <div className="space-y-6">
                        {orders.map((order) => (
                            <div key={order._id} className="bg-white p-6 rounded-2xl shadow-md border border-gray-100">
                                <div className="flex justify-between border-b border-gray-100 pb-4 mb-4">
                                    <div>
                                        <p className="text-sm text-gray-500">Ngày: {formatDate(order.NgayThanhToan)}</p>
                                        <p className="font-bold">#{order._id.slice(-6).toUpperCase()}</p>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-lg font-extrabold text-primary">{formatMoney(order.TongTien)}</p>
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    {order.DanhSachKhoaHoc.map((course) => (
                                        <div key={course._id} className="text-gray-700">• {course.TenKhoaHoc}</div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};
export default PaymentHistoryPage;