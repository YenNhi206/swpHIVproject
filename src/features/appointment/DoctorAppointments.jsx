import React from 'react';
import { CalendarCheck, User } from 'lucide-react';
import { Navigate } from 'react-router-dom';

const doctorAppointments = [
    {
        id: 1,
        patientName: 'Nguyễn Văn A',
        date: '2025-06-10',
        time: '09:00',
        status: 'Chờ khám',
    },
    {
        id: 2,
        patientName: 'Trần Thị B',
        date: '2025-06-11',
        time: '10:30',
        status: 'Đã khám',
    },
];

export default function DoctorAppointmentList() {
    return (
        <div className="p-6">
            <h2 className="text-2xl text-red-600 font-bold mb-4">Lịch hẹn của bác sĩ</h2>
            <div className="space-y-4">
                {doctorAppointments.map((appointment) => (
                    <div
                        key={appointment.id}
                        className="p-4 bg-white rounded-lg shadow flex items-center justify-between"
                    >
                        <div>
                            <div className="flex items-center gap-2 mb-1">
                                <User className="w-4 h-4 text-red-500" />
                                <span className="font-semibold">{appointment.patientName}</span>
                            </div>
                            <div className="flex items-center gap-2 text-sm text-gray-600">
                                <CalendarCheck className="w-4 h-4 text-red-500" />
                                <span>{appointment.date} lúc {appointment.time}</span>
                            </div>
                        </div>
                        <span className="px-3 py-1 bg-red-100 text-red-600 rounded-full text-sm">
                            {appointment.status}
                        </span>
                    </div>
                ))}
            </div>
            <button
                onClick={() => Navigate('/dashboard')}
                className="mt-6 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
            >
                Quay về trang chủ
            </button>
        </div>
    );
}
