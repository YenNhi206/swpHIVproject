// src/pages/HomePage.jsx
import { Link } from 'react-router-dom';

export default function HomePage() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-100 to-purple-200 flex flex-col items-center justify-center px-4">
            <div className="max-w-2xl text-center bg-white p-10 rounded-xl shadow-lg">
                <h1 className="text-4xl font-extrabold text-blue-600 mb-4">
                    Hệ thống điều trị HIV
                </h1>
                <p className="text-gray-700 text-lg mb-6">
                    Chào mừng bạn đến với hệ thống hỗ trợ điều trị HIV và quản lý dịch vụ y tế.
                    Hệ thống giúp kết nối bệnh nhân, bác sĩ và trung tâm y tế một cách hiệu quả.
                </p>

                <div className="flex justify-center gap-4">
                    <Link
                        to="/login"
                        className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
                    >
                        Đăng nhập
                    </Link>
                    <Link
                        to="/signup"
                        className="px-6 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition"
                    >
                        Đăng ký
                    </Link>
                </div>
            </div>

            <footer className="mt-12 text-sm text-gray-500">
                &copy; 2025 HIV Treatment System - Nhóm 2
            </footer>
        </div>
    );
}
