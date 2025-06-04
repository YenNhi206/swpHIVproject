import React, { useState } from 'react';

export default function AppointmentForm() {
    const [formData, setFormData] = useState({
        date: '',
        time: '',
        reason: '',
        doctor: '',
        anonymous: false,
    });

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === 'checkbox' ? checked : value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const dataToSubmit = {
            ...formData,
            user: formData.anonymous ? 'Ẩn danh' : 'User hiện tại' // hoặc lấy từ context/login
        };
        console.log('Đặt lịch:', dataToSubmit);
        // Gọi appointmentService.createAppointment(dataToSubmit)
    };

    const doctors = ['Dr. Nguyễn Văn A', 'Dr. Trần Thị B', 'Dr. Phạm Văn C'];

    return (
        <div className="max-w-md mx-auto p-6 bg-white shadow-md rounded mt-40">
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

                <div className="flex items-center gap-2">
                    <input type="checkbox" name="anonymous" checked={formData.anonymous} onChange={handleChange} />
                    <label>Đăng ký ẩn danh</label>
                </div>

                <button type="submit" className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700">Đặt lịch</button>
            </form>
        </div>
    );
}
