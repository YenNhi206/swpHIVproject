import React, { useState } from 'react';

export default function AppointmentForm() {
    const [formData, setFormData] = useState({
        date: '',
        time: '',
        reason: '',
        doctor: '',
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Gửi dữ liệu form lên server
        console.log('Đặt lịch:', formData);
        // Gọi appointmentService.createAppointment(formData)
    };
    const doctors = ['Dr. Nguyễn Văn A', 'Dr. Trần Thị B', 'Dr. Phạm Văn C'];

    return (
        <div className="max-w-md mx-auto p-6 bg-white shadow-md rounded">
            <h2 className="text-xl font-bold mb-4 text-red-600">Đặt lịch hẹn mới</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block mb-1">Ngày</label>
                    <input type="date" name="date" value={formData.date} onChange={handleChange} className="w-full border p-2 rounded" required />
                </div>
                <div>
                    <label className="block mb-1">Giờ</label>
                    <input type="time" name="time" value={formData.time} onChange={handleChange} className="w-full border p-2 rounded" required />
                </div>
                <div>
                    <label className="block mb-1">Lý do</label>
                    <textarea name="reason" value={formData.reason} onChange={handleChange} className="w-full border p-2 rounded" required />
                </div>
                <div>
                    <label className="block mb-1">Chọn bác sĩ</label>
                    <select name="doctor" value={formData.doctor} onChange={handleChange} className="w-full border p-2 rounded" required>
                        <option value="">Chọn bác sĩ</option>
                        {doctors.map((doctor, index) => (
                            <option key={index} value={doctor}>{doctor}</option>
                        ))}
                    </select>
                </div>

                <button type="submit" className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700">Đặt lịch</button>
            </form>
        </div>
    );
}
