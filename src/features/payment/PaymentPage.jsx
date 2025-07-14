import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { CreditCard, AlertCircle } from 'lucide-react';

export default function PaymentPage() {
  const location = useLocation();
  const { appointmentData } = location.state || {};
  const [payUrl, setPayUrl] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!appointmentData) return;

    const fetchMoMoUrl = async () => {
      try {
        const orderId = `ORDER-${Date.now()}`;
        const amount = appointmentData.price.toString();
        const orderInfo = `Thanh toán lịch hẹn với ${appointmentData.doctor}`;
        const redirectUrl = 'https://your-frontend-site.com/payment-success';
        const ipnUrl = 'https://your-backend-site.com/payment/ipn';

        // Step 1: Gọi API BE để lấy request data + chữ ký
        const backendUrl = `/api/payment/momo?orderId=${orderId}&amount=${amount}&orderInfo=${encodeURIComponent(orderInfo)}&redirectUrl=${encodeURIComponent(redirectUrl)}&ipnUrl=${encodeURIComponent(ipnUrl)}`;
        const res = await fetch(backendUrl, { method: 'POST' });
        const momoRequestData = await res.json();

        // Bổ sung field để gọi sang MoMo
        momoRequestData.requestId = orderId;
        momoRequestData.extraData = '';
        momoRequestData.lang = 'vi';

        // Step 2: Gửi request đến MoMo API
        const momoRes = await fetch('https://test-payment.momo.vn/v2/gateway/api/create', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(momoRequestData),
        });

        const momoData = await momoRes.json();
        console.log('MoMo trả về:', momoData);
        setPayUrl(momoData.payUrl || momoData.qrCodeUrl);
      } catch (err) {
        console.error('Lỗi thanh toán:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchMoMoUrl();
  }, [appointmentData]);

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
          Thanh toán MoMo
        </h1>

        <div className="space-y-6 text-gray-700">
          <div className="border border-gray-200 p-4 rounded-lg">
            <p><span className="font-semibold">Bác sĩ:</span> {appointmentData.doctor}</p>
            <p><span className="font-semibold">Ngày:</span> {appointmentData.date}</p>
            <p><span className="font-semibold">Giờ:</span> {appointmentData.time}</p>
            <p><span className="font-semibold">Giá:</span> {appointmentData.price.toLocaleString()} VND</p>
            {appointmentData.anonymous && <p className="text-red-600 font-semibold mt-2">Lịch hẹn ẩn danh</p>}
          </div>

          <div className="text-center mt-6">
            {loading ? (
              <p>Đang tạo yêu cầu thanh toán...</p>
            ) : payUrl ? (
              <>
                <p className="font-semibold mb-2">Bấm để thanh toán qua MoMo</p>
                <a
                  href={payUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-pink-600 text-white px-6 py-3 rounded-lg hover:bg-pink-700"
                >
                  Thanh toán MoMo
                </a>
              </>
            ) : (
              <p className="text-red-500">Không thể tạo yêu cầu thanh toán.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
