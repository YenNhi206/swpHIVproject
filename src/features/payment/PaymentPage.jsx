import React from 'react';
import { useLocation } from 'react-router-dom';
import { CreditCard, AlertCircle } from 'lucide-react';

export default function PaymentPage() {
  const location = useLocation();
  const { appointmentData } = location.state || {};

  if (!appointmentData) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-red-50 p-6">
        <div className="bg-white p-8 rounded-xl shadow text-center">
          <AlertCircle className="w-12 h-12 text-red-600 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-red-700">Không có dữ liệu thanh toán</h2>
          <p className="text-gray-600 mt-2">Vui lòng quay lại và thử lại.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-red-50 to-white flex items-center justify-center p-6">
      <div className="bg-white rounded-2xl shadow-lg p-8 max-w-lg w-full border-t-4 border-red-600">
        <h1 className="text-2xl font-bold text-red-700 mb-6 flex items-center justify-center gap-2">
          <CreditCard className="w-6 h-6" />
          Thanh toán lịch hẹn
        </h1>

        <div className="space-y-6 text-gray-700">
          <div className="border border-gray-200 p-4 rounded-lg">
            <p><span className="font-semibold">Bác sĩ:</span> {appointmentData.doctor}</p>
            <p><span className="font-semibold">Ngày:</span> {appointmentData.date}</p>
            <p><span className="font-semibold">Giờ:</span> {appointmentData.time}</p>
            {appointmentData.anonymous && <p className="text-red-600 font-semibold mt-2">Lịch hẹn ẩn danh</p>}
          </div>

          <div className="text-center mt-6">
            <p className="font-semibold mb-2">Quét mã QR để thanh toán</p>
            <img src="https://qrcode-gen.com/images/qrcode-default.png" alt="QR Code" className="mx-auto w-48 h-48 border border-gray-300 rounded" />
            <p className="mt-2 text-sm text-gray-500">Vui lòng xác nhận sau khi thanh toán thành công.</p>
          </div>

          <button
            onClick={() => alert('Xác nhận thanh toán thành công!')}
            className="w-full mt-6 bg-red-600 hover:bg-red-700 text-white py-3 px-4 rounded-lg"
          >
            Xác nhận đã thanh toán
          </button>
        </div>
      </div>
    </div>
  );
}
