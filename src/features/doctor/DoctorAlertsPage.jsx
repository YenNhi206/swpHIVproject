import React from 'react';
import { useNavigate } from 'react-router-dom';
import { AlertTriangle, RefreshCw } from 'lucide-react';

export default function DoctorAlertsPage() {
    const navigate = useNavigate();

    const alerts = [
        { id: 1, patient: 'Nguyễn Văn B', message: 'Chưa lấy thuốc (5 ngày trễ)', action: 'Liên hệ' },
        { id: 2, patient: 'Trần Thị C', message: 'Cần xét nghiệm VL', action: 'Xem chi tiết' },
        { id: 3, patient: 'Phạm Văn D', message: 'Kết quả CD4 giảm', action: 'Xem hồ sơ' },
    ];

    return (
        <div className="min-h-screen bg-gradient-to-b from-red-50 to-white p-8">
            <div className="max-w-5xl mx-auto space-y-6">

                {/* Tiêu đề */}
                <div className="text-center">
                    <h1 className="text-3xl font-extrabold text-red-700 mb-2 tracking-wide flex items-center justify-center gap-2">
                        <AlertTriangle className="w-7 h-7" />
                        Cảnh Báo & Nhắc Nhở
                    </h1>
                    <p className="text-gray-500">Danh sách các cảnh báo liên quan đến bệnh nhân</p>
                </div>

                {/* Danh sách cảnh báo */}
                <section className="bg-white rounded-2xl shadow-lg p-6 border border-red-200">
                    <ul className="space-y-3 text-gray-700">
                        {alerts.map((alert) => (
                            <li key={alert.id} className="flex items-center justify-between border-b pb-2 hover:bg-gray-50">
                                <span>{alert.patient} - {alert.message}</span>
                                <button
                                    onClick={() => navigate(`/patients/${alert.id}`)}
                                    className="text-sm text-red-600 hover:underline"
                                >
                                    {alert.action}
                                </button>
                            </li>
                        ))}
                    </ul>

                    <button
                        onClick={() => window.location.reload()}
                        className="mt-4 w-full px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
                    >
                        <RefreshCw className="w-5 h-5 inline mr-2" />
                        Cập nhật cảnh báo
                    </button>
                </section>
            </div>
        </div>
    );
}
