
import React from "react";
import { Link } from "react-router-dom";

export default function NotFoundPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="bg-white rounded-xl shadow-lg max-w-lg w-full text-center p-10">
        <h1 className="text-6xl font-bold text-red-600 mb-4">404</h1>
        <h2 className="text-2xl font-semibold text-gray-800 mb-2">Không tìm thấy trang</h2>
        <p className="text-gray-600 mb-6">
          Trang bạn đang cố truy cập không tồn tại hoặc đã bị xóa.
        </p>
        <Link
          to="/"
          className="inline-block bg-red-600 text-white px-6 py-2 rounded-xl hover:bg-red-700 transition duration-200"
        >
          Quay lại Trang chủ
        </Link>
      </div>
    </div>
  );
