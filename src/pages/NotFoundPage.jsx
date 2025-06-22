import React from 'react';
import { Link } from 'react-router-dom';
import { XCircle, AlertTriangle } from 'lucide-react';

export default function NotFoundPage() {

  return (
    <div className="min-h-screen bg-gradient-to-b from-red-50 to-white flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full text-center p-8 opacity-0 translate-y-4 animate-fade-in">
        <AlertTriangle className="w-24 h-24 text-red-500 mx-auto mb-6" />
        <h1 className="text-6xl font-extrabold text-red-700 mb-4">404</h1>
        <h2 className="text-2xl font-semibold text-gray-800 mb-2">Không tìm thấy trang</h2>
        <p className="text-gray-600 mb-6">
          Trang bạn đang cố truy cập không tồn tại hoặc đã bị xóa. Vui lòng kiểm tra lại hoặc liên hệ hỗ trợ nếu cần.
        </p>
        <div className="space-x-4">
          <Link
            to="/"
            className="inline-block bg-red-600 text-white px-6 py-3 rounded-xl hover:bg-red-700 transition duration-300"
          >
            Quay lại Trang chủ
          </Link>

        </div>
      </div>
    </div>
  );
}