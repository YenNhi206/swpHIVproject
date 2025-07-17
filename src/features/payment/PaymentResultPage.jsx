import React, { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { CheckCircle, XCircle, Loader } from 'lucide-react';

export default function PaymentResultPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [isSuccess, setIsSuccess] = useState(null); // null = loading, true/false = kết quả
  const [message, setMessage] = useState('');

  useEffect(() => {
    const resultCode = searchParams.get('resultCode');
    const orderId = searchParams.get('orderId');
    const message = searchParams.get('message');
    const appointmentId = searchParams.get('appointmentId');
    if (!orderId || !resultCode) {
      setIsSuccess(false);
      setMessage('Không nhận được thông tin từ MoMo.');
      return;
    }

    // Kết quả từ MoMo (0 là thành công)
    if (resultCode === '0') {
      setIsSuccess(true);
      setMessage('Thanh toán thành công!');
      // Gọi API xác nhận thanh toán
      if (appointmentId) {
        fetch(`http://localhost:8080/api/appointments/confirm-payment/${appointmentId}`, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token') || ''}`,
          },
        })
        .then(res => {
          if (!res.ok) throw new Error("Xác nhận thanh toán thất bại");
          return res.json();
        })
        .then(data => {
          console.log("Xác nhận thanh toán thành công:", data);
        })
        .catch(err => {
          console.error(err);
          setMessage('Thanh toán thành công, nhưng xác nhận thất bại.');
        });
      }
    } else {
      setIsSuccess(false);
      setMessage(`Thanh toán thất bại: ${message || 'Vui lòng thử lại.'}`);
    }

    // Tuỳ bạn, có thể gọi BE tại đây để xác minh IPN nếu cần

  }, [searchParams]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white flex items-center justify-center p-6">
      <div className="bg-white rounded-2xl shadow-lg p-8 max-w-md w-full border-t-4">
        <div className="flex justify-center mb-6">
          {isSuccess === null ? (
            <Loader className="w-12 h-12 text-gray-500 animate-spin" />
          ) : isSuccess ? (
            <CheckCircle className="w-12 h-12 text-green-600" />
          ) : (
            <XCircle className="w-12 h-12 text-red-600" />
          )}
        </div>

        <h1 className="text-xl font-bold text-center mb-4">
          {isSuccess === null ? 'Đang xác minh kết quả...' : isSuccess ? 'Thanh toán thành công' : 'Thanh toán thất bại'}
        </h1>
        <p className="text-center text-gray-600 mb-6">{message}</p>

        <div className="text-center">
          <button
            onClick={() => navigate('/')}
            className="px-6 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700"
          >
            Quay về trang chủ
          </button>
        </div>
      </div>
    </div>
  );
}

