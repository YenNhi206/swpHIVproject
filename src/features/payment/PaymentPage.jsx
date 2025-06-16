import React from 'react';
import { useLocation } from 'react-router-dom';
import { CreditCard,  AlertCircle } from 'lucide-react';

export default function PaymentPage() {
  const location = useLocation();
  const { appointmentData } = location.state || {};

  // Ngày giờ hiện tại (03:39 PM +07, 13/06/2025)
  const currentDate = new Date('2025-06-13T15:39:00+07:00').toLocaleString('vi-VN', {
    hour: '2-digit',
    minute: '2-digit',
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour12: false,
    timeZone: 'Asia/Ho_Chi_Minh',
  });

  // Validate dữ liệu
  if (!appointmentData) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-red-50 to-white flex items-center justify-center p-6">
        <div className="bg-white rounded-2xl shadow-lg p-8 text-center max-w-lg w-full opacity-0 translate-y-4 animate-fade-in">
          <AlertCircle className="w-16 h-16 text-red-600 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-red-700 mb-2">Lỗi</h1>
          <p className="text-gray-600 mb-6">Không có dữ liệu đặt lịch để thanh toán.</p>
          <button
            onClick={() => window.history.back()}
            className="bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700 transition-colors duration-300"
          >
            Trở lại
          </button>
          <p className="text-sm text-gray-500 mt-4">Thời gian: {currentDate}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-red-50 to-white flex items-center justify-center p-6">
      <div className="bg-white rounded-2xl shadow-lg p-8 max-w-lg w-full border-t-4 border-red-600 opacity-0 translate-y-4 animate-fade-in">
        <h1 className="text-2xl font-bold text-red-700 mb-6 flex items-center justify-center gap-2">
          <CreditCard className="w-6 h-6" />
          Thanh toán lịch hẹn
        </h1>

        <div className="space-y-6 text-gray-700">
          <div className="border border-gray-200 p-4 rounded-lg">
            <p><span className="font-semibold">Bác sĩ:</span> {appointmentData.doctor || 'Chưa chọn'}</p>
            <p><span className="font-semibold">Ngày:</span> {appointmentData.date || 'Chưa chọn'}</p>
            <p><span className="font-semibold">Giờ:</span> {appointmentData.time || 'Chưa chọn'}</p>
            {appointmentData.anonymous && <p className="text-red-600 font-semibold mt-2">Lịch hẹn ẩn danh</p>}
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

          <button
            onClick={() => alert('Xác nhận thanh toán thành công! Chuyển đến trang xác nhận.')}
            className="w-full mt-6 bg-red-600 hover:bg-red-700 text-white py-3 px-4 rounded-lg transition-colors duration-300"
          >
            Xác nhận đã thanh toán
          </button>
        </div>

        <p className="text-sm text-gray-500 text-center mt-4">Thời gian: {currentDate}</p>
      </div>
    </div>
  );
}