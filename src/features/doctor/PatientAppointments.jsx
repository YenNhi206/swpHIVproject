import React, { useState, useEffect } from 'react';
import { DatePicker } from 'antd';
import { Calendar, Clock, User, FileText } from 'lucide-react';
import dayjs from 'dayjs';
import 'dayjs/locale/vi';
import { useNavigate } from 'react-router-dom';

dayjs.locale('vi');

export default function PatientAppointments() {
    const [appointments, setAppointments] = useState([]);
    const [selectedDate, setSelectedDate] = useState(dayjs());
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    const fetchAppointments = (date) => {
        const dateStr = dayjs(date).format('YYYY-MM-DD');

        // Fake data ví dụ, bạn thay bằng gọi API thật sau này
        if (dateStr === '2025-07-02') {
            return [
                { id: 1, time: '09:00', patient: 'Nguyễn Văn B', purpose: 'Khám định kỳ', patientId: 1 },
                { id: 2, time: '10:30', patient: 'Trần Thị C', purpose: 'Cập nhật phác đồ', patientId: 2 },
            ];
        } else if (dateStr === '2025-07-03') {
            return [
                { id: 3, time: '08:00', patient: 'Lê Thị D', purpose: 'Xét nghiệm', patientId: 3 },
            ];
        }
        return [];
    };

    useEffect(() => {
        setLoading(true);
        const data = fetchAppointments(selectedDate);
        setAppointments(data);
        setLoading(false);
    }, [selectedDate]);

    return (
        <div className="max-w-6xl mx-auto space-y-6 p-6">
            <div className="flex justify-between items-center">
                <h1 className="text-3xl font-bold text-red-700 flex items-center gap-2">
                    <Calendar className="w-7 h-7" />
                    Lịch hẹn bệnh nhân
                </h1>
                <DatePicker
                    value={selectedDate}
                    onChange={(date) => setSelectedDate(date)}
                    format="DD/MM/YYYY"
                    className="border border-red-400 rounded px-3 py-1"
                    popupClassName="z-[50]"
                />
            </div>

            {loading ? (
                <p>Đang tải dữ liệu...</p>
            ) : appointments.length === 0 ? (
                <p className="text-gray-500 italic">Không có lịch hẹn cho ngày này.</p>
            ) : (
                <div className="space-y-4">
                    {appointments.map((appt) => (
                        <div
                            key={appt.id}
                            className="flex justify-between items-center border border-red-200 bg-white rounded-lg p-4 shadow hover:bg-red-50 transition"
                        >
                            <div className="flex items-center gap-4">
                                <Clock className="w-5 h-5 text-red-500" />
                                <span className="font-semibold text-gray-800">{appt.time}</span>
                            </div>
                            <div className="flex items-center gap-4">
                                <User className="w-5 h-5 text-red-500" />
                                <span>{appt.patient}</span>
                            </div>
                            <span className="italic text-gray-600">{appt.purpose}</span>
                            <button
                                onClick={() => navigate(`/doctor/patientappointments/${appt.patientId}`)}
                                className="ml-4 flex items-center gap-1 text-red-600 hover:underline text-sm"
                            >
                                <FileText className="w-4 h-4" />
                                Xem hồ sơ
                            </button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
