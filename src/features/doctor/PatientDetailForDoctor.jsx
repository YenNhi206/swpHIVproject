import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, User, ClipboardList, Activity, AlertTriangle, CalendarCheck } from 'lucide-react';

export default function PatientDetailForDoctor() {
    const { patientId } = useParams();
    const navigate = useNavigate();

    // Dữ liệu giả lập - bạn thay bằng fetch API thật
    const patientData = {
        id: patientId,
        fullName: 'Nguyễn Văn B',
        dob: '1980-05-15',
        gender: 'Nam',
        diagnosis: 'HIV dương tính, giai đoạn ổn định',
        treatmentRegimen: 'TDF + 3TC + DTG',
        lastVisit: '2025-06-20',
        labResults: {
            CD4: 450,
            ViralLoad: 'Undetectable',
            ALT: 30,
            Creatinine: 1.1,
        },
        alerts: [
            'Quên uống thuốc 3 ngày liên tiếp',
            'Cần xét nghiệm lại tải lượng virus',
        ],
    };

    return (
        <div className="min-h-screen bg-red-50 p-6 max-w-4xl mx-auto">
            <button
                onClick={() => navigate(-1)}
                className="flex items-center gap-2 text-red-600 hover:underline mb-6"
            >
                <ArrowLeft className="w-5 h-5" />
                Quay lại
            </button>

            <h1 className="text-3xl font-bold text-red-700 mb-4 flex items-center gap-2">
                <User className="w-7 h-7" />
                Hồ sơ bệnh nhân
            </h1>

            <section className="bg-white rounded-xl shadow p-6 mb-6 border border-red-300">
                <h2 className="text-xl font-semibold text-red-600 mb-3 flex items-center gap-2">
                    <ClipboardList className="w-6 h-6" />
                    Thông tin cơ bản
                </h2>
                <p><span className="font-semibold">Họ và tên:</span> {patientData.fullName}</p>
                <p><span className="font-semibold">Ngày sinh:</span> {patientData.dob}</p>
                <p><span className="font-semibold">Giới tính:</span> {patientData.gender}</p>
            </section>

            <section className="bg-white rounded-xl shadow p-6 mb-6 border border-red-300">
                <h2 className="text-xl font-semibold text-red-600 mb-3 flex items-center gap-2">
                    <Activity className="w-6 h-6" />
                    Tình trạng sức khỏe
                </h2>
                <p><span className="font-semibold">Chẩn đoán:</span> {patientData.diagnosis}</p>
                <p><span className="font-semibold">Phác đồ điều trị:</span> {patientData.treatmentRegimen}</p>
                <p><span className="font-semibold">Lần tái khám gần nhất:</span> {patientData.lastVisit}</p>
            </section>

            <section className="bg-white rounded-xl shadow p-6 mb-6 border border-red-300">
                <h2 className="text-xl font-semibold text-red-600 mb-3 flex items-center gap-2">
                    <CalendarCheck className="w-6 h-6" />
                    Kết quả xét nghiệm
                </h2>
                <ul className="list-disc list-inside text-gray-700 space-y-1">
                    <li><span className="font-semibold">CD4:</span> {patientData.labResults.CD4} cells/mm³</li>
                    <li><span className="font-semibold">Tải lượng virus:</span> {patientData.labResults.ViralLoad}</li>
                    <li><span className="font-semibold">ALT (men gan):</span> {patientData.labResults.ALT} U/L</li>
                    <li><span className="font-semibold">Creatinine (chức năng thận):</span> {patientData.labResults.Creatinine} mg/dL</li>
                </ul>
            </section>

            <section className="bg-white rounded-xl shadow p-6 border border-red-300">
                <h2 className="text-xl font-semibold text-red-600 mb-3 flex items-center gap-2">
                    <AlertTriangle className="w-6 h-6" />
                    Cảnh báo & nhắc nhở
                </h2>
                {patientData.alerts.length === 0 ? (
                    <p>Không có cảnh báo nào.</p>
                ) : (
                    <ul className="list-disc list-inside text-red-600 space-y-1">
                        {patientData.alerts.map((alert, idx) => (
                            <li key={idx}>{alert}</li>
                        ))}
                    </ul>
                )}
            </section>
        </div>
    );
}
