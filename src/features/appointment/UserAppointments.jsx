import React, { useEffect, useState } from 'react';
import { CalendarDays, User, Clock } from 'lucide-react';

export default function UserAppointmentList() {
    const [appointments, setAppointments] = useState([]);

    // Fake API call - bạn có thể thay bằng real API call sau này
    useEffect(() => {
        const fakeData = [
            {
                id: 1,
                doctorName: 'BS. Nguyễn Văn A',
                date: '2025-06-02',
                time: '14:00',
                status: 'Chờ xác nhận'
            },
            {
                id: 2,
                doctorName: 'BS. Trần Thị B',
                date: '2025-06-05',
                time: '09:00',
                status: 'Đã xác nhận'
            }
        ];
        setAppointments(fakeData);
    }, []);

    return (
        <div className="p-6 bg-white rounded-xl shadow">
            <h2 className="text-2xl text-red-600 font-semibold mb-4 text-red-600">Lịch hẹn của bạn</h2>
            <div className="space-y-4">
                {appointments.map((appt) => (
                    <div key={appt.id} className="border border-gray-200 rounded-lg p-4 bg-gray-50">
                        <div className="flex items-center gap-2 text-gray-700">
                            <User className="w-5 h-5 text-red-500" />
                            <span>Bác sĩ: {appt.doctorName}</span>
                        </div>
                        <div className="flex items-center gap-2 text-gray-700 mt-1">
                            <CalendarDays className="w-5 h-5 text-red-500" />
                            <span>Ngày: {appt.date}</span>
                        </div>
                        <div className="flex items-center gap-2 text-gray-700 mt-1">
                            <Clock className="w-5 h-5 text-red-500" />
                            <span>Giờ: {appt.time}</span>
                        </div>
                        <div className="mt-2 text-sm text-gray-500 italic">Trạng thái: {appt.status}</div>
                    </div>
                ))}
            </div>
            <button
                onClick={() => navigate('/dashboard')}
                className="mt-6 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
            >
                Quay về trang chủ
            </button>
        </div>
    );
}
