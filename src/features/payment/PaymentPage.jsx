import { useLocation } from 'react-router-dom';

export default function PaymentPage() {
    const location = useLocation();
    const { appointmentData } = location.state || {};

    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
            <div className="bg-white shadow-xl rounded-xl p-8 max-w-md w-full border-t-4 border-red-600">
                <h1 className="text-2xl font-bold text-red-600 mb-6 text-center">Thanh toán lịch hẹn</h1>

                {appointmentData ? (
                    <div className="space-y-4 text-gray-700">
                        <div>
                            <p><span className="font-semibold">Bác sĩ:</span> {appointmentData.doctor}</p>
                            <p><span className="font-semibold">Ngày:</span> {appointmentData.date}</p>
                            <p><span className="font-semibold">Giờ:</span> {appointmentData.time}</p>
                        </div>

                        <div className="text-center mt-6">
                            <p className="font-semibold mb-2">Quét mã QR để thanh toán</p>
                            <img
                                src="https://qrcode-gen.com/images/qrcode-default.png"
                                alt="QR Code"
                                className="mx-auto w-48 h-48 border border-gray-300 rounded"
                            />
                            <p className="mt-2 text-sm text-gray-500">Vui lòng xác nhận sau khi thanh toán thành công.</p>
                        </div>

                        <button className="w-full mt-6 bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded">
                            Xác nhận đã thanh toán
                        </button>
                    </div>
                ) : (
                    <p className="text-center text-gray-600">Không có dữ liệu đặt lịch.</p>
                )}
            </div>
        </div>
    );
}
