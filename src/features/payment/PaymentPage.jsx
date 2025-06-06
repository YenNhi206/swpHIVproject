import { useLocation } from 'react-router-dom';

export default function PaymentPage() {
    const location = useLocation();
    const { appointmentData } = location.state || {};

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">Thanh toán</h1>
            {appointmentData ? (
                <div>
                    <p>Bạn đang thanh toán cho lịch hẹn với: {appointmentData.doctor}</p>
                    <p>Ngày: {appointmentData.date}</p>
                    <p>Giờ: {appointmentData.time}</p>
                    {/* Form thanh toán tại đây */}
                </div>
            ) : (
                <p>Không có dữ liệu đặt lịch.</p>
            )}
        </div>
    );
}
